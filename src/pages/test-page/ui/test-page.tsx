// eslint-disable @typescript-eslint/no-explicit-any
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';



import { Button, Container, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import { Client, type IMessage } from '@stomp/stompjs';





type ChatMessageDto = {
  id: string;
  chatRoomId: string;
  senderId: string;
  senderName: string | null;
  message: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
};

const roomId = '2b4a5c8e-2a57-4e1f-9a8a-b1b2a3c4d5e6';

export function TestPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const clientRef = useRef<Client | null>(null);

  // Загружаем историю по REST через гейтвей (важно: с куками!)
  const loadHistory = async () => {
    try {
      const resp = await fetch(
        `http://api-gateway.dev.sport-unite.it-mentor.space/chat-service/chat-rooms/${roomId}/messages`,
        {
          method: 'GET',
          credentials: 'include', // <-- берём сессию/куку от гейтвея
          headers: {
            'Accept': 'application/json',
          },
        },
      );
      if (resp.status === 401) {
        console.warn('History request unauthorized (401).');
        return;
      }
      if (!resp.ok) {
        const text = await resp.text();
        console.error('History request failed:', resp.status, text);
        return;
      }
      const data: ChatMessageDto[] = await resp.json();
      // Сортируем по времени (если бэкенд не гарантирует порядок)
      data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      const formatted = data.map((m) => {
        const who =
          m.senderName && m.senderName.trim().length > 0
            ? m.senderName
            : m.senderId;
        const ts = new Date(m.createdAt).toLocaleTimeString();
        return `[${ts}] ${who}: ${m.message}`;
      });
      setMessages(formatted);
    } catch (e) {
      console.error('History load error:', e);
    }
  };

  const connectStomp = () => {
    if (clientRef.current?.active) return;
    setConnecting(true);

    // Форсим чистый websocket-транспорт (меньше лишних /info-запросов)
    const sock = new SockJS(
      'http://api-gateway.dev.sport-unite.it-mentor.space/chat-service/ws',
      undefined,
      { transports: ['websocket'] },
    );

    const client = new Client({
      webSocketFactory: () => sock as any,
      reconnectDelay: 3000,
      debug: (str) => console.log('[STOMP]', str),

      onConnect: async () => {
        setConnecting(false);
        setIsConnected(true);

        // 1) Сначала тянем историю комнаты
        await loadHistory();

        // 2) Подписываемся на топик комнаты
        client.subscribe(`/topic/chat.${roomId}`, (msg: IMessage) => {
          try {
            // Сервер может прислать JSON с полями { message, senderName, createdAt, ... }
            const body = JSON.parse(msg.body);
            const who =
              body.senderName && body.senderName.trim().length > 0
                ? body.senderName
                : body.senderId || 'unknown';
            const ts = body.createdAt
              ? new Date(body.createdAt).toLocaleTimeString()
              : new Date().toLocaleTimeString();
            setMessages((prev) => [...prev, `[${ts}] ${who}: ${body.message}`]);
          } catch {
            // Или просто строку
            setMessages((prev) => [...prev, msg.body]);
          }
        });
      },
      onStompError: (frame: any) => {
        setConnecting(false);
        setIsConnected(false);
        console.error('Broker error:', frame.headers['message'], frame.body);
      },

      onWebSocketClose: (evt: any) => {
        setIsConnected(false);
        setConnecting(false);
        console.warn('WS closed', evt.code, evt.reason);
      },
    });

    client.activate();
    clientRef.current = client;
  };

  const disconnectStomp = () => {
    clientRef.current?.deactivate();
    clientRef.current = null;
    setIsConnected(false);
  };

  const sendMessage = () => {
    if (!input.trim() || !clientRef.current || !isConnected) return;
    clientRef.current.publish({
      destination: `/app/chat.send.${roomId}`,
      body: JSON.stringify({ message: input }),
    });
    setInput('');
  };

  useEffect(() => {
    connectStomp();
    return () => disconnectStomp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = () => {
    window.location.assign(
      'http://api-gateway.dev.sport-unite.it-mentor.space/oauth2/authorization/gateway',
    );
  };

  const logout = () => {
    window.location.assign(
      'http://api-gateway.dev.sport-unite.it-mentor.space/logout',
    );
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
      <Paper
        sx={{ p: 2, height: '75vh', display: 'flex', flexDirection: 'column' }}
      >
        <Stack
          direction='row'
          spacing={1}
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h5'>SockJS + STOMP Chat</Typography>
          <Stack direction='row' spacing={1}>
            <Button variant='outlined' onClick={login}>
              Login
            </Button>
            <Button variant='outlined' onClick={logout}>
              Logout
            </Button>
          </Stack>
        </Stack>

        <Typography variant='body2' sx={{ mt: 1, mb: 2 }}>
          Status:{' '}
          {isConnected
            ? 'connected'
            : connecting
              ? 'connecting...'
              : 'disconnected'}
        </Typography>

        <List sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
          {messages.map((msg, i) => (
            <ListItem key={i}>
              <ListItemText primary={msg} />
            </ListItem>
          ))}
        </List>

        <Stack direction='row' spacing={1}>
          <TextField
            fullWidth
            size='small'
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder='Type a message…'
          />
          <Button
            variant='contained'
            onClick={sendMessage}
            disabled={!isConnected}
          >
            Send
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
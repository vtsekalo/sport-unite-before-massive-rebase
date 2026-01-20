import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useGetMyNotificationsQuery } from '@shared/api';
import { INotification, ROUTES, StatusNotification } from '@shared/lib';

import { useMarkAsReadMutation } from '../api/notifications';
import { useDeleteNotificationsMutation } from '../api/notifications';
import {
  ESTIMATED_ROW_HEIGHT,
  MARK_READ_DELAY_MS,
  OVERSCAN,
  VISIBLE_RATIO,
} from '../lib/consts';
import { RowContent } from './row';

export function NotificationsList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteNotifications, { isLoading: isDeleting }] =
    useDeleteNotificationsMutation();

  const { data, isLoading, error } = useGetMyNotificationsQuery(undefined, {
    pollingInterval: 20_000,
    skipPollingIfUnfocused: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      navigate(ROUTES.AUTH);
    }
  }, [error, navigate]);

  const hiddenIdsRef = useRef<Set<string>>(new Set());
  const [hiddenVersion, setHiddenVersion] = useState(0);

  const rawItems: INotification[] = useMemo(() => data ?? [], [data]);

  const items: INotification[] = useMemo(() => {
    const hidden = hiddenIdsRef.current;
    if (hiddenVersion === 0) {
      return rawItems;
    }
    return rawItems.filter((n) => !hidden.has(n.messageId));
  }, [rawItems, hiddenVersion]);

  const count = isLoading ? 20 : items.length;

  const selectedRef = useRef<Set<string>>(new Set());
  const [, forceSelectedRerender] = useState(0);

  const selectableIds = useMemo(() => {
    return items
      .filter((n) => n.statusNotif !== StatusNotification.deleted)
      .map((n) => n.messageId);
  }, [items]);

  const selectedCount = selectedRef.current.size;
  const allSelected =
    selectableIds.length > 0 && selectedCount === selectableIds.length;
  const someSelected =
    selectedCount > 0 && selectedCount < selectableIds.length;

  const toggleOne = useCallback((id: string) => {
    const set = selectedRef.current;
    if (set.has(id)) set.delete(id);
    else set.add(id);
    forceSelectedRerender((v) => v + 1);
  }, []);

  const toggleAll = useCallback(() => {
    const set = selectedRef.current;

    if (selectableIds.length === 0) return;

    if (set.size === selectableIds.length) {
      set.clear();
    } else {
      set.clear();
      selectableIds.forEach((id) => set.add(id));
    }

    forceSelectedRerender((v) => v + 1);
  }, [selectableIds]);

  const deleteSelected = useCallback(async () => {
    const ids = Array.from(selectedRef.current);
    if (!ids.length) return;

    ids.forEach((id) => hiddenIdsRef.current.add(id));
    selectedRef.current.clear();
    forceSelectedRerender((v) => v + 1);
    setHiddenVersion((v) => v + 1);

    try {
      await deleteNotifications(ids).unwrap();
    } catch {
      ids.forEach((id) => hiddenIdsRef.current.delete(id));
      setHiddenVersion((v) => v + 1);
    }
  }, [deleteNotifications]);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: OVERSCAN,
    getItemKey: (index: number) =>
      items[index]?.messageId ?? `skeleton-${index}`,
  });

  const setRowRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      rowVirtualizer.measureElement(el);
    },
    [rowVirtualizer],
  );

  const virtualItems = rowVirtualizer.getVirtualItems();

  useLayoutEffect(() => {
    const root = parentRef.current;
    if (!root) return;

    const els = root.querySelectorAll<HTMLElement>('[data-index]');
    els.forEach((el) => rowVirtualizer.measureElement(el));
  }, [virtualItems, items, rowVirtualizer]);

  const markedRef = useRef<Set<string>>(new Set());
  const pendingRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const root = parentRef.current;
    if (!root) return;

    const scrollTop = root.scrollTop;
    const viewBottom = scrollTop + root.clientHeight;

    const idsToQueue: string[] = [];

    for (const v of virtualItems) {
      const item = items[v.index];
      if (!item) continue;

      if (
        item.statusNotif === StatusNotification.read ||
        item.statusNotif === StatusNotification.deleted
      )
        continue;

      const id = item.messageId;
      if (!id) continue;

      if (markedRef.current.has(id) || pendingRef.current.has(id)) continue;

      const top = v.start;
      const bottom = v.start + v.size;

      const visiblePx = Math.min(bottom, viewBottom) - Math.max(top, scrollTop);
      if (visiblePx <= 0) continue;

      const ratio = visiblePx / Math.max(v.size, 1);
      if (ratio < VISIBLE_RATIO) continue;

      idsToQueue.push(id);
    }

    if (!idsToQueue.length) return;

    idsToQueue.forEach((id) => pendingRef.current.add(id));

    if (timerRef.current != null) return;

    timerRef.current = window.setTimeout(async () => {
      timerRef.current = null;

      const batch = Array.from(pendingRef.current);
      if (!batch.length) return;

      pendingRef.current.clear();

      try {
        await markAsRead(batch).unwrap();
        batch.forEach((id) => markedRef.current.add(id));
      } catch {
        batch.forEach((id) => pendingRef.current.add(id));
      }
    }, MARK_READ_DELAY_MS);
  }, [virtualItems, items, isLoading, markAsRead]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  return (
    <Box height='100%' width='100%' display='flex' flexDirection='column'>
      <Box px={1} py={1} borderBottom='1px solid' borderColor='divider'>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          alignItems='center'
          spacing={1}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={toggleAll}
                disabled={selectableIds.length === 0}
              />
            }
            label='Выбрать все'
          />

          <Button
            variant='contained'
            color='error'
            size='small'
            disabled={selectedCount === 0 || isDeleting}
            onClick={deleteSelected}
          >
            Удалить выбранные ({selectedCount})
          </Button>
        </Stack>
      </Box>

      <Box ref={parentRef} role='list' flex={1} overflow='auto'>
        <Box
          position='relative'
          width='100%'
          style={{ height: rowVirtualizer.getTotalSize(), paddingBottom: 16 }}
        >
          {virtualItems.map((virtualRow) => {
            const index = virtualRow.index;
            const item = items[index];

            const id = item?.messageId;
            const isSelected = id ? selectedRef.current.has(id) : false;

            return (
              <Box
                key={virtualRow.key}
                data-index={index}
                ref={setRowRef}
                role='listitem'
                aria-posinset={index + 1}
                aria-setsize={count}
                position='absolute'
                top={0}
                left={0}
                width='100%'
                boxSizing='border-box'
                p={1}
              >
                <Box display='flex' alignItems='flex-start'>
                  <Box pt={1}>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => id && toggleOne(id)}
                      disabled={
                        !id || item?.statusNotif === StatusNotification.deleted
                      }
                      size='small'
                    />
                  </Box>

                  <Box flex={1}>
                    <RowContent item={item} isLoading={isLoading || !item} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

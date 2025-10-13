Поскольку дев стенд бэка умеет работать только с дев стендом фронта, нужно чтоб хост при локальной разработке и на стенде совпадали 

Для этого нужно:


1) # /etc/hosts (Windows: C:\Windows\System32\drivers\etc\hosts) - для windows прописать в фаил hosts в любое место на отдельной строке строчку 

127.0.0.1 front.dev.sport-unite.it-mentor.space


2) Запустить проект на http://front.dev.sport-unite.it-mentor.space:5173/
# grand-theft-bike


<p align="center">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_5.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_6.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_7.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_9.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_11.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_12.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_13.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_14.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_15.png?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_1.jpg?raw=true" width="350" alt="accessibility text">
 <img src="https://github.com/wildegor/grand-theft-bike/blob/main/screenshots/Screenshot_4.png?raw=true" width="350" alt="accessibility text">
</p>

Задание
Известная компания, занимающаяся прокатом велосипедов в крупных городах России, испытывает проблемы с частой кражей их имущества (велосипедов). Как возможное решение проблемы, компания хочет вести учет этих случаев и отслеживать прогресс. Их собственные разработчики уже подготовили серверную часть приложения (API http://84.201.129.203:8888/), требуется реализовать клиентскую часть.

Последовательность действий при инициализации должна быть такая:


Запросить у ментора персональный clientId
Через POST /api/auth/sign_up создаем себя как пользователя с данным clientId
Авторизуемся через POST /api/auth/sign_in под собой
Получаем token и уже с ним делаем все авторизованные запросы.
Требования
Главная страница должна содержать текстовое описание сервиса. Возможно, картинки на ваш выбор. Страница должна быть доступна всем пользователям без авторизации.
Сообщить о краже должна содержать форму для отправки информации об украденном велосипеде. Страница должна быть доступна всем пользователям без авторизации.
Админка
 — Авторизация

 — Регистрация

 — Украденные велосипеды должна содержать список всех известных случаев (Подсказка: это может быть таблица). На этой странице должна быть возможность поменять статус сообщения ("новый", "в процессе", "завершен"). При выборе статуса "завершен" система дополнительно должна запрашивать завершающий комментарий. Отображать служебные поля, например clientId не нужно. Должна быть возможность удалить сообщение.

 — Детальная страница велосипеда должна отображать детальную страницу велосипеда с возможностью редактирования любого поля, кроме createdAt, updateAt и clientId. Для полей, которые могут принимать значения из списка необходимо сделать поля соответствующих типов. Поле завершающего комментария (resolution) должно быть доступно только при выборе статуса "завершен". Предусмотреть валидацию, типы полей и правила их заполнения ниже.

 — Новый случай должна отображать форму добавления нового случая кражи.

 — Ответственные сотрудники должна содержать список всех доступных сотрудников. Если сотрудник еще не одобрен, в таблице должна быть кнопка одобрить. Должна быть возможность удалить сотрудника.

 — Детальная страница сотрудника - детальная информация по сотруднику с возможностью редактирования. Служебные поля редактировать нельзя.

Описание API
Запись вида :id означает, что запрос имеет динамическую часть, в данном случае id. Двоеточие при запросе опускается, так как нужно только ля обозначения динамической части запроса. 

Сущности

Ответственный сотрудник:

Название поля	Тип	Атрибуты	Значение по умолчанию
email	string	обязательное и уникальное	
firstName	string		
lastName	string		
password	string		
clientId	string	обязательное	
approved	boolean	
false
Сообщение о краже:

Название поля	Тип	Атрибуты	Значение по умолчанию	Возможные значения
status	string	Обязательное	'new'	new/in_progress/done
date	Date		текущая дата	
licenseNumber	string	Обязательное		
color	string	Обязательное		
type	string			sport/general
ownerFullName	string	Обязательное		
officer	string			Идентификатор ответственного сотрудника из базы
createdAt	Date	Обязательное	Текущая дата	
updateAt	Date	Обязательное	Текущая дата	
clientId	string	Обязательное		
description	string			
resolution	string	Обязательно, если status - done	
Запросы

Все запросы работают с форматом JSON, поэтому не забывайте указывать заголовок Content-type: application/json.

* POST /api/auth/sign_in { "email": "student@skillfactory.ru", "password": "123456" }

В ответе на этот запрос, в поле token вы получите токен, который вам нужно использовать для запросов доступных только авторизованным пользователям. *Подсказка*: рекомендуется сохранять этот токен в local storage, чтобы не проходить авторизацию постоянно. Token необходимо передавать в каждом запросе, доступном только авторизованным пользователям в следующем заголовке: Authorization: Bearer <token>

* POST /api/auth/sign_up сюда передаем все поля сущности "Ответственный сотрудник"

{ "email": "student@skillfactory.ru", "firstName": "Ivan", "lastName: "Ivanov", "password": "123456", "repassword": "123456", "clientId": "<ваш clientId" }

* POST /api/public/report сюда передаем все поля сущности "Сообщение о краже". Примечание: этот запрос доступен без авторизации.

Во всех следующих запросах clientId указывать НЕ НУЖНО. Они доступны только авторизованным пользователям. clientId будет автоматически браться из информации авторизованного пользователя.
Сообщения о кражах
POST /api/cases - создание нового сообщения
PUT /api/cases/:id - редактирование сообщения, где :id - идентификатор редактируемого сообщения (в запросах он возвращается, как _id)
DELETE /api/cases/:id - удаление сообщения
GET /api/cases - получение всех сообщений
GET /api/cases/:id - информация по конкретному сообщению
Ответственные сотрудники

POST /api/officers - создание нового сотрудника
PUT /api/officers/:id - редактирование сотрудника по id (можно использовать например для функции "одобрить")
DELETE /api/officers/:id - удаление сотрудника
GET /api/officers - список всех сотрудников
GET /api/officers/:id - информация по конкретному сотруднику

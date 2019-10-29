# API DOCUMENT

## ：Catalogs

    1). Login A User
    2). Register A User
    3). Get Logged In User

    4). Get All Events
    5). Post An Event
    6). Update An Event
    7). Delete An Event

    8). Upload An Image
    9). Get An Image

10). Delete An Image

## 1. Login A User

### Request URL：

    http://localhost:5000/api/auth

### Access

    PUBLIC

### Request：

    POST

### Params

    |params		 |required   |type      |desc
    |email       |Y          |string    |email
    |password    |Y          |string    |password

### Response：

    success:
      {
        "status": 200,
        "token": ...
      }
    fail
      {
        "status": 400,
        "msg": "Invalid Credentials!"
      }

## 2. Register A User

### Request URL:

    http://localhost:5000/api/users

### Access

    PUBLIC

### Request：

    POST

### Params

    |params		          |required   |type       |desc
    |username             |Y          |string     |username
    |email                |Y          |string     |email
    |password             |N          |string     |password
    |confirm password     |N          |string     |confirmed password

### Response：

    success:
      {
        "status": 0,
        "token": ...
      }
    fail
      {
        "status": 400,
        "msg": "User already exists"
      }

## 3. Get Logged In User

### Request URL:

    http://localhost:5000/api/auth

### Access

    PRIVATE

### Request：

    GET

### Params

    |params		          |required   |type       |desc
    |token                |Y          |string     |axios request header token

### Response：

    success:
    {
        "status": 200,
        "user": {
            "_id": "5d657ac0e6bed4eb30eed8a4",
            "name": "Test",
            "email": "test@test.com",
            "date": "2019-08-27T18:47:28.705Z",
            "avatar": "https://ui-avatars.com/api/?name=Test",
            "goingEvents": [],
            "__v": 0
        }
    }
    fail:
      {
        "status": 401,
        "msg": "Token is not valid"
      }

## 4. Get All Events

### Request URL:

    http://localhost:5000/api/events

### Access

    PUBLIC

### Request：

    GET

### Params

    |params		            |required   |type       |desc

### Response：

    success:
    {
        "status": 200,
        "events": [
            {
                "type": "Circuit",
                "poster": "image-1567831801880.png",
                "attendees": [
                    {
                        "_id": "5d657b3ac71c735a2dea931e",
                        "name": "shuai",
                        "email": "elviswang93@gmail.com",
                        "date": "2019-08-27T18:49:30.492Z",
                        "avatar": "https://ui-avatars.com/api/?name=shuai",
                        "goingEvents":[5d7337192ddb92866acbc4cc[ref]],
                        "__v": 0
                    }
                ],
                "_id": "5d7337192ddb92866acbc4cc",
                "name": "Alegria",
                "date": "2019-09-08T16:00",
                "location": "Brooklyn Mirage",
                "creator": "5d657ac0e6bed4eb30eed8a4",
                "__v": 0
            },
            {
                "type": "Rave",
                "poster": "image-1567831486781.png",
                "attendees": [
                    {
                        "_id": "5d657b3ac71c735a2dea931e",
                        "name": "shuai",
                        "email": "elviswang93@gmail.com",
                        "date": "2019-08-27T18:49:30.492Z",
                        "avatar": "https://ui-avatars.com/api/?name=shuai",
                         "goingEvents":[],
                        "__v": 0
                    }
                ],
                "_id": "5d7335f22ddb92866acbc4b0",
                "name": "Diplo Higher Ground",
                "date": "2019-09-22T16:00",
                "location": "Brooklyn Mirage ",
                "creator": "5d657ac0e6bed4eb30eed8a4",
                "__v": 0
            }
    }
    fail:
      {
        "status": 401,
        "msg": "Token is not valid"
      }

## 5. Update An Event

### Request URL:

    http://localhost:5000/api/events/:id

### Access

    PRIVATE

### Request：

    PUT

### Params

    |params		          |required   |type       |desc
    |name                 |N          |string     |event name
    |date                 |N          |string     |event date
    |location             |N          |string     |event location
    |type                 |N          |string     |event type
    |poster               |N          |string     |event poster name
    |creator              |N          |string     |event creator id
    |attendees            |N          |array      |event attendees

### Response：

    success:
    {
        "status": 200,
        "event": {
            "type": "rave",
            "poster": "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
            "attendees": [],
            "_id": "5d741d77799d3282d5ecbbee",
            "name": "Gorgon City Pres. REALM",
            "date": "Fridat 07/12 22:00 - 04:30",
            "location": "Brooklyn Mirage - Avant Gardner",
            "creator": "5d657ac0e6bed4eb30eed8a4",
            "__v": 0
        }
    }
    fail:
      {
        "status": 400,
        "msg": "name is required"
      }

## 6. Update An Event

### Request URL:

    http://localhost:5000/api/events/:id

### Access

    PRIVATE

### Request：

    POST

### Params

    |params		            |required   |type       |desc
    |name                 |Y          |string     |event name
    |date                 |Y          |string     |event date
    |location             |Y          |string     |event location
    |type                 |Y          |string     |event type
    |poster               |N          |string     |event poster name
    |creator              |Y          |string     |event creator id
    |attendees            |N          |array      |event attendees

### Response：

    success:
    {
        "status": 200,
        "event": {
            "type": "rave",
            "poster": "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
            "attendees": [],
            "_id": "5d741d77799d3282d5ecbbee",
            "name": "Gorgon City Pres. REALM",
            "date": "Fridat 07/12 22:00 - 04:30",
            "location": "Brooklyn Mirage - Avant Gardner",
            "creator": "5d657ac0e6bed4eb30eed8a4",
            "__v": 0
        }
    }
    fail:
      {
        "status": 400,
        "msg": "name is required"
      }

## 7. Delete An Event

### Request URL:

    http://localhost:5000/api/events/:id

### Access

    PRIVATE

### Request：

    DELETE

### Params

    |params		            |required   |type       |desc
    |id                   |Y          |string     |event id

### Response：

    success:
    {
        "status": 200,
        "msg": "Event removed"
    }
    fail:
      {
        "status": 401,
        "msg": "Not Authorized"
      }

## 8. Delete An Event

### Request URL:

    http://localhost:5000/api/img/upload

### Access

    PRIVATE

### Request：

    POST

### Params

    |params		            |required   |type       |desc
    |image                |Y          |document   |picture file

### Response：

    success:
      {
          "status": 200,
          "document": {
              "imageName": "image-1567895527211.png",
              "_id": "5d742fe7c4de718b0dfc6273",
              "imageData": "5d742fe7c4de718b0dfc6271",
              "__v": 0
          }
      }
    fail:
      {
        "msg": "No token, authorization denied"
      }

## 9. Get An Image

### Request URL:

    http://localhost:5000/api/file/:filename

### Access

    PUBLIC

### Request：

    GET

### Params

    |params		            |required   |type       |desc
    |imageName            |Y          |string     |filename

### Response：

    success:
      Image
    fail:
      {
          status: 404,
          msg: "No file founded"
      }

## 9. Delete An Image

### Request URL:

    http://localhost:5000/api/file/:filename

### Access

    PRIVATE

### Request：

    DELETE

### Params

    |params		            |required   |type       |desc
    |imageName            |Y          |string     |filename

### Response：

    success:
      {
        status: 200,
         msg: "Image removed"
      }
    fail:
      {
          status: 404,
          msg: "Image not found"
      }

# Server
NodeJs, MongoDB를 사용하여 구성하였습니다.

<hr>

## How to Start

```bash
$ cd [Base directory]
$ git clone https://github.com/KNU-MobileApp-Team8/Server.git
$ cd Server/Server
$ npm install --save
$ mongodb --dbpath [Database directory]
$ node app.js
```

# API references
예시로 사용되는 curl은 아래 링크에서 다운로드 받으실 수 있습니다.

https://curl.haxx.se/download.html

## All User (Client)
### Path: /api/building
#### 1. GET : 교내 모든 건물들의 정보 요청
##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/building
```

##### Response( Success의 경우)

|<center>Name</center>|<center>Type</center>|
|---|---|
|Buildings|Array(Json)|

#### 2. GET : 교내 특정 건물의 정보 요청(Path : /api/building/:number)
##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/building/400
```

##### Response( Success의 경우)
|<center>Name</center>|<center>Type</center>|
|---|---|
|Building|Json|

### Path: /api/roadspot
#### 1. GET : 교내 모든 경로들의 정보 요청

##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/roadspot
```

##### Response( Success의 경우)

|<center>Name</center>|<center>Type</center>|
|---|---|
|RoadSpots|Array(Json)|

#### 2. GET : 교내 특정 경로의 정보 요청(Path : /api/roadspot/:number)
##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/roadspot/10
```

##### Response( Success의 경우)
|<center>Name</center>|<center>Type</center>|
|---|---|
|RoadSpot|Json|

### Path: /api/path?from={:roadSpotNumber}&to={:buildingNumber}
#### 1. GET : 특정 분기점과 도착 건물에 대한 경로 정보 요청

```bash
$ curl - X GET http://HOST:PORT/api/path?from=1001&to=501
```

##### Response( Success의 경우)
|<center>Name</center>|<center>Type</center>|
|---|---|
|Path|Array(Integer)|

### Status Code
#### 2XX: 성공

|<center>Code</center>|<center>Description</center>|
|---|---|
|200|Success|

#### 4XX: 클라이언트 요청 에러

|<center>Code</center>|<center>Description</center>|
|---|---|
|400|Insufficient or incorrect parameters|
|404|No data in server|
|409|Conflict|

#### 5XX: 서버 응답 에러
|<center>Code</center>|<center>Description</center>|
|---|---|
|500|Server error|

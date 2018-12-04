# Server
NodeJs, MongoDB를 사용하여 구성하였습니다.
<br><BR>관리자 인증방식: 현재 구성중이며, 추후에 업데이트할 예정입니다.
<br>HOST, PORT: 실제 서버에 실행시킨 후, 업데이트할 예정입니다. 
<hr>

## How to Start

```bash
$ cd 'Base directory'
$ git clone https://github.com/KNU-MobileApp-Team8/Server.git
$ cd Server/Server
$ npm install --save
$ node app.js
```
# API references
예시로 사용되는 curl은 아래 링크에서 다운로드 받으실 수 있습니다.

https://curl.haxx.se/download.html

## All User (Client)
### Path: /api/building
#### 1. GET : 교내 모든 건물들의 정보를 읽어들임
##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/building
```

##### Response( Success의 경우)

|<center>Name</center>|<center>Type</center>|
|---|---|
|Buildings|Array(Json)|

#### 2. GET : 교내 특정 건물의 정보를 읽어들임(Path : /api/building/:number)
##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/building/400
```

##### Response( Success의 경우)
|<center>Name</center>|<center>Type</center>|
|---|---|
|Building|Json|

### Path: /api/roadspot
#### 1. GET : 교내 모든 경로들의 정보를 읽어들임

##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/roadspot
```

##### Response( Success의 경우)

|<center>Name</center>|<center>Type</center>|
|---|---|
|RoadSpots|Array(Json)|

#### 2. GET : 교내 특정 경로의 정보를 읽어들임(Path : /api/roadspot/:number)
##### Request example

```bash
$ curl -X GET http://HOST:PORT/api/roadspot/10
```

##### Response( Success의 경우)
|<center>Name</center>|<center>Type</center>|
|---|---|
|RoadSpot|Json|

### Status Code

|<center>Code</center>|<center>Description</center>|
|---|---|
|200|Success|
|400|Insufficient or incorrect parameters|
|404|No data in server|
|500|Server error|


## Administer( 일반 사용자의 GET API를 포함합니다.)
### Path: /api/building/:number
#### 1. POST : 하나의 교내 건물의 정보를 등록
##### Request

|<center>Data</center>|<center>Type</center>|
|---|---|
|Name|String|
|GPS|String|
|Colleges|Array(String)|
|Description|String|

##### Request example

```bash
$ curl --header "Content-Type: application/json" \
--request POST \
--data '{"Name":"공대 9호관", "GPS":"12.34:56.78","Description":"컴퓨터학부, 화학공학과가 사용하는 건물로써~"}' \
http://HOST:PORT/api/building/418
```

#### 2. PUT : 하나의 교내 건물의 정보를 수정
##### Request

|<center>Data</center>|<center>Type</center>|
|---|---|
|Name|String|
|GPS|String|
|Colleges|Array(String)|
|Description|String|

##### Request Example

```bash
$ curl --header "Content-Type: application/json" \
--request PUT \
--data '{"Name":"융복합관", "GPS":"12.34:56.78","Description":"컴퓨터학부가 2018년 하반기에 새로 이전한 건물로써~"}' \
http://HOST:PORT/api/building/418
```

#### 3. DELETE : 하나의 교내 건물의 정보를 삭제

##### Request example

```bash
$ curl -X DELETE http://HOST:PORT/api/building/418
```

### Path: /api/roadspot/:number
#### 1. POST : 하나의 교내 분기점의 정보를 등록
##### Request

|<center>Data</center>|<center>Type</center>|
|---|---|
|GPS|String|
|Connected|Array(Integer)|

##### Request example

```bash
$ curl --header "Content-Type: application/json" \
--request POST \
--data '{"GPS":"12.34:56.78","Connected":[1,2,3,4,5]}' \
http://HOST:PORT/api/roadspot/10
```

#### 2. PUT : 하나의 교내 분기점의 정보를 수정
##### Request

|<center>Data</center>|<center>Type</center>|
|---|---|
|GPS|String|
|Connected|Array(Integer)|

##### Request example

```bash
$ curl --header "Content-Type: application/json" \
--request PUT \
--data '{"GPS":"12.34:56.78", Connected":[1,2,3,4,5,6]}' \
http://HOST:PORT/api/roadspot/10
```

#### 3. DELETE : 하나의 교내 의 정보를 삭제

##### Request example

```bash
$ curl -X DELETE http://HOST:PORT/api/roadspot/10
```

### Status Code
#### 2XX: 성공

|<center>Code</center>|<center>Description</center>|
|---|---|
|200|Success|
|201|Successfully create data(POST)|
|204|Successfully delete data(DELETE)|

#### 4XX: 클라이언트 요청 에러

|<center>Code</center>|<center>Description</center>|
|---|---|
|400|Insufficient or incorrect parameters|
|401|Unauthorized|
|404|No data in server|
|409|Conflict|

#### 5XX: 서버 응답 에러
|<center>Code</center>|<center>Description</center>|
|---|---|
|500|Server error|

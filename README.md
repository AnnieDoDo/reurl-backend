# ReURL Back-end
> 這是一個 短網址 服務的後端

### 必要需求
- [x] 專案需要使用 Git 管理專案，並公開至 GitHub
- [x] Git commit 訊息需符合 Conventional Commits，並使用英文撰寫
- [x] 專案須包含 README.md，其中描述專案的安裝、建置、使用，包含的功能與操作方式
- [x] 前端使用 React.js 16 以上實作整個頁面與元件
- [x] 後端使用 Node.js 14 以上
- [x] 使用者可以填入一段網址，會產生一段短網址
- [x] 使用者可以瀏覽短網址，服務會將短網址重新導向到原始網址
### 專案需符合以下至少兩項需求
- [ ] 使用 TypeScript 4.3 以上實作
- [x] 後端使用任一套 ORM 搭配任一套 RDBMS
- [ ] 整個 React App 使用 Functional Component
- [x] 使用套件檢查程式碼風格 (例如：JavaScript Standard、ESLint)
- [ ] 專案需要能被公開瀏覽使用 (例如使用 Heroku)
- [ ] 單元測試
- [ ] E2E 測試
- [ ] 整合 CI/CD 流程
### 需挑選以下至少兩項功能實作
- [x] 需要驗證網址有效
- [ ] 使用者可以使用密碼註冊、登入、登出
- [ ] 使用者可以新增、建立、更新、刪除多個短網址
- [ ] 短網址重新導向的過程使用快取 (可暫時避免向資料庫查詢)
- [ ] 使用者可以知道短網址瀏覽次數
- [x] 服務會避免短網址重複重導向到相同網址
- [ ] 從短網址拿到原始網址的 Open Graph Metadata （標題、描述、圖片）
- [ ] 使用者可以自訂 Open Graph Metadata（標題、描述、圖片）

## Install

### Backend
$ git clone https://github.com/AnnieDoDo/reurl-backend.git

$ npm install

$ node index.js

### Frontend

$ git clone https://github.com/AnnieDoDo/reurl-frontend.git

$ npm install

$ npm start

## Database Schema
### User
 Table User| type | feature 
------|----------------|---------------  
id | STRING | primary key
username | STRING
password | STRING

### Link
 Table Link| type | feature 
------|----------------|---------------  
id | STRING | primary key
url | STRING
key | STRING
count | NUMBER

## API

### Environments

| Name |  Url |
| -- | -- |
| localhost | localhost:3500 |

### GET /
**Resource URL**
`/`

**Query Key**
| Name | Format | Required | Description |
| -- | -- | -- | -- |
| url | string | Yes |  |

**Example Request**
`http://{localhost}/?url=https://hackmd.io/@hackmd/2021-8-interview-assignment`

**Example Response**

```http://localhost:3500/redirect?urlkey=4a750tkt17ra8d```

### GET /redirect

**Resource URL**
`/redirect`

**Query Key**
| Name | Format | Required | Description |
| -- | -- | -- | -- |
| reurl | string | Yes |  |

**Example Request**
`http://{localhost}/redirect?urlkey=4a750tkt17ra8d`

**Example Response**

```
<!DOCTYPE html>
<html lang="dev">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="csrf-token" content="uH4N2pH5-ZLHZjafuebt6i79aT12xxKugB-k">


	<meta name="description"
		content="# 2021 年 8 月全端工程師 專案實作  請自行實作一個專案，是可以建立[短網址](https://en.wikipedia.org/wiki/URL_shortening)的服務，需求如下： ">

	<title>2021 年 8 月全端工程師 專案實作 - HackMD</title>
	<link rel="icon" type="image/png" href="https://hackmd.io/favicon.png">
	<link rel="apple-touch-icon" href="https://hackmd.io/apple-touch-icon.png">
    ...
    
```
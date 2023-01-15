## Structure:
This project contains two applications:
- server app (inside of a './server' folder)
- client app (inside of a './client' folder)

The task is related to the client app. So everything what you have to do you will do it inside of a './client' folder

## Steps:
1. Download and install node here - https://nodejs.org/en/ (if needed)
2. Open project using VSC or some other code editor
3. Run command in terminal (inside of this folder): `npm run setup` (it should install all dependencies)
4. Run command in terminal (inside of this folder): `npm run start_server` (it should start server app)
5. Open additional terminal and run command: `npm run start_client` (it should start client app)

##  API:
Client app should use api provided by server app.
Here is endpoints description:

### BASE_URL = http://localhost:8080

### Create post:
* url: `/post`
* method: `'POST'` </br>

body:
```typescript
{
    title: string,
    username: string
}
```
response:
```typescript
success: boolean,
result: {
    id: number,
    title: string,
    username: string,
    likes: string[], //usernames
    dislikes: string[], //usernames
    imageSrc: string, //path
    date: number,
    comments: Comment[]
}
```
### Update post
* url: `/post/:id`
* method: `'PUT'` </br>

body:
 ```typescript
 {
    title?: string,
    likes?: string[],
    dislikes?: string[]
}
```
response:
```typescript
success: boolean,
result: {
    id: number,
    title: string,
    username: string
    likes: string[]
    dislikes: string[]
    date: number,
    comments: Comment[]
}
```

### Filter / search by keyword
* url `/post/search/${keyWord}`
* method: `'GET'` </br>

response:
```typescript
success: boolean,
result: [
    {
        id: number,
        title: string,
        username: string
        likes: string[] //usernames
        dislikes: string[] //usernames
        imageSrc: string //path
        date: number,
        comments: Comment[]
    }
    ...
]
```
### Get posts by pages (9 posts per page)
* url `/post/page/${pageNumber}` // pageNumber > 0
* method: `'GET'` </br>

response:
```typescript
success: boolean,
result: [
    {
        id: number,
        title: string,
        username: string
        likes: string[] //usernames
        dislikes: string[] //usernames
        imageSrc: string //path
        date: number,
        comments: Comment[]
    }
    ...
]
total: number,
page:number,
totalPages: number
```
### Delete post
* url: `/post/:id`
* method: `'DELETE'` </br>

response:
```typescript
success: boolean,
result: {
    id: number,
    title: string,
    username: string
    likes: string[], //usernames
    dislikes: string[], //usernames
    imageSrc: string, //path
    date: number,
    comments: Comment[]
}
```

### Upload post picture
* url: `/post/:id/picture`
* method: `'POST'` </br>

body:
```javascript
FormData // should contain file like this formData.append("picture", file);
```
response:
```typescript
success: boolean,
result: {
    id: number,
    title: string,
    username: string
    likes: string[], //usernames
    dislikes: string[], //usernames
    imageSrc: string, //path
    date: number,
    comments: Comment[]
}
```

### Create comment
* url: `/comment`
* method: `'POST'` </br>

body:
```typescript
{
    text: string,
    postId: number,
    username: string,
}
```
response:
```typescript
success: boolean,
result: {
    id: number,
    text: string,
    postId: number,
    username: string,
    likes: string[], //usernames
    dislikes: string[], //usernames
    date: number
}
```
### Update comment
* url: `/comment/{id}`
* method: `'PUT'` </br>

body:
```typescript
{
    text: string,
    likes: string[],
    dislikes: string[],
}
```
response:
```typescript
success: boolean,
result: {
    id: number,
    text: string,
    postId: number,
    username: string,
    likes: string[], //usernames
    dislikes: string[], //usernames
    date: number
}
```
### Delete comment
* url: `/comment/:id`
* method: `'DELETE'`

response:
```typescript
success: boolean,
result: {
    id: number,
    text: string,
    postId: number,
    username: string,
    likes: string[], //usernames
    dislikes: string[], //usernames
    date: number
}
```
----
## Additional (rarely used)

### Get all posts
* url: `/post`
* method: `'GET'`

response:
```typescript
success: boolean,
result: [
    {
        id: number,
        title: string,
        username: string
        likes: string[], //usernames
        dislikes: string[], //usernames
        imageSrc: string //path
        date: number,
        comments: Comment[]
    }
    ...
]
```
### Get post
* url: `/post/:id`
* method: `'GET'`

response:
```typescript
success: boolean,
result: {
    id: number,
    title: string,
    username: string
    likes: string[], //usernames
    dislikes: string[], //usernames
    imageSrc: string //path
    date: number,
    comments: Comment[]
}
```
### Get comment
* url: `/comment/:id`
* method: `'GET'`

response:
```typescript
success: boolean,
result: {
    id: number,
    text: string,
    postId: number,
    username: string,
    likes: string[], //usernames
    dislikes: string[], //usernames
    date: number
}
```
### Get all comments
* url: `/comment`
* method: `/GET`

response:
```typescript
success: boolean,
result: [
    {
        id: number,
        text: string,
        postId: number,
        username: string,
        likes: string[], //usernames
        dislikes: string[], //usernames
        date: number
    },
    ...
]
```
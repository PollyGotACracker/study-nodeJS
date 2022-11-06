# Express

- https://expressjs.com/en/4x/api.html

## express()

- Express Application 생성

## Application: Express Application 객체 (App)

- HTTP 요청 routing (app.METHOD / app.param)
- 미들웨어 구성 (app.route)
- HTML view 렌더링 (app.render)
- template engine 등록 (app.engine)
- 애플리케이션 동작 방법 세팅

1. app.use([path,] callback [, callback...])

- 지정한 path 에 middleware 함수를 mount 한다. middleware 함수는 요청받은 path의 기본 경로(base)가 지정한 path 와 일치할 때 실행된다.

2. app.set(name, value)

- value 에 setting name 을 할당한다.
- 원하는 value 를 저장할 수도 있고, 특정 name 을 사용하여 서버의 동작을 구성할 수도 있다. name 은 app setting 테이블에 나열된다.
- boolean 프로퍼티에 대한 `app.set('foo', true)` 호출은 `app.enable('foo')` 호출과 같다. 마찬가지로 boolean 프로퍼티에 대해 `app.set('foo', false)` 호출은 `app.disable('foo')` 호출과 같다.
- `app.get()` 을 사용하여 setting value 를 찾는다.

## Request: 요청 객체

### req.query

- GET method 로 가져온 데이터, query string 을 담는다.
- route 에 있는 각각의 query string 파라미터의 프로퍼티를 갖는 객체이다.
- query parser 를 사용하지 않으면 빈 객체 {} 가 되며, 그렇지 않으면 설정된 query parser 의 결과값이다.

### req.body

- POST method 로 가져온 데이터를 담는다.
- request body 에 submit 된 데이터의 key-value 쌍을 가진다.
- express.json() 이나 express.urlencoded() 와 같이 HTTP body 를 parsing 하는 middleware 를 사용했을 때 값이 채워진다.
- 기본값은 undefined 이다.

### req.params

- route 의 파라미터에 매핑된 프로퍼티를 갖는 객체이다.
- 만약 /user/:name 의 route 를 사용했다면, name 속성은 req.params.name 으로 사용된다.
- 기본값은 {} 이다.

## Response: 응답 객체

### res.send([body])

- 클라이언트에 HTTP 응답을 보낸다.
- status code를 옵션으로 사용할 수 있다.
- 기본 Content-Type 은 text/html 이므로 text/plain 을 보내려면 res.set 을 먼저 사용해야 한다.

### res.render(view [, locals] [, callback])

- template engine 을 사용하여 view 를 렌더링하고, 렌더링된 HTML 을 클라이언트에게 보낸다.
- locals: view에 대한 지역변수가 정의된 프로퍼티를 갖는 객체이다.
- callback : callback 함수가 있다면 render 메서드는 발생할 수 있는 에러와 렌더링된 문자열 모두 반환하지만 자동 응답을 수행하지는 않는다.  
  에러가 발생하면 render 메서드는 내부적으로 next(err) 를 호출한다.  
  callback 의 view 인수는 렌더링할 view 파일의 경로인 문자열로, 절대경로나 views 설정의 상대경로로 지정할 수 있다.  
  경로에 파일 확장명이 없을 경우 view engine 설정에 따라 파일 확장명이 지정된다.  
  view 인수는 파일 시스템 연산을 수행하므로 사용자의 입력값을 포함해서는 안된다.

```
// send the rendered view to the client
// 클라이언트에게 렌더링 된 view 를 전달
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
// 만약 callback 이 지정된 경우 렌더링 된 HTML 문자열을 명시적으로 전송해야 함
res.render('index', function (err, html) {
  res.send(html)
})

// pass a local variable to the view
// view 에 지역변수 전달
res.render('user', { name: 'Tobi' }, function (err, html) {
  // ...
})
```

### res.json([body])

- JSON.stringify()를 사용하여 JSON 문자열로 변환된 파라미터 응답을 올바른 Content-Type 과 함께 클라이언트에게 보낸다.
- 파라미터는 object, array, string, boolean, number, null 을 포함한 모든 JSON 타입이다. 또는 다른 값을 JSON 형식으로 변환할 수 있다.

### res.redirect([status,] path)

- 지정한 경로(path)의 URL 로 이동시킨다.
- HTTP 상태 코드에 해당하는 status 를 양의 정수로 지정하여 응답을 보낼 수 있다.
- status 를 지정하지 않을 경우 “302 Found” 가 기본값이다.

## Router: 라우터 객체

- http://expressjs.com/en/guide/routing.html
- route 와 middleware 의 기능을 수행하는 독립적인 인스턴스

1. router.METHOD(path, [callback, ...] callback)

- GET, PUT, POST 등의 HTTP 메서드를 사용하여 라우팅 기능을 제공한다(`router.get()`, `router.post()`, `router.put()` ...).
- 여러 개의 callback 을 사용할 수 있으며, callback 이 next('route') 를 호출하여 나머지 route callback 들을 우회할 수 있다는 특징을 갖는다.  
  이를 사용하여 route 에서 사전 조건(pre-condition)을 수행한 후, 현재 route 를 진행할 이유가 없다면 그 다음 route 에 제어를 전달할 수 있다.
- path 문자열에는 콜론(:)을 이용해 파라미터를 사용할 수 있으며, 구체적인 제약 조건이 있는 경우 정규표현식을 사용할 수 있다.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

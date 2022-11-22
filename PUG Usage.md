# PUG

- https://pugjs.org/api/getting-started.html

---

## Class / ID Literal

```
section#main
section.main
section#main.main
```

- class 나 id 는 띄어쓰기하지 않는다.

## Attributes

```
a(class='button' href='//google.com') Google
a(class='button', href='//google.com') Google
```

```
- var authenticated = true
body(class=authenticated ? 'authed' : 'anon')
```

- 속성의 값에 JS 변수, `+` 기호나 template literal `` `${ }` `` 을 사용할 수 있다.
- 텍스트 사이에 변수 사용 시 `#{ }` 을 사용한다. `p Welcome to #{title}`
- 변수의 값을 문자열로 사용할 경우 backtick 으로 묶는다.

## Tags

- tag 안의 텍스트는 tag 뒤에서 띄어쓰기 후 쓴다.
- 열거나 닫는 태그를 사용하지 않는다.
- 들여쓰기로 중첩 태그(nested tags)를 표현한다. 주석도 들여쓰기로 범위가 적용된다.  
  (들여쓰기를 할 때 tab 과 space 를 같이 사용할 경우 오류가 발생할 수 있다.)

```
ul
  li Item A
  li Item B
  li Item C
```

- 중첩 태그를 inline 으로 사용하려면 콜론(:)을 사용한다. `a: img`

## Code

```
- for (var x = 0; x < 3; x++)
  li item
```

- 여러 줄에 걸쳐 코드 작성 시(block unbuffered code) hyphen(-) 다음 줄부터 작성한다.

```
-
var list = ["Uno", "Dos", "Tres",
          "Cuatro", "Cinco", "Seis"]
each item in list
  li= item
```

## Comments

- `//` : HTML 의 `<!-- -->` 과 같다.
- `//-` : 렌더링된 HTML에서 주석이 나타나지 않는다. `//` 로 닫아서 여러 줄의 주석을 달 수 있다.

## Iteration

### each

```
ul
  each val, index in ['zero', 'one', 'two']
    li= index + ': ' + val

ul
  each val, key in {1: 'one', 2: 'two', 3: 'three'}
    li= key + ': ' + val
```

## Conditionals

```
- var user = {description: 'foo bar baz'}
- var authorised = false
#user
  if user.description
    h2.green Description
    p.description= user.description
  else if authorised
    h2.blue Description
    p.description.
      User has no description,
      why not add one...
  else
    h2.red Description
    p.description User has no description
```

## Includes

```
link(rel='stylesheet', href='/css/style.css')
script(src='/javascripts/jquery.js')
script(src='/javascripts/app.js')

```

## Template Inheritance

- `block`, `extends` 키워드로 복잡한 페이지 템플릿 구조를 작고 단순한 파일로 분할할 수 있다.
- `block` : 내부 코드를 모듈화하는 키워드. 키워드 뒤에 오는 문자(content)는 원하는 대로 지정할 수 있다. `block content`  
  layout 파일에서는 block 키워드가 단 한번 사용되며, 각 block 파일들은 해당 파일이 실행될 때 layout 파일의 내용을 포함한다.
- `extends` : 다른 파일을 import 하는 키워드. block 이 있는 파일의 최상단에 사용한다. `extends layout`
- 다른 파일 또는 router 에서 전달한 변수의 값을 사용할 수 있다. 등호 앞은 띄어쓰기 하지 않는다. `h1= title`

```
//- layout.pug
html
  head
    title My Site - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p some footer content

//- page-a.pug
extends layout.pug

block scripts
  script(src='/jquery.js')
  script(src='/pets.js')

block content
  h1= title
  - var pets = ['cat', 'dog']
  each petName in pets
    include pet.pug
```

## Includes

- `include` 키워드를 사용하여 다른 pug 파일의 내용을 삽입할 수 있다.

```
doctype html
html
  include includes/head.pug
  body
    ...
    include includes/foot.pug
```

- js, css 등 다른 형식의 파일도 삽입할 수 있다.

```
doctype html
html
  head
    style
      include style.css
  body
    ...
    script
      include script.js
```

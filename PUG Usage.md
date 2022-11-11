# PUG

- link(rel='stylesheet', href='/css/style.css')
- block : 내부 코드를 모듈화하는 키워드 block content
- extends : 다른 파일을 import 하는 키워드 extends layout
- 열거나 닫는 태그 없음, 들여쓰기에 주의+주석도(Python 과 유사. tab 키 사용)
- `h1= title` router 에서 전달한 변수 사용. = 앞에 띄어쓰기 X
- `p Welcome to #{title}` 변수 사용 시 ${ } 가 아닌 #{ } 사용
- 템플릿 리터럴 사용 가능 `` `${ }` `` 사용 가능

## id / class 정의

- id 정의 : section#main
- class 정의 : section.main
- id 와 class : section#main.main
- 띄어쓰기 x
- form(method="POST").today

# Embedded JavaScript templates

- https://ejs.co/#features
- https://www.npmjs.com/package/ejs
- https://github.com/mde/ejs/blob/main/docs/syntax.md

## Tags

### Starting tags

1. <%=: Escaped output

- 해당 변수의 값 출력
- HTML 태그를 escape 하기 때문에 다른 페이지에서 받아온 데이터를 삽입할 때 사용한다.
- HTML 태그의 속성값으로 쓰거나, JS 에서 문자열 값으로 사용할 경우 따옴표 또는 백틱으로 묶어줘야 한다. `"<%= username %>"`

2. <%-: Unescaped output

- 해당 변수의 값 출력
- HTML 태그를 escape 하지 않고 RAW 상태로 출력하므로 다른 파일의 코드를 include 할 때 주로 사용한다.
- HTML 태그의 속성값으로 쓰거나, JS 에서 문자열 값으로 사용할 경우 따옴표 또는 백틱으로 묶어줘야 한다. `"<%- username %>"`

3. <%#: Comments

- 주석 삽입

4. <%: Scriptlet

- JS 코드 삽입
- scope 가 적용되며 태그 내 줄바꿈이 가능하다.
- 단, 중괄호 사용 시 태그로 각각 묶어줘야 한다.

```
  <% if (shouldOutput) { %>
  <%= exclamation + 'It\'s ' + output %>
  <% } %>
```

- 개발자 모드로 코드를 확인할 수 없다.

### Ending tags

1. %>: Regular ending tag

- 일반적인 닫는 태그

2. -%>: Removes trailing newline

- 주석이나 JS 코드 삽입 시 불필요하게 나타나는 줄바꿈을 없애는 태그

## Include

- include(filename, [locals])
- views 폴더에 있는 다른 ejs 파일 삽입
- 경로가 ./views/user/show.ejs 라면, `<%- include("user/show") %>` 또는 `<%- include("./user/show.ejs") %>`

## Example

- included.ejs

```
<li><%= pet.name %></li>
```

- main.ejs

```
<ul>
<%  pets.forEach(function (pet) { -%>
  <%- include('included', {
        pet: pet
      }) %>
<%  }) -%>
</ul>
```

- Locals

```
{
  "pets": [
    {
      "name": "Hazel"
    }
  , {
      "name": "Crystal"
    }
  , {
      "name": "Catcher"
    }
  ]
}
```

- HTML

```
<ul>
  <li>Hazel</li>
  <li>Crystal</li>
  <li>Catcher</li>
</ul>
```

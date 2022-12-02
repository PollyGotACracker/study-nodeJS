# HTML RESTful API

- 표준 Ajax 의 RESTful API 는 XML 또는 JSON 데이터를 Response 한다.
- XML 또는 JSON 으로 받은 데이터는 클라이언트, 중간 서버(공공 DB에서 데이터를 가져올 경우)에서 데이터를 parsing 하여 원하는 모양으로 가공하는 작업을 수행할 수 있다.
- 이 방식은 클라이언트, 중간 서버가 데이터를 parsing 하여 view 를 만드는 데 많은 비용이 소모된다.
- 그에 반해 HTML Response 데이터는 표준화되지는 않았으나 클라이언트가 만드는 코드량을 매우 적게 구현할 수 있다.

## HTML RESTful API 구현

- 서버의 Router 의 응답 정보를 XML, JSON type 이 아닌 HTML 화면 구현 코드로 응답을 한다.
- 서버의 일반적인 Http 프로토콜을 활용하는 코드로 기존의 사용하던 view(rendering)를 최소한으로 만들어서 Response 한다.
- 표준 XML, JSON type 에 비해 네트워크를 통해서 전송되는 데이터량이 많아질 수 있다.
- 다른 용도로 데이터를 활용하려면 어려움이 있다.
- 클라이언트 입장에서는 복잡한 코드를 사용하여 tag 를 생성하고 데이터를 rendering 하는 절차를 생략하고, 간단히 innerHTML 속성에 text 데이터를 할당하여 화면을 구현할 수 있다.
- 표준 RESTful 과 HTML RESTful 어떤 것을 사용할 것인가는 프로젝트의 상황을 고려하여 선택한다.

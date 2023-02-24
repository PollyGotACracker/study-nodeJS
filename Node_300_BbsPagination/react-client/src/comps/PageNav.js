import { NavLink, useLoaderData } from "react-router-dom";

// useLoaderData 변수와 관계 없음
const pageNavView = (pagination) => {
  // 현재 nav 의 시작 Num
  const startNavNum = pagination.startNavNum;
  // 현재 nav 의 마지막 Num (ex. 41 + 10 = 51)
  let endNavNum = startNavNum + pagination.pageNavCount;
  // ex. pageTotalCount(맨 끝 Num) 가 48 일 경우, 51 > 48 --> endNavNum 은 49
  // startNavNum 은 보여지는 nav 개수보다 + 1 이기 때문
  endNavNum =
    endNavNum > pagination.pageTotalCount
      ? pagination.pageTotalCount + 1
      : endNavNum;

  // 마지막 nav 일 때...
  // Array(49 - 41)  --> [비어 있음 × 8]
  // Array(49 - 41).keys()  --> Array Iterator {}
  // Array.from(Array(49 - 41).keys()) --> [0, 1, 2, 3, 4, 5, 6, 7]
  // const arr = Array.from(Array(49 - 41).keys())  --> [0, 1, 2, 3, 4, 5, 6, 7]
  // arr.map(item => item + 41)  --> [41, 42, 43, 44, 45, 46 ,47, 48]

  // cf) 비교연산 && 값...
  // true: 값을 반환
  // false: bool 값인 false 를 반환
  const navNumArray = [
    0, // 맨 처음으로 가기
    startNavNum > 1 && (pagination.pageNum - 1) * -1, // 이전으로 가기(음수로 변환)
    // Num 으로 나타나는 nav 버튼
    // Array.keys() 를 사용하여 배열의 index 추출(iterable, array X)
    ...Array.from(Array(endNavNum - startNavNum).keys()).map(
      (v) => v + startNavNum
    ),
    endNavNum <= pagination.pageTotalCount && (pagination.pageNum + 1) * -1, // 이후로 가기(음수로 변환)
    Number.MAX_SAFE_INTEGER, // 맨 끝으로 가기
  ];

  return navNumArray.reduce((result, nav) => {
    if (nav !== false) {
      result = [
        ...result,
        <div key={nav}>
          <NavLink
            key={nav}
            className={({ isActive }) =>
              nav !== 0 && nav !== Number.MAX_SAFE_INTEGER && isActive
                ? "active"
                : ""
            }
            to={`/bbs/${
              nav < 0
                ? nav * -1 // 음수일 경우 양수로 변환
                : nav === 0
                ? 1 // 0: 맨 처음으로(1)
                : nav === Number.MAX_SAFE_INTEGER
                ? pagination.pageTotalCount // 정수 최대값: 맨 끝으로(pageTotalCount)
                : nav // 양수
            }`}
          >
            {nav < 0 ? (
              <>&middot;&middot;&middot;</>
            ) : nav === 0 ? (
              <>&#x2758;&lt;</>
            ) : nav === Number.MAX_SAFE_INTEGER ? (
              <>&gt;&#x2758;</>
            ) : (
              nav
            )}
          </NavLink>
        </div>,
      ];
    }
    return result;
  }, []);
};

const PageNav = () => {
  const { pagination } = useLoaderData();
  const pageNav = pageNavView(pagination);
  return <div className="pageNavBar">{pageNav}</div>;
};

export default PageNav;

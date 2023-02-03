import { NavLink, useLoaderData } from "react-router-dom";

// useLoaderData 변수와 관계 없음
const pageNavView = (pagination) => {
  // 현재 시작 nav 의 Num
  const startNavNum = pagination.startNavNum;
  // 현재 마지막 nav 의 Num
  let endNavNum = startNavNum + pagination.pageNavCount;
  endNavNum =
    endNavNum > pagination.pageTotalCount
      ? pagination.pageTotalCount + 1
      : endNavNum;

  // Array(10-5)  --> [비어 있음 × 5]
  // Array(10-5).keys()  --> Array Iterator {}
  // Array.from(Array(10-5).keys()) --> [0, 1, 2, 3, 4]
  // const arr = Array.from(Array(10-5).keys())  --> [0, 1, 2, 3, 4]
  // arr.map(item => item + 5)  --> [5, 6, 7, 8, 9]

  const navNumArray = [
    0, // 맨 처음으로 가기
    startNavNum > 1 && (pagination.pageNum - 1) * -1, // 이전으로 가기. 비교 결과 false 일 때 false 를 반환
    // 실제 나타나는 nav 버튼
    // Array.keys() 를 사용하여 배열의 index 추출(iterable, array X)
    ...Array.from(Array(endNavNum - startNavNum).keys()).map(
      (v) => v + startNavNum
    ),
    endNavNum <= pagination.pageTotalCount && (pagination.pageNum + 1) * -1, // 이후로 가기
    Number.MAX_SAFE_INTEGER, // 맨 끝으로 가기
  ];

  // nav * -1 : 음수로 만들었던 NavNum 을 다시 양수로 변환
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
                ? nav * -1
                : nav === 0
                ? 1
                : nav === Number.MAX_SAFE_INTEGER
                ? pagination.pageTotalCount
                : nav
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

import { useBBSContext } from "../context/BBSContext";
import { useState } from "react";

const BBSSearch = () => {
  const {
    orderList,
    filterList,
    orderValue,
    setOrderValue,
    filterValue,
    setFilterValue,
    searchInput,
    setSearchInput,
  } = useBBSContext();
  const [inputText, setInputText] = useState();

  const onChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setSearchInput(inputText);
    }
  };

  return (
    <div className="bbs search-box">
      <select
        value={orderValue.eng}
        className="w3-select w3-border w3-round-xlarge"
        onChange={(e) => {
          const t = e.target; // 이벤트 버블링에서 가장 하단의 tag
          const c = e.currentTarget; // 현재 tag
          setOrderValue({
            eng: t.value,
            kor: t.options[c.selectedIndex].text,
          });
        }}
      >
        {orderList.map((order) => (
          <option value={order.eng} key={order.eng}>
            {order.kor}
          </option>
        ))}
      </select>
      <select
        value={filterValue.eng}
        onChange={(e) => {
          const t = e.target; // 이벤트 버블링에서 가장 하단의 tag
          const c = e.currentTarget; // 현재 tag
          setFilterValue({
            eng: t.value,
            kor: t.options[c.selectedIndex].text,
          });
        }}
        className="w3-select w3-border w3-round-xlarge"
      >
        {filterList.map((filter) => (
          <option value={filter.eng} key={filter.eng}>
            {filter.kor}
          </option>
        ))}
      </select>
      <input
        value={inputText}
        defaultValue={searchInput}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder="검색어"
        className="w3-input w3-border w3-round-xlarge"
      />
    </div>
  );
};

export default BBSSearch;

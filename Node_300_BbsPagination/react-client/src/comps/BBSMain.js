import BBSList from "./BBSList";
import "../css/BBS.css";
import PageNav from "./PageNav";

export const loader = async ({ params }) => {
  const pageNum = params?.pageNum || 1;
  const listLimit = 5;
  const pageNavCount = 5;

  const res = await fetch(
    `/api?pageNum=${pageNum}&listLimit=${listLimit}&pageNavCount=${pageNavCount}`
  );
  const { bbsList, pagination } = await res.json();
  return { bbsList, pagination };
};

const BBSMain = () => {
  return (
    <>
      <BBSList />
      <PageNav />
    </>
  );
};

export default BBSMain;

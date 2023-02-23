// https://www.davidhu.io/react-spinners/storybook
import PuffLoader from "react-spinners/PuffLoader";

const loadingBox = {
  display: "flex",
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
};

const BBSLoading = () => {
  return (
    <div style={loadingBox}>
      <PuffLoader color={"#363cd6"} />
    </div>
  );
};

export default BBSLoading;

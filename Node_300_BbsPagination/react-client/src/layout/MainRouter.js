import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BBSMain, { loader as BBSLoader } from "../comps/BBSMain";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", loader: BBSLoader, element: <BBSMain /> },
      { path: "bbs/:pageNum", loader: BBSLoader, element: <BBSMain /> },
      { path: "bbs/detail/:id", loader: BBSLoader, element: <BBSMain /> },
    ],
  },
]);

export default MainRouter;

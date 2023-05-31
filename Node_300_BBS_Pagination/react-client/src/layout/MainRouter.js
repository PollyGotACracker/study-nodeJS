import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import BBSDetail from "../comps/BBSDetail";
import BBSList, { loader as BBSListLoader } from "../comps/BBSList";
import BBSLoading from "../comps/BBSLoading";
import BBSMain from "../comps/BBSMain";
import { useBBSContext } from "../context/BBSContext";

const MainRouterProvider = () => {
  const { orderValue, filterValue, searchInput } = useBBSContext();

  const MainRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <h1>여기는 Home 입니다.</h1> },
        {
          path: "bbs",
          element: <BBSMain />,
          children: [
            {
              path: ":pageNum",
              loader: async ({ params }) =>
                await BBSListLoader({
                  params,
                  values: { orderValue, filterValue, searchInput },
                }),
              element: <BBSList />,
            },
            { path: "detail/:id", element: <BBSDetail /> },
          ],
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={MainRouter} fallbackElement={<BBSLoading />} />
  );
};

export default MainRouterProvider;

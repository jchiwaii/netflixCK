import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import appStore from "./utils/AppStore";
import { appRouter } from "./utils/Router";

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;

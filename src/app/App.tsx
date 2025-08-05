import React from "react";
import AppProvider from "./provider";
import AppRouter from "./router";
import Suspense from "../shared/fallback/SuspenseContainer";

const App = () => {
  return (
    <AppProvider>
      <Suspense>
        <AppRouter />
      </Suspense>
    </AppProvider>
  );
};

export default React.memo(App);

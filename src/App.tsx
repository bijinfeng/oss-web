import React, { Suspense } from "react";
import dayjs from "dayjs";

import Router from "@/routers";

dayjs.locale("zh-cn");

const App: React.FC = () => {
  return (
    <Suspense>
      <Router />
    </Suspense>
  );
};

export default React.memo(App);

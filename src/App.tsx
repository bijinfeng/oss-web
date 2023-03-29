import React, { Suspense } from "react";
import dayjs from "dayjs";
import { RouterProvider } from "react-router-dom";

import router from "@/routers";
import { NsfwProvider } from "@/utils/nsfw";

dayjs.locale("zh-cn");

const App: React.FC = () => (
  <Suspense>
    <NsfwProvider>
      <RouterProvider router={router} />
    </NsfwProvider>
  </Suspense>
);

export default React.memo(App);

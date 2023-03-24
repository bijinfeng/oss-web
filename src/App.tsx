import React, { Suspense } from "react";
import dayjs from "dayjs";

import Router from "@/routers";
import { NsfwProvider } from "@/utils/nsfw";

dayjs.locale("zh-cn");

const App: React.FC = () => (
  <Suspense>
    <NsfwProvider>
      <Router />
    </NsfwProvider>
  </Suspense>
);

export default React.memo(App);

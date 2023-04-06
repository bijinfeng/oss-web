import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout: React.FC = () => {
  return (
    <div className="tw-grid tw-grid-rows-blank tw-h-screen">
      <Header />
      <Suspense fallback={<p>Loading package location...</p>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};
export default Layout;

import React from "react";
import Button from "@/components/Button";
import bannerLight from "@/assets/banner_light.jpg";
import bannerDark from "@/assets/banner_dark.jpg";
import useSettingStore from "@/store/setting";

const HomePage: React.FC = () => {
  const theme = useSettingStore((state) => state.theme);

  return (
    <div className="tw-text-center tw-pt-24">
      <div className="tw-mx-20 tw-px-8">
        <h1
          className="tw-text-5xl tw-leading-[3.25rem] aos-init aos-animate"
          data-aos="zoom-y-out"
        >
          Develop beautiful web apps with Tabler
        </h1>
        <p
          className="tw-text-xl tw-max-w-3xl tw-mx-auto tw-mt-6 aos-init tw-text-[#515671] aos-animate"
          data-aos="zoom-y-out"
          data-aos-delay="150"
        >
          Tabler is a free and open source web application UI kit based on
          Bootstrap 5, with hundreds responsive components and multiple layouts.
        </p>
        <div className="tw-mt-6">
          <Button size="large" shape="round" type="primary" href="/main">
            Go to dashboard →
          </Button>
        </div>
        <div
          className="tw-mx-20 tw-mt-16 tw-overflow-hidden"
          style={{
            borderRadius: ".375rem",
            border:
              "var(--tblr-border-width) var(--tblr-border-style) var(--tblr-border-color)",
          }}
        >
          <img src={theme === "dark" ? bannerDark : bannerLight} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

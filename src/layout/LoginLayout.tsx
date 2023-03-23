import React, { PropsWithChildren, ReactNode } from "react";
import loginSecure from "@/assets/undraw_secure_login_pdn4.svg";
import Logo from "@/components/Logo";

interface LoginLayoutProps {
  title: string;
  subTitle?: string;
  footer?: ReactNode;
  description?: ReactNode;
}

const LoginLayout: React.FC<PropsWithChildren<LoginLayoutProps>> = (props) => {
  const { children, title, subTitle, footer, description } = props;

  return (
    <div className="page page-center">
      <div className="container container-normal py-4">
        <div className="row align-items-center g-4">
          <div className="col-lg">
            <div className="container-tight">
              <div className="text-center mb-4">
                <Logo />
              </div>
              <div className="card card-md">
                <div className="card-body">
                  <h2 className="h2 text-center mb-4">{title}</h2>
                  {subTitle && <p className="text-muted mb-4">{subTitle}</p>}
                  {children}
                </div>
                {footer}
              </div>
              <div className="text-center text-muted mt-3">{description}</div>
            </div>
          </div>
          <div className="col-lg d-none d-lg-block">
            <img
              src={loginSecure}
              height="300"
              className="d-block mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;

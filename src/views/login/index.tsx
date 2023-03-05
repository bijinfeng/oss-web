import React from "react";
import {
  IconEye,
  IconBrandGithub,
  IconBrandTwitter,
} from "@tabler/icons-react";

import Input from "@/components/Input";
import loginSecure from "@/assets/undraw_secure_login_pdn4.svg";
import icon from "@/assets/icon.png";

const GITHUB_OAUTH_URL =
  "https://github.com/login/oauth/authorize?client_id=aa06b4211fb6edb3a869&redirect_uri=https://iqqgucwq2n.hk.aircode.run/user_oauth_callback&scope=user:email";

const Login: React.FC = () => {
  return (
    <div className="page page-center">
      <div className="container container-normal py-4">
        <div className="row align-items-center g-4">
          <div className="col-lg">
            <div className="container-tight">
              <div className="text-center mb-4">
                <a
                  href="."
                  className="tw-inline-flex tw-items-center tw-gap-2 navbar-brand navbar-brand-autodark"
                >
                  <img src={icon} height="36" alt="" />
                  <span className="tw-text-lg">OSS Web</span>
                </a>
              </div>
              <div className="card card-md">
                <div className="card-body">
                  <h2 className="h2 text-center mb-4">Login to your account</h2>
                  <form action="./" method="get" autoComplete="off" noValidate>
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <Input
                        type="email"
                        className="form-control"
                        placeholder="your@email.com"
                        autoComplete="off"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">
                        Password
                        <span className="form-label-description">
                          <a href="./forgot-password.html">I forgot password</a>
                        </span>
                      </label>
                      <div className="input-group input-group-flat">
                        <Input
                          type="password"
                          className="form-control"
                          placeholder="Your password"
                          autoComplete="off"
                        />
                        <span className="input-group-text">
                          <a
                            href="#"
                            className="link-secondary"
                            title="Show password"
                            data-bs-toggle="tooltip"
                          >
                            <IconEye className="icon" />
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="form-check">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          Remember me on this device
                        </span>
                      </label>
                    </div>
                    <div className="form-footer">
                      <button type="submit" className="btn btn-primary w-100">
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
                <div className="hr-text">or</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <a href={GITHUB_OAUTH_URL} className="btn w-100">
                        <IconBrandGithub className="icon text-github" />
                        Login with Github
                      </a>
                    </div>
                    <div className="col">
                      <a href="#" className="btn w-100">
                        <IconBrandTwitter className="icon text-twitter" />
                        Login with Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-muted mt-3">
                Don&apos;t have account yet?
                <a href="./sign-up.html" tabIndex={-1}>
                  Sign up
                </a>
              </div>
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

export default Login;

import React from "react";
import packageJson from "../../../package.json";

const Footer: React.FC = () => {
  return (
    <div className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-lg-auto ms-lg-auto">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                <a href="./docs/" className="link-secondary">
                  Documentation
                </a>
              </li>
              <li className="list-inline-item">
                <a href="./license.html" className="link-secondary">
                  License
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://github.com/bijinfeng/oss-web"
                  target="_blank"
                  className="link-secondary"
                  rel="noreferrer"
                >
                  Source code
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Copyright © 2023{" "}
                <a href="." className="link-secondary">
                  kebai
                </a>
                . All rights reserved.
              </li>
              <li className="list-inline-item">
                <a
                  href="./changelog.html"
                  className="link-secondary"
                  rel="noopener"
                >
                  v{packageJson.version}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

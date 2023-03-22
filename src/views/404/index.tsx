import React from "react";
import { IconArrowLeft } from "@tabler/icons-react";

import Button from "@/components/Button";

const NotFound: React.FC = () => {
  return (
    <div className="page page-center border-top-wide border-primary">
      <div className="container-tight py-4">
        <div className="empty">
          <div className="empty-header">404</div>
          <p className="empty-title">Oops… You just found an error page</p>
          <p className="empty-subtitle text-muted">
            We are sorry but the page you are looking for was not found
          </p>
          <div className="empty-action">
            <Button type="primary" href="/main" icon={<IconArrowLeft />}>
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

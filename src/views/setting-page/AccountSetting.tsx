import React from "react";
import Button from "@/components/Button";

const AccountSetting: React.FC = () => {
  return (
    <>
      <div className="card-body">
        <h2 className="mb-4">My Account</h2>
      </div>
      <div className="card-footer bg-transparent mt-auto">
        <div className="btn-list justify-content-end">
          <Button>Cancel</Button>
          <Button type="primary">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default AccountSetting;

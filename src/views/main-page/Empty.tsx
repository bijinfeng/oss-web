import React from "react";
import Button from "@/components/Button";
import EmptyIllu from "@/assets/undraw_quitting_time_dm8t.svg";

const Empty: React.FC = () => {
  return (
    <div className="container-tight py-4">
      <div className="empty">
        <div className="empty-img">
          <img src={EmptyIllu} height="128" alt="" />
        </div>
        <p className="empty-subtitle text-muted">你还没有托管任何照片！</p>
        <div className="empty-action">
          <Button type="primary">Go to upload →</Button>
        </div>
      </div>
    </div>
  );
};

export default Empty;

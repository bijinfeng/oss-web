import React from "react";
import cls from "classnames";

interface ImageCardProps {
  imgUrl: string;
  title: string;
  subTitle?: string;
  avatar?: string;
  allowCheck?: boolean;
  checked?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const { imgUrl, avatar, title, subTitle, allowCheck, checked } = props;

  const renderContent = () => (
    <div className={cls("card card-sm", { "!tw-border-none": allowCheck })}>
      <div className="d-block">
        <div
          className="card-img-top tw-aspect-video tw-bg-cover"
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center">
          {avatar && (
            <span
              className="avatar me-3 rounded"
              style={{ backgroundImage: `url(${avatar})` }}
            />
          )}
          <div className="tw-w-full">
            <div className="tw-truncate">{title}</div>
            {subTitle && <div className="text-muted">{subTitle}</div>}
          </div>
        </div>
      </div>
    </div>
  );

  if (!allowCheck) return renderContent();

  return (
    <label className="form-imagecheck tw-w-full">
      <input
        name="form-imagecheck"
        type="checkbox"
        value="4"
        className="form-imagecheck-input"
        checked={checked}
      />
      <div className="form-imagecheck-figure" style={{ borderRadius: 4 }}>
        {renderContent()}
      </div>
    </label>
  );
};

export default ImageCard;

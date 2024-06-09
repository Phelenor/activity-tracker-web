import React from "react";
import appIcon from "../assets/app_icon.svg";

interface EmptyStateProps {
  text: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="relative">
        <img
          src={appIcon}
          alt="No equipment found"
          className="w-48 h-48 object-contain"
          style={{ filter: "brightness(0)" }}
        />
      </div>
      <p className="text-xl text-black">{text}</p>
    </div>
  );
};

export default EmptyState;

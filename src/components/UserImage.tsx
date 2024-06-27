import React from "react";

interface UserProfileImageProps {
  userImageUrl: string;
  userName: string;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ userImageUrl, userName }) => {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "../assets/app-icon.svg";
  };

  return <img src={userImageUrl} alt={userName} className="w-16 h-16 rounded-full mr-4" onError={handleError} />;
};

export default UserProfileImage;

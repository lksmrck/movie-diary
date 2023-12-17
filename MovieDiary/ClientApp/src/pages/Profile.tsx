import { Card } from "@mui/material";
import React from "react";
import { Theme } from "../common/theme";
import "../index.css";
import avatar from "../assets/poster.jpg";
import useAuthContext from "../store/AuthContext";

const Profile = () => {
  const { currentUser } = useAuthContext();
  return (
    <div className="gradient-bg flex justify-center items-center h-screenWithoutNavbar">
      <Card
        sx={{
          width: 450,
          height: 420,
          position: "relative",
          border: `1px solid ${Theme.Color.grey_3}`,
          borderRadius: "10px",
          backgroundColor: Theme.Color.grey_2,
        }}
      >
        <div className="flex">
          <div className="h-32 w-32 overflow-hidden rounded-full">
            <img src={avatar} className="" />
          </div>
          <div>
            <h2>Username</h2>
            <p>{currentUser?.userName}</p>
            <h2>Name</h2>
            <p>{currentUser?.name}</p>
            <h2>Email</h2>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;

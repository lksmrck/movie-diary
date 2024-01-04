import { Avatar, Card, Chip, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Theme } from "../common/theme";
import "../index.css";
import useAuthContext from "../store/AuthContext";
import { useUserCategories } from "../hooks/hooks";
import { Category } from "../models/Movie";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import agent from "../api/agent";
import Accordion from "../components/Accordion";
import { Statistics } from "../models/Statistics";

const Profile = () => {
  const { currentUser, logoutUser } = useAuthContext();
  const { fetchedUserCategories } = useUserCategories();
  const [userStats, setUserStats] = useState({} as Statistics);

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await agent.Statistics.get(currentUser?.id!);
      setUserStats(res.result);
    };
    fetchStatistics();
  }, []);

  return (
    <div className="gradient-bg flex justify-center items-center h-screenWithoutNavbar">
      {/* LEFT */}
      <Card
        sx={{
          width: 175,
          height: 560,
          position: "relative",
          border: `1px solid ${Theme.Color.grey_3}`,
          borderRadius: "10px",
          backgroundColor: Theme.Color.grey_3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="h-32 w-32 mt-5 overflow-hidden rounded-full ">
          <Avatar
            alt={currentUser?.name}
            src="/static/images/avatar/2.jpg"
            sx={{ width: "100%", height: "100%", fontSize: "3rem" }}
          />
        </div>
        <Button
          color="red"
          text="Logout"
          variant="contained"
          sx={{ marginBottom: "2rem" }}
          handleClick={logoutUser}
        />
      </Card>
      {/* RIGHT */}
      <div>
        <Card
          sx={{
            width: 300,
            height: 200,
            position: "relative",
            border: `1px solid ${Theme.Color.grey_3}`,
            borderRadius: "10px",
            backgroundColor: Theme.Color.grey_2,
            marginLeft: "1.5rem",
          }}
        >
          <div className="flex h-full  ">
            {/* RIGHT */}
            <div className="flex w-72 [&>p]:ml-5 mt-5 ml-5">
              <ul className="ml-3 [&>li]:pr-5 [&>li]:leading-10 [&>li]:font-bold">
                <li>Username</li>
                <Divider />
                <li>Name</li>
                <Divider />
                <li>Email</li>
                <Divider />
              </ul>
              <ul className="[&>li]:leading-10 text-slate-400">
                <li>{currentUser?.userName}</li>
                <Divider />
                <li>{currentUser?.name}</li>
                <Divider />
                <li>{currentUser?.email ?? "Not provided"}</li>
                <Divider />
              </ul>
            </div>
          </div>
        </Card>
        <Card
          sx={{
            width: 300,
            height: 350,
            position: "relative",
            border: `1px solid ${Theme.Color.grey_3}`,
            borderRadius: "10px",
            backgroundColor: Theme.Color.grey_2,
            marginLeft: "1.5rem",
            marginTop: 1,
            padding: "1rem",
            overflowY: "scroll",
          }}
          className="no-scrollbar"
        >
          <Typography variant="h6" component="h6" sx={{ marginLeft: ".75rem" }}>
            Your categories
          </Typography>
          {fetchedUserCategories.map((c: Category) => (
            <Chip
              label={c.name}
              className="ml-2"
              sx={{
                backgroundColor: "#9f9f9f",
                fontSize: ".6rem",
                marginTop: ".4rem",
              }}
            />
          ))}
          {/* <Accordion
            sx={{ marginTop: "1rem" }}
            id="statistics"
            heading="Movies statistics"
          > */}
          <Typography
            variant="h6"
            component="h6"
            sx={{
              marginLeft: ".75rem",
              marginTop: ".5rem",
              fontSize: "1rem",
            }}
          >
            Total watched movies: {userStats?.moviesWatched}
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              marginLeft: ".75rem",
              marginTop: ".5rem",
              fontSize: "1rem",
            }}
          >
            Average rating: {userStats?.averageRating}
          </Typography>
          <div>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                marginLeft: ".75rem",
                marginTop: ".5rem",
                fontSize: "1rem",
              }}
            >
              Watched movies per category
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                marginLeft: ".75rem",
                marginTop: ".5rem",
                fontSize: ".8rem",
              }}
            >
              Comedy: {userStats?.totalComedy}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                marginLeft: ".75rem",
                marginTop: ".5rem",
                fontSize: ".8rem",
              }}
            >
              Horror: {userStats?.totalHorror}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                marginLeft: ".75rem",
                marginTop: ".5rem",
                fontSize: ".8rem",
              }}
            >
              Adventure: {userStats?.totalAdventure}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                marginLeft: ".75rem",
                marginTop: ".5rem",
                fontSize: ".8rem",
              }}
            >
              Romantic: {userStats?.totalRomantic}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                marginLeft: ".75rem",
                marginTop: ".5rem",
                fontSize: ".8rem",
              }}
            >
              Drama: {userStats?.totalDrama}
            </Typography>
          </div>
          {/* </Accordion> */}
        </Card>
      </div>
    </div>
  );
};

export default Profile;

import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { Theme } from "../common/theme";
import { LoginFormValues } from "../models/User";
import Button from "../components/Button";
import agent from "../api/agent";
import useAuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const [formData, setFormData] = useState({} as LoginFormValues);
  const { currentUser, loginUser } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await loginUser(formData);
    // const res = await agent.Users.login(formData);
    // if (res.isSuccess) setCurrentUser(res.result);
    // navigate("/home");
  };

  const handleBack = () => {
    console.log("back");
  };

  return (
    <div className="w-full h-screen flex justify-center gradient-bg">
      <div>
        <Card
          sx={{
            padding: "5rem",
            marginTop: "2rem",
            maxWidth: `${Theme.CardWidth.M}rem`,
            display: "flex",
            flexDirection: "column",
            backgroundColor: Theme.Color.grey_2,
          }}
        >
          <Typography variant="h4">Sign In</Typography>
          <CardContent className="flex flex-col ">
            <Input
              name="username"
              label="Username"
              color={Theme.Color.teal_2}
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              color={Theme.Color.teal_2}
              value={formData.password}
              onChange={handleChange}
              sx={{ marginTop: ".5rem" }}
              variant="outlined"
              size="small"
            />
          </CardContent>
          <CardActions>
            <Button
              handleClick={handleSubmit}
              variant="contained"
              text="Login"
              color="primary"
            />
            <Button
              handleClick={handleBack}
              variant="outlined"
              text="Back"
              color="secondary"
            />
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Login;

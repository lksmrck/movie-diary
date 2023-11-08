import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { Theme } from "../common/theme";
import { RegisterFormValues } from "../models/User";
import Button from "../components/Button";
import agent from "../api/agent";

const Register = () => {
  const [formData, setFormData] = useState({} as RegisterFormValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    const res = await agent.Users.register(formData);
    console.log(res);
  };

  const handleBack = () => {
    console.log("back");
  };

  return (
    <div className="w-full h-full flex justify-center">
      <Card
        sx={{
          padding: "5rem",
          marginTop: "2rem",
          maxWidth: `${Theme.CardWidth.M}rem`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Sign Up</Typography>
        <CardContent className="flex flex-col  ">
          <Input
            name="username"
            label="Username"
            color={Theme.Color.primary}
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            name="name"
            label="Name"
            color={Theme.Color.primary}
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            color={Theme.Color.primary}
            value={formData.password}
            onChange={handleChange}
          />
        </CardContent>
        <CardActions>
          <Button
            handleClick={handleSubmit}
            variant="contained"
            text="Register"
          />
          <Button handleClick={handleBack} variant="outlined" text="Back" />
        </CardActions>
      </Card>
    </div>
  );
};

export default Register;

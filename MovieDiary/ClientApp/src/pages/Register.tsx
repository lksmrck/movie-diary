import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { Theme } from "../common/theme";
import { RegisterFormValues } from "../models/User";
import Button from "../components/Button";
import agent from "../api/agent";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({} as RegisterFormValues);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const res = await agent.Users.register(formData);
    if (res.isSuccess) setRegistrationSuccess(true);
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
        <CardContent className="flex flex-col [&>*]:mt-5">
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
            name="name"
            label="Name"
            color={Theme.Color.teal_2}
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
          <Input
            name="email"
            label="E-mail"
            color={Theme.Color.teal_2}
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginTop: ".5rem" }}
            size="small"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            color={Theme.Color.teal_2}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginTop: ".5rem" }}
            size="small"
          />
        </CardContent>
        <CardActions>
          <Button
            handleClick={handleSubmit}
            variant="contained"
            text="Register"
            color="primary"
          />
          <Button
            handleClick={handleBack}
            variant="outlined"
            text="Back"
            color="secondary"
          />
        </CardActions>
        {registrationSuccess && (
          <Box>
            Registration was successful. You can now{" "}
            <Link to="/login">Login</Link>
          </Box>
        )}
      </Card>
    </div>
  );
};

export default Register;

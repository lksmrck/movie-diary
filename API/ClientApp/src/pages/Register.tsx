import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { Theme } from "../common/theme";
import { RegisterFormValues } from "../models/User";
import Button from "../components/Button";
import agent from "../api/agent";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({} as RegisterFormValues);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateInputs = (): boolean => {
    if (
      formData.username?.length > 0 &&
      formData.password?.length > 0 &&
      formData.email?.length > 0 &&
      formData.name?.length > 0
    ) {
      if (!isValidEmail(formData.email)) {
        toast.info("Email has invalid format");
        return false;
      }
      return true;
    }
    toast.info("Please fill in all fields");
    return false;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const res = await agent.Users.register(formData);
    if (res?.isSuccess) navigate("/login");
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="w-full h-screen flex justify-center items-center gradient-bg">
      <Card
        sx={{
          padding: "4rem",
          marginTop: "2rem",
          maxWidth: `${Theme.CardWidth.M}rem`,
          display: "flex",
          flexDirection: "column",
          height: 450,
          backgroundColor: Theme.Color.grey_2,
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
            sx={{ marginTop: ".5rem" }}
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
        <p className="text-sm -mt-3 ml-4">
          Already have an account?{" "}
          <Link to={"/login"} className={" text-teal-700"}>
            Login
          </Link>
        </p>
        <CardActions sx={{ marginLeft: ".5rem", marginTop: "1rem" }}>
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
      </Card>
    </div>
  );
};

export default Register;

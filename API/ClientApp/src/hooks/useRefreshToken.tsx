import useAuthContext from "../store/AuthContext";
import agent from "../api/agent";
import { UserInLS } from "../models/UserInLS";

const useRefreshToken = () => {
  const { setCurrentUser } = useAuthContext();

  const refresh = async () => {
    const res = await agent.Users.refreshToken();

    setCurrentUser((prev) => {
      return { ...prev, token: res.data.result.token } as UserInLS;
    });
    return res.data.result.token;
  };
  return refresh;
};

export default useRefreshToken;

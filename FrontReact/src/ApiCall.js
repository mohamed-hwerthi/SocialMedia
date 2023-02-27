/* in this file we will implement Actions to the context api  */
import axios from "axios";

export const loginCall = async (userInformations, dispatch) => {
  dispatch({ type: "LoginStart" });
  try {
    const res = await axios.post(
      "http://localhost:6060/auth/login",
      userInformations
    );
    dispatch({ type: "LoginSuccess", payload: res.data });
  } catch (error) {
    dispatch({ type: "LoginFailure", payload: error });
  }
};

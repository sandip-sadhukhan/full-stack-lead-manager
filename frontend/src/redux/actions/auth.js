import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../constant";
import { toast } from "react-toastify";

const BASE_API_URL = process.env.REACT_APP_API_URL;

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await toast.promise(
      axios.post(`${BASE_API_URL}/api/token/`, body, config),
      {
        pending: "Signing In...",
        success: "Login Successfully 👌",
        error: "Login Fail 🤯",
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signup =
  (name, email, password, password2) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password, password2 });
    try {
      const res = await toast.promise(
        axios.post(`${BASE_API_URL}/api/accounts/signup/`, body, config),
        {
          pending: "Signing Up...",
          success: "SignUp Successfully 👌",
          error: "SignUp Fail 🤯",
        }
      );
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
      dispatch(login(email, password));
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  toast.success(`Logout Successfully`);
};

export const authenticate = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await toast.promise(
      axios.get(`${BASE_API_URL}/api/accounts/get-user-info/`, config),
      {
        pending: "Logging in...",
        success: "Logged In successfully",
        error: "Login Fail 🤯",
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { access: token },
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// store/actions.ts
import { AppDispatch, RootState } from "./store";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import {
  setUser,
  setToken,
  setLoading,
  setError,
  logout as logoutAction,
  setUsers,
} from "./reducers";
import * as User from "@/apis/userApi";

import { ThunkAction } from "@reduxjs/toolkit";

export const login =
  (
    email: string,
    password: string,
  ): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("userCredential", userCredential);
      // dispatch(setUser(userCredential.user));
      dispatch(setToken(token));

      Cookies.set("token", token, { expires: 7 });
    } catch (e) {
      console.log("Error", e);
      dispatch(setError("Failed to login."));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logout =
  (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logoutAction());

      Cookies.remove("token");
      dispatch(setUser(null));
      dispatch(fetchUsers());
      delete axios.defaults.headers.common["Authorization"];
    } catch (error: any) {
      console.log("Error", error);
      dispatch(setError(error?.message || "Failed to logout."));
    }
  };

export const fetchUsers =
  (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await User.getUsers();
      console.log("response", response);
      dispatch(setUsers(response.metadata));
    } catch (error: any) {
      console.error("Error fetching users", error);
      dispatch(setError(error?.message || "Error fetching users"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createUser =
  (name: string): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await User.createUser(name);

      if (!response?.metadata) throw new Error("Failed to create user.");
      dispatch(fetchUsers());
    } catch (error: any) {
      console.error("Error creating user", error);
      dispatch(setError(error?.message || "Failed to create user."));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateUser =
  (id: string, name: string): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await User.updateUser(name, id);
      if (!response.metadata) throw new Error("Failed to update user.");
      // const response = await axios.put(`/users/${id}`, { name });
      dispatch(fetchUsers());
    } catch (error: any) {
      console.error("Error updating user", error);
      dispatch(setError(error?.message || "Failed to update user."));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchMe =
  (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await User.getMe();
      console.log("responseresponse", response);
      dispatch(setUser(response?.metadata));
    } catch (error: any) {
      dispatch(setError(error?.message || "Failed to fetch user."));
    } finally {
      dispatch(setLoading(false));
    }
  };

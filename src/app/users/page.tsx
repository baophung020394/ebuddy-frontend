"use client";

import { fetchMe } from "@/store/actions";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { Typography } from "@mui/material";

export default function Page() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch<any>(fetchMe());
  }, [dispatch]);

  return <UserList />;
}

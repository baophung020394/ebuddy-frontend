// userApi.ts
import axios from "@/lib/axios";

export const updateUser = async (name: string, userId: string) => {
  const response = await axios.put(`/user/update`, { userId, name });
  return response.data;
};

export const createUser = async (name: string) => {
  const response = await axios.post("/user", { name });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get("/users");
  return response.data;
};

export const getMe = async () => {
  const response = await axios.get("/user/me");
  return response.data;
};

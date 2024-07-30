import axios from "@/lib/axios";

export const signUp = (email: string, name: string) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return axios.post("/user/signup", { email, firstName: name, timezone });
};

export const login = (email: string) => {
  return axios.post("/user/login", { email });
};

export const logout = () => {
  return axios.post("/user/logout");
};

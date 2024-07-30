"use client";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import Nav from "../components/Navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Nav />
      {children}
    </Provider>
  );
}

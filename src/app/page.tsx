"use client";

import { ROUTERS } from "@/contanst";
import { redirect } from "next/navigation";

export default function Page() {
  return redirect(ROUTERS.SIGN_UP);
}

// "use client";

import { isAdmin } from "@/lib/admin";
// import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import App from "./app";

// const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = async () => {
  const adminStatus = await isAdmin();

  if (!adminStatus) {
    redirect("/");
  }
  
  return <App />;
};

export default AdminPage;

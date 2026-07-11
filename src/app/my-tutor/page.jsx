import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyTutorClient from "./MyTutorClient";

export const metadata = {
  title: "TutorHive | My Tutors",
  description: "Manage your tutor profiles and bookings.",
};

const MyTutor = async () => {
  // Private route protection
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }

  return <MyTutorClient user={user} />;
};

export default MyTutor;
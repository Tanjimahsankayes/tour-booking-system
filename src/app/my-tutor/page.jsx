import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyTutorClient from "./MyTutorClient";

export const metadata = {
  title: "TutorHive | My Tutors",
  description: "Manage your tutor profiles and bookings.",
};

const MyTutor = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return <MyTutorClient initialTutors={[]} user={user} />;
    }

    const mytutors = await res.json();
    return <MyTutorClient initialTutors={mytutors} token={token} user={user} />;
  } catch (error) {
    return <MyTutorClient initialTutors={[]} user={user} />;
  }
};

export default MyTutor;
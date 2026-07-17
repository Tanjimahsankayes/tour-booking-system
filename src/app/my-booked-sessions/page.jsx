import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyBookedSessionsClient from "./MyBookedSessionsClient";


export const metadata = {
  title: "TutorHive | My Booked Sessions",
  description: "View and manage your tutor session bookings.",
};

const MyBookedSessions = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const {token} = await auth.api.getToken({
        headers: await headers(),
      });


  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const bookings = await res.json()
  console.log(bookings)
  return (
    <div>
      <MyBookedSessionsClient bookings={bookings || []} />
    </div>
  );
  
  
  
};

export default MyBookedSessions;
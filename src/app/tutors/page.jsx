import TutorPage from "@/Component/Tutor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TutorsClient from "./TutorsClient";

export const metadata = {
  title: "TutorHive | Tutors",
  description: "Browse our expert tutors and find the perfect match for your learning needs.",
};

const TutorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }

  const {token} = await auth.api.getToken({
      headers: await headers(),
    });

    console.log("TOKEN:", token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("STATUS:", res.status);

  const text = await res.text();
  console.log("BODY:", text);

  if (!res.ok) {
    throw new Error(text);
  }

  const tutors = JSON.parse(text);
  // const tutors = await res.json();

  return <TutorsClient tutors={tutors} />;
};

export default TutorsPage;
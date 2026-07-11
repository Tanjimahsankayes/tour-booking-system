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
    return (
      <div>Please Sign in to access Tutors page.</div>
    );
  }

  const res = await fetch("http://localhost:5000/tutor");
  const tutors = await res.json();

  return <TutorsClient tutors={tutors} />;
};

export default TutorsPage;
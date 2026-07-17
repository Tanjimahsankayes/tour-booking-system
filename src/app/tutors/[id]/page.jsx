import TutorDetails from "@/Component/TutorDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "TutorHive | Tutor Details",
  description: "View detailed information about our expert tutors and book your sessions.",
};

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers(),
  });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tutor Not Found</h1>
          <p className="text-gray-600">The tutor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const tutor = await res.json();
  return <TutorDetails tutor={tutor} user={user} />;
};

export default TutorDetailsPage;
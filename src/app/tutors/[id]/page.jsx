import TutorDetails from "@/Component/TutorDetails";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/tutor/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tutor Not Found</h1>
          <p className="text-gray-600">The tutor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const tutor = await res.json();

  return <TutorDetails tutor={tutor} />;
};

export default TutorDetailsPage;
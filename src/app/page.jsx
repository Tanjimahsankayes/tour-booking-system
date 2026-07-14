import About from "@/Component/About";
import Contact from "@/Component/Contact";
import Featured from "@/Component/Featured";
import Home from "@/Component/Home";
import ServicesPage from "@/Component/Services";
import TutorPage from "@/Component/Tutor";

export const metadata = {
  title: "TutorHive | Home",
  description: "Find expert tutors for every subject. Connect with qualified tutors who specialize in your area of study.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Home />
      <About></About>
      <Featured></Featured>
      <ServicesPage></ServicesPage>
      <Contact></Contact>
    </div>
  );
}
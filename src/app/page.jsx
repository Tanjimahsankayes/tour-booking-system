import About from "@/Component/About";
import Contact from "@/Component/Contact";
import Home from "@/Component/Home";
import ServicesPage from "@/Component/Services";
import TutorPage from "@/Component/Tutor";


export default function Page() {
  return (
    <div>
      <Home />
      <About></About>
      <ServicesPage></ServicesPage>
      {/* <TutorPage></TutorPage> */}
      <Contact></Contact>
    </div>
  );
}
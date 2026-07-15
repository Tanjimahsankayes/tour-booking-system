import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AddTutorPage from "./AddTutorPage";


const AddTutors = async() => {

  const tokenData = await auth.api.getToken({
    headers: await headers()
  });

const token = tokenData.token;
  return <div>
    <AddTutorPage token={token} ></AddTutorPage>
  </div>;
};

export default AddTutors;

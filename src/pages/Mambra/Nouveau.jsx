import { useUpdateMambra } from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import MambraForm from "./Form/MambraForm";
import { toast } from 'react-toastify';

const Nouveau = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    console.log("data", data);
    try {
      const newMambra = await useUpdateMambra(data);
      console.log('New Mambra created:', newMambra);
      toast.success('User created successfully!');
      navigate("/mambra/liste");
    } catch (error) {
      // toast.error('Error creating user');
      console.log(error);
    }
  }

  return (
    <>
      <h1>nouveau mambra </h1>
      <MambraForm handleSubmitData={handleSubmit} />
    </>
  )
}

export default Nouveau;
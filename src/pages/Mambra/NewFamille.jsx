import { useUpdateResource } from "../../hooks/useUpdateResource";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FamilleForm from "./Form/FamilleForm";

const NewFamille = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    let url  = "http://localhost:8000/apip/familles";
    try {
      const newFamille = await useUpdateResource(data,url);
      console.log('New famille created:', newFamille);
      toast.success('famille created successfully!');
      navigate("/mambra/liste-famille");
    } catch (error) {
      // toast.error('Error creating user');
      console.log(error);
    }
  }

  return (
    <>
      <h1>Nouvelle Famille </h1>
      <FamilleForm handleSubmitData={handleSubmit} />
    </>
  )
}

export default NewFamille;
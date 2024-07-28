import FormMambra from "./Form/MambraForm";
import { usePostDataMambra } from "../../hooks/useFetchData";
const Nouveau = () => {

  const handleSubmitData = async (data) => {
    try {
      const newMambra = await usePostDataMambra(data);
      console.log('New Mambra created:', newMambra);
      // Handle successful creation (e.g., show a success message, redirect, etc.)
    } catch (error) {
      // Handle errors (e.g., show an error message)
    }
  }

  return (
    <>
      <h1>nouveau mambra </h1>

      <FormMambra handleSubmitData={handleSubmitData} />
    </>
  )
}


export default Nouveau;
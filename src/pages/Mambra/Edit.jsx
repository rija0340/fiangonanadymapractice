import { useParams } from "react-router-dom";
import { usePutDataMambra } from "../../hooks/useFetchData";
import FormMambra from "./Form/MambraForm";
const Edit = () => {

    //get params here
    const { id } = useParams();

    const handleSubmitData = async (data) => {
        try {
            const editedMambra = await usePutDataMambra(data, id);
            console.log('Edited Mambra :', editedMambra);
            // Handle successful creation (e.g., show a success message, redirect, etc.)
        } catch (error) {
            // Handle errors (e.g., show an error message)
        }
    }

    return (
        <div>
            <h1>Edit</h1>
            <FormMambra id={id} handleSubmitData={handleSubmitData} />
        </div>
    )
}

export default Edit;
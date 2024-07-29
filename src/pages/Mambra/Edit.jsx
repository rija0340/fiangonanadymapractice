import { useParams } from "react-router-dom";
import { useUpdateMambra } from "../../hooks/useFetchData";
import FormMambra from "./Form/MambraForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Edit = () => {
const navigate = useNavigate();
    //get params here
    const { id } = useParams();

    const handleSubmitData = async (data) => {
        try {
            const editedMambra = await useUpdateMambra(data, id);
            console.log('Edited Mambra :', editedMambra);
            toast.success('User modified successfully!');
            navigate("/mambra/liste");
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
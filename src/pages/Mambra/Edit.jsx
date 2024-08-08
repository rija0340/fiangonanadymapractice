import { useParams } from "react-router-dom";
import { useUpdateResource } from "../../hooks/useUpdateResource";
import FormMambra from "./Form/MambraForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    //get params here
    const { id } = useParams();

    const handleSubmitData = async (data) => {
        let url  = "http://localhost:8000/apip/mambras";
        try {
            const editedMambra = await useUpdateResource(data,url, id);
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
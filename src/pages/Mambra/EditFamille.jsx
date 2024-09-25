import { useParams } from "react-router-dom";
import { useUpdateResource } from "../../hooks/useUpdateResource";
import FormMambra from "./Form/MambraForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FamilleForm from "./Form/FamilleForm";

const EditFamille = () => {
    const navigate = useNavigate();
    //get params here
    const { id } = useParams();

    const handleSubmitData = async (data) => {
        let url  = "http://localhost:8000/apip/familles";
        try {

            const { mambras, ...dataWithoutMambras } = data;
            const editedFamille = await useUpdateResource(dataWithoutMambras,url, id);
            toast.success('Family modified successfully!');
            navigate("/mambra/liste-mambra");
            // Handle successful creation (e.g., show a success message, redirect, etc.)
        } catch (error) {
            // Handle errors (e.g., show an error message)
        }
    }

    return (
        <div>
            <h1>Edit</h1>
            <FamilleForm id={id} handleSubmitData={handleSubmitData} />
        </div>
    )
}

export default EditFamille;
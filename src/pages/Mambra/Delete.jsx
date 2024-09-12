import { useParams } from "react-router-dom";
import { useDeleteResource } from "../../hooks/useDeleteResource";
const Delete = () => {

    const { id } = useParams();
    const deleteRessource = async (id) => {
        try {
            const editedMambra = await useDeleteResource(id);
            console.log('Edited Mambra :', editedMambra);
            toast.success('User modified successfully!');
            navigate("/mambra/liste-mambra");
            // Handle successful creation (e.g., show a success message, redirect, etc.)
        } catch (error) {
            // Handle errors (e.g., show an error message)
        }
    }
    deleteRessource(id);
}

export default Delete;
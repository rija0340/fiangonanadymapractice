import { useParams } from "react-router-dom";
import { useDeleteResource } from "../../hooks/useDeleteResource";
const Delete = () => {

    const { id } = useParams();
    const handleSubmitData = async (data) => {
        try {
            const editedMambra = await useDeleteMambra(data, id);
            console.log('Edited Mambra :', editedMambra);
            toast.success('User modified successfully!');
            navigate("/mambra/liste");
            // Handle successful creation (e.g., show a success message, redirect, etc.)
        } catch (error) {
            // Handle errors (e.g., show an error message)
        }
    }
}

export default Delete;
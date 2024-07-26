import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import FormMambra from "./Form/MambraForm";
 const Edit = ()=>{

    //get params here
    const {id} = useParams();

    //fetch data here
    const mambra = useFetchData(`http://localhost:8000/apip/mambras/${id}`);

    console.log(mambra);


   const handleSubmitData = (data) => {
       console.log(data);
   }

    return(
        <div>
            <h1>Edit</h1>
            <FormMambra handleSubmitData={handleSubmitData} />
        </div>
    )
}

export default Edit;
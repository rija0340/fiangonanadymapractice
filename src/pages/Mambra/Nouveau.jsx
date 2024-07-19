import FormMambra from "./Form/MambraForm";
const Nouveau = ()=>{


    const postDataMambra = async (mambraData) => {
        try {
            const response = await fetch('http://localhost:8000/apip/mambras', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need, like authorization
              },
              body: JSON.stringify(mambraData)
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
          }
    }

    const handleSubmitData =  async (data) => {
        try {
            const newMambra = await postDataMambra(data);
            console.log('New Mambra created:', newMambra);
            // Handle successful creation (e.g., show a success message, redirect, etc.)
          } catch (error) {
            // Handle errors (e.g., show an error message)
          }
    }

    return(
        <>
            <h1>nouveau mambra </h1>

            <FormMambra handleSubmitData={handleSubmitData} />
        </>
    )
} 


export default Nouveau;
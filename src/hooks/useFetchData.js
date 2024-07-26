import { useEffect,useState } from "react";


export function useFetchData(url) {
    const [data, setData] = useState([]);
    useEffect(()=>{
        let cancel = false;
        async function fetchData(){
            try {
                const response  = await fetch(url);
                if(response.ok && !cancel){
                    const data = await response.json();

                    console.log('data');
                    console.log(data['nom']);
                    // Array.isArray(data['hydra:member']) ? setData((x)=> [...x,...data['hydra:member']]) : setData((x)=> [...x,data['hydra:member']])
                    if (Array.isArray(data['hydra:member'])) {
                        // C'est une collection
                        setData(data['hydra:member']);
                      } else if (data && typeof data === 'object' && !('hydra:member' in data)) {
                        // C'est un objet unique, on le convertit en tableau
                        setData(data);
                      } else {
                        // Ni une collection, ni un objet unique
                        setData([]);
                      }
                }          
    
            }catch (error) {
                console.log('tonga ato tsika');
                console.log(error);
            }
        };

        fetchData();
        return () => (cancel = true);
    },[url])

    return data;

}
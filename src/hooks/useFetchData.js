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
                    // Array.isArray(data['hydra:member']) ? setData((x)=> [...x,...data['hydra:member']]) : setData((x)=> [...x,data['hydra:member']])
                    Array.isArray(data['hydra:member']) ? setData(data['hydra:member']) : setData([]);
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
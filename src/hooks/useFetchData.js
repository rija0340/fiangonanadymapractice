import { useEffect, useState } from "react";


export function useFetchData(url, searchParams = null) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        let cancel = false;
        async function fetchData() {
            setLoading(true);
            try {
                let fullUrl = url;
                    fullUrl = fullUrl+'?';
                if (searchParams) {
                    const queryParams = new URLSearchParams();

                    for (const [key, value] of Object.entries(searchParams)) {
                        if (value === '') continue;

                        if (key === 'trancheAge' && Array.isArray(value)) {
                            value.forEach(age => queryParams.append('trancheAge[]', age));
                        } else if (key === 'orderByName') {
                            queryParams.append('order[prenom]', value);
                        } else {
                            queryParams.append(key, value);
                        }
                    }

                    fullUrl += queryParams.toString();
                   
                }

                const response = await fetch(fullUrl);
                if (response.ok && !cancel) {
                    const data = await response.json();
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

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => (cancel = true);
    }, [searchParams])

    return { data, loading, error };

}

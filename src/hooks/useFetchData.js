import { useEffect, useState } from "react";


export function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        let cancel = false;
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(url);
                console.log(response);
                if (response.ok && !cancel) {
                    const data = await response.json();
                    console.log('data ndray ity');
                    console.log(data);
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
    }, [url])

    return { data, loading, error };

}


export const usePostDataMambra = async (mambraData) => {

    console.log("mambraData");
    console.log(mambraData);

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
            const errorBody = await response.text();
            console.error('Response status:', response.status);
            console.error('Response body:', errorBody);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const usePutDataMambra = async (mambraData, id) => {

    console.log("mambraData");
    console.log(mambraData);

    try {
        const response = await fetch(`http://localhost:8000/apip/mambras/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need, like authorization
            },
            body: JSON.stringify(mambraData)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Response status:', response.status);
            console.error('Response body:', errorBody);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
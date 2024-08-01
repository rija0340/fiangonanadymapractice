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
                let fullUrl = "";
                if (searchParams != null) {
                    const queryString = new URLSearchParams(searchParams).toString();
                    fullUrl = `${url}?${queryString}`;
                } else {
                    fullUrl = url;
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

export const useUpdateMambra = async (mambraData, id = null) => {

    const url = id
        ? `http://localhost:8000/apip/mambras/${id}`
        : 'http://localhost:8000/apip/mambras';

    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
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


export const useDeleteMambra = async (id) => {

    const url = `http://localhost:8000/apip/mambras/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
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
        console.log("data");
        console.log(data);
        // return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

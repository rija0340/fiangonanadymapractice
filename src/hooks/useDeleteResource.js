import { useEffect, useState } from "react";


export const useDeleteResource = async (id) => {

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

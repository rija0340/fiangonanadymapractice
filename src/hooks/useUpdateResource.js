import { useEffect, useState } from "react";

export const useUpdateResource = async (mambraData, baseUrl ,id = null) => {

    console.log("mambraData : " + JSON.stringify(mambraData));
    console.log("url : " + baseUrl);
    console.log("id : " + id);

    const method = id ? 'PUT' : 'POST';
    const url = id ? baseUrl+'/'+id : baseUrl;

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

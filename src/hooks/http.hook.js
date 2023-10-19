import { useState , useCallback } from "react";

export const useHttp = () => {

    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);

    const request = useCallback(async (url , method = 'GET' , body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true);

        try {
            const responce = await fetch(url);

            if(!responce.ok){
                throw new Error(`Could not fetch ${url} , status: ${responce.error}`);
            }

            const data = responce.json();
            setLoading(false);
            return data;

        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }


    },[])

    const clearError = useCallback( () => setError(null), [])

    return { loading , error , request , clearError}

}
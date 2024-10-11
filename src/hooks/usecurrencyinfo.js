import {useEffect, useState} from 'react';
function usecurrencyinfo(currency){
    const URL = import.meta.env.VITE_API_URL;
    const [data, setData] = useState({});
    useEffect(()=>{
        async function getdata(){
            const response = await fetch(`${URL}${currency}.json`)
            const result = await response.json();
            setData(result[currency]);
        }
        getdata();
    }, [currency]);
    return data;
}

export default usecurrencyinfo;
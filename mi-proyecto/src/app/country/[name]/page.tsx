'use client'
import { getCountryNameBySearch } from "@/lib/api/country";
import { Country } from "@/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './page.css'



const BuscadorName = () => {
    const { name } = useParams(); 

    const [pais, setPais] = useState<Country|null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    
    useEffect(() => {
        if (!name) return;

        setLoading(true);
        setError('');

        const paramName = Array.isArray(name) ? name[0] : name;

        getCountryNameBySearch(paramName)
            .then((p) => 
                {
                    console.log(p)   
                    setPais(p[0])
                }
        )
            .catch((e: AxiosError) => setError(e.message))
            .finally(() => setLoading(false));

    }, [name]);

    return (
        <div className="cardCountry">
            {!pais && loading && <h1>Loading...</h1>}
            {pais &&
            <div>
                <h1>{name}</h1>
                <img src={pais.flags.png} alt={pais.flags.alt} />      
                <div>Capital:{pais.capital?.[0]} </div>
                <div>Region:{pais.region}</div>
                <div>Language: {Object.values(pais.languages)[0]}</div>
                <div>Currency: {pais.cca2}</div>
            </div>
            }
            {error && <h1>{error}</h1>}
            
        </div>
    )
}

export default BuscadorName
import './index.scss'
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { WheyListing, CreatineListing } from '../index'

const { REACT_APP_DATABASE_KEY, REACT_APP_DATABASE_URL } = process.env

export function ListingSupplement() {

    const [selectedList, setSelectedList] = useState('whey')
    const [whey, setWhey] = useState([])
    const [creatine, setCreatine] = useState([])

    const supabaseUrl = REACT_APP_DATABASE_URL;
    const supabaseKey = REACT_APP_DATABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    

    useEffect(() => {
        async function getWhey() {
            const { data, error } = await supabase
                .from("whey")
                .select("*");
                console.log(data)

            if (error) {
                console.error("Erro:", error);
            } else {
                setWhey(data);
            }
        }

        async function getCreatine() {
            const { data, error } = await supabase
                .from("creatina")
                .select("*");

            if (error) {
                console.error("Erro:", error);
            } else {
                setCreatine(data);
            }
        }

        getWhey();
        getCreatine();
    }, [supabase]);

    return (
        <section className='listing-component'>
            <div className='options'>
                <button name='whey' onClick={()=> setSelectedList('whey')}>
                    <span className="text">Whey</span>
                </button>
                <button name='creatina' onClick={()=> setSelectedList('creatina')}>
                    <span className="text">Creatina</span>
                </button>
            </div>
            { selectedList === 'whey' ?
                <WheyListing content={whey}/> : 
                <CreatineListing content={creatine}/>
            }
        </section>
    )
}

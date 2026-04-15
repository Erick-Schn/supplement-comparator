import './index.scss'
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { WheyListing, CreatineListing } from '../index'

const { REACT_APP_DATABASE_KEY, REACT_APP_DATABASE_URL } = process.env
const supabase = createClient(REACT_APP_DATABASE_URL, REACT_APP_DATABASE_KEY);

export function ListingSupplement() {

    const [selectedList, setSelectedList] = useState('whey')
    const [whey, setWhey] = useState([])
    const [creatine, setCreatine] = useState([])
    
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
    }, []);

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

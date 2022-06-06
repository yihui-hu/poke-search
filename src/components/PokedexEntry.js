import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function PokedexEntry(props) {

    let id = props.id
    let [pokedexEntry, setPokedexEntry] = useState("Data unknown.")
    
    async function getData() {
        try {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            let data = response.data.flavor_text_entries
            for (let i = 0; i < data.length; i++) {
                let datum = response.data.flavor_text_entries[i]
                if (datum.language.name === "en") {
                    setPokedexEntry(datum.flavor_text)
                }
            }
        } catch {
            setPokedexEntry("Sorry! Data not available.")
        }
    }

    useEffect(() => {
        getData();
    }, [id])

    return (
        <div>
            <h1 className="title">POKÉDEX ENTRY</h1>
            <h2 className="pokedexEntry">{pokedexEntry}</h2>
        </div>
    )
}
import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"


export default function AbilityDesc(props) {

    let ability = props.ability.toLowerCase()
    let [abilityDesc, setAbilityDesc] = useState("")
    
    let getDescription = async ability => {
        try {
            let url = `https://pokeapi.co/api/v2/ability/${ability}`
            let response = await axios.get(url)
            let descriptions = response.data.effect_entries
            if (descriptions.length === 0) {
                throw ("Sorry! Data not available.")
            }
            // get english descriptions only
            for (let i = 0; i < descriptions.length; i++) {
                if (descriptions[i].language.name == "en") {
                    setAbilityDesc(descriptions[i].short_effect)
                }
            }
        } catch (error) {
            setAbilityDesc(error)
        }
    }

    useEffect(() => {
        getDescription(ability);
    }, [])

    return (
        <h4 className="abilityDesc">{abilityDesc}</h4>
    )
}
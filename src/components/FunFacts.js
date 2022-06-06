import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function FunFacts(props) {
    let hp = props.hp
    let name = props.name
    let capitalisedName = name.charAt(0).toUpperCase() + name.slice(1)
    let [facts, setFacts] = useState({
        habitat: "",
        growthRate: "",
        varieties: [],
        captureRate: 0,
        isLegendary: false,
        isMythical: false,
    })

    async function getTier() {
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        console.log(response.data)
        setFacts({
            habitat: response.data.habitat,
            growthRate: response.data.growth_rate.name,
            varieties: response.data.varieties,
            captureRate: response.data.capture_rate,
            isLegendary: response.data.is_legendary,
            isMythical: response.data.is_mythical
        })
    }

    useEffect(() => {
        getTier()
    }, [name])

    let maxHP = (((15.5 + 2*hp + 100)*50)/100) + 10
    let chance = Math.round((maxHP * facts.captureRate)/(3*maxHP) * 10) / 10

    function formatter(ability) {
        let word = ability.split(" ")
        for (let i = 0; i < word.length; i++) {
            word[i] = word[i][0].toUpperCase() + word[i].substr(1);
        }
        return word.join("-")
    }

    let form_counter = 0

    return (
        <div className="funfacts">
            <h1 className="title">FUN FACT(S)</h1>

            <h2 className="funfacts-spacer">• {capitalisedName} has a capture rate of {facts.captureRate}.</h2>
            <h2> &nbsp; At Level 50 and with full HP, you have a ~{chance}% of catching it with a regular Pokéball.<hr></hr></h2>

            <h2>• It has a {facts.growthRate} growth rate.<hr></hr></h2>

            <h2>• It tends to live in {facts.habitat !== null ? facts.habitat.name : `[redacted]`} areas.<hr></hr></h2>

            {facts.isLegendary && <h2>• {capitalisedName} is also a legendary Pokémon!<hr></hr></h2>}

            {facts.isMythical && <h2>• {capitalisedName} is also a mythical Pokémon!<hr></hr></h2>}

            {facts.varieties.length > 1 && <h2>• {capitalisedName} also has other forms: {facts.varieties.map((form) => {
                if (form.pokemon.name !== name) {
                    form_counter++
                    return <h4 className="funfacts-center">{form_counter}. {formatter(form.pokemon.name.replaceAll('-',' '))}</h4>
                }
            })}<h4 className="funfacts-center">Try looking them up above!</h4><hr></hr></h2>}
            
        </div>
    )
}
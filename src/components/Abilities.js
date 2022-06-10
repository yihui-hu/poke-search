import React from "react"
import { useState } from "react"
import AbilityDesc from "./AbilityDesc"


export default function Abilities(props) {

    // get all abilities
    let abilities = props.abilities.map(item => item.ability.name)

    function formatter(ability) {
        let word = ability.split(" ")
        for (let i = 0; i < word.length; i++) {
            word[i] = word[i][0].toUpperCase() + word[i].substr(1);
        }
        return word.join(" ")
    }

    function renderAbilities() {
        return abilities.map((ability) => 
            <div key={ability}>
                <h2 className="abilities-name">{formatter(ability.replaceAll('-',' '))}</h2>
                <AbilityDesc ability={ability} />
                <hr></hr>
            </div>
        )
    }

    return (
        <div className="abilities">
            <h1 className="title">ABILITIES</h1>
            <hr></hr>
            {renderAbilities()}
        </div>
    )
}
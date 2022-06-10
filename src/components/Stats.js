import React from "react"

export default function Stats(props) {

    // object destructuring coming in handy
    let {hp, attack, defense, special_attack, special_defense, speed} 
    = props.stats

    // colours from bulbapedia
    let colours = {
        hp: "#FF0000",
        atk: "#EF8030",
        def: "#F8CF30",
        spatk: "#6790F0",
        spdf: "#78C84F",
        spd: "#F85787",
    }

    function statsStyle(stat, color) {
        return {
            textAlign: "left",
            color: "black",
            marginLeft: "10px",
            textIndent: "5px",
            backgroundColor: color,
            width: `${determineWidth(stat)}px `,
            borderRadius: "4px",
        }
    }

    function determineWidth(stat) {
        if (stat < 10) {
            return 25
        } else if (stat < 25) {
            return 38
        } else {
            return stat*1.3
        }
    }

    let bst = hp + attack + defense + special_attack + special_defense + speed

    return (
        <div className="stats">
            <h1>HP: <span style={statsStyle(hp, colours.hp)}>{hp}</span></h1>
            <h1>Attack: <span style={statsStyle(attack, colours.atk)}>{attack}</span></h1>
            <h1>Defense: <span style={statsStyle(defense, colours.def)}>{defense}</span></h1>
            <h1>Sp.Atk: <span style={statsStyle(special_attack, colours.spatk)}>{special_attack}</span></h1>
            <h1>Sp.Def: <span style={statsStyle(special_defense, colours.spdf)}>{special_defense}</span></h1>
            <h1>Speed: <span style={statsStyle(speed, colours.spd)}>{speed}</span></h1>
            <h1>BST: {bst}</h1>
        </div>
    )
}
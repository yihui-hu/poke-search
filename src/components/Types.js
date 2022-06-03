import React from "react"

export default function Types(props) {

    // make each type capitalised
    let type_1 = props.type_1.charAt(0).toUpperCase() + props.type_1.slice(1)
    let type_2 = props.type_2.charAt(0).toUpperCase() + props.type_2.slice(1)

    // taken from https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
    const colours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    function determineColor(type) {
        if (type === "Grass") {
            return {
                color: "white",
                backgroundColor: colours.grass
            }
        } else if (type === "Water") {
            return {
                color: "white",
                backgroundColor: colours.water
            }
        } else if (type === "Fire") {
            return {
                color: "white",
                backgroundColor: colours.fire
            }
        } else if (type === "Normal") {
            return {
                color: "white",
                backgroundColor: colours.normal
            }
        } else if (type === "Electric") {
            return {
                color: "white",
                backgroundColor: colours.electric
            }
        } else if (type === "Ice") {
            return {
                color: "white",
                backgroundColor: colours.ice
            }
        } else if (type === "Fighting") {
            return {
                color: "white",
                backgroundColor: colours.fighting
            }
        } else if (type === "Poison") {
            return {
                color: "white",
                backgroundColor: colours.poison
            }
        } else if (type === "Ground") {
            return {
                color: "white",
                backgroundColor: colours.ground
            }
        } else if (type === "Flying") {
            return {
                color: "white",
                backgroundColor: colours.flying
            }
        } else if (type === "Psychic") {
            return {
                color: "white",
                backgroundColor: colours.psychic
            }
        } else if (type === "Bug") {
            return {
                color: "white",
                backgroundColor: colours.bug
            }
        } else if (type === "Rock") {
            return {
                color: "white",
                backgroundColor: colours.rock
            }
        } else if (type === "Ghost") {
            return {
                color: "white",
                backgroundColor: colours.ghost
            }
        } else if (type === "Dragon") {
            return {
                color: "white",
                backgroundColor: colours.dragon
            }
        } else if (type === "Dark") {
            return {
                color: "white",
                backgroundColor: colours.dark
            }
        } else if (type === "Steel") {
            return {
                color: "white",
                backgroundColor: colours.steel
            }
        } else if (type === "Fairy") {
            return {
                color: "white",
                backgroundColor: colours.fairy
            }
        } else {
            return {
                color: "white",
                backgroundColor: "black"
            }
        }
    }
    return (
        <div>
            <span className="type" style={determineColor(type_1)}>{type_1}</span>
            {type_2 !== "Nil" && <span className="type" style={determineColor(type_2)}>{type_2}</span>}
        </div>
    )
}
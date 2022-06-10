import React from "react"
import { useEffect, useState } from "react"
import useMediaQuery from "../hooks/useMediaQuery";
import axios from "axios"

export default function MoveDetails(props) {

    const isDesktop = useMediaQuery('(min-width: 480px)')

    let moveURL = props.moveURL
    let moveLevel = props.moveLevel
    let moveName = props.moveName
    
    let [moveDetails, setMoveDetails] = useState({
        type: {
            name: ""
        },
        power: "-",
        accuracy: "-",
        damage_class: {
            name: ""
        },
        pp: "-",
        priority: 0,
        flavor_text_entries: [
            {
                flavor_text: "",
                language: {
                    name: "en"
                }
            }
        ],
        effect_chance: 0,
    })

    async function getMoveDetails() {
        let response = await axios.get(moveURL)
        let data = response.data
        setMoveDetails(data)
    }

    useEffect(() => {
        getMoveDetails()
    }, [moveURL])

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
        if (type === "grass") {
            return {
                color: "white",
                backgroundColor: colours.grass,
                borderRadius: "25px",
            }
        } else if (type === "water") {
            return {
                color: "white",
                backgroundColor: colours.water,
                borderRadius: "25px",
            }
        } else if (type === "fire") {
            return {
                color: "white",
                backgroundColor: colours.fire,
                borderRadius: "25px",
            }
        } else if (type === "normal") {
            return {
                color: "white",
                backgroundColor: colours.normal,
                borderRadius: "25px",
            }
        } else if (type === "electric") {
            return {
                color: "white",
                backgroundColor: colours.electric,
                borderRadius: "25px",
            }
        } else if (type === "ice") {
            return {
                color: "white",
                backgroundColor: colours.ice,
                borderRadius: "25px",
            }
        } else if (type === "fighting") {
            return {
                color: "white",
                backgroundColor: colours.fighting,
                borderRadius: "25px",
            }
        } else if (type === "poison") {
            return {
                color: "white",
                backgroundColor: colours.poison,
                borderRadius: "25px",
            }
        } else if (type === "ground") {
            return {
                color: "white",
                backgroundColor: colours.ground,
                borderRadius: "25px",
            }
        } else if (type === "flying") {
            return {
                color: "white",
                backgroundColor: colours.flying,
                borderRadius: "25px",
            }
        } else if (type === "psychic") {
            return {
                color: "white",
                backgroundColor: colours.psychic,
                borderRadius: "25px",
            }
        } else if (type === "bug") {
            return {
                color: "white",
                backgroundColor: colours.bug,
                borderRadius: "25px",
            }
        } else if (type === "rock") {
            return {
                color: "white",
                backgroundColor: colours.rock,
                borderRadius: "25px",
            }
        } else if (type === "ghost") {
            return {
                color: "white",
                backgroundColor: colours.ghost,
                borderRadius: "25px",
            }
        } else if (type === "dragon") {
            return {
                color: "white",
                backgroundColor: colours.dragon,
                borderRadius: "25px",
            }
        } else if (type === "dark") {
            return {
                color: "white",
                backgroundColor: colours.dark,
                borderRadius: "25px",
            }
        } else if (type === "steel") {
            return {
                color: "white",
                backgroundColor: colours.steel,
                borderRadius: "25px",
            }
        } else if (type === "fairy") {
            return {
                color: "white",
                backgroundColor: colours.fairy,
                borderRadius: "25px",
            }
        } else {
            return {
                color: "white",
                backgroundColor: "black",
                borderRadius: "25px",
            }
        }
    }

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    function moveDescription() {
        for (let i = 0; i < moveDetails.flavor_text_entries.length; i++) {
            if (moveDetails.flavor_text_entries[i].language.name === "en") {
                return <p>{moveDetails.flavor_text_entries[i].flavor_text}</p>
            }
        }
    }

    return (
        <>
        <tr>
            <th className="moves-level">{moveLevel}</th>
            <th className="moves-name" onClick={toggleModal}>{moveName}</th>
            <th className="moves-type" style={determineColor(moveDetails.type.name)}>{moveDetails.type.name.charAt(0).toUpperCase() + moveDetails.type.name.slice(1)}</th>
            {isDesktop && <th className="moves-power">{moveDetails.power != null ? moveDetails.power : "-"}</th>}
            {isDesktop && <th className="moves-accuracy">{moveDetails.accuracy != null ? moveDetails.accuracy : "-"}</th>}
        </tr>
        {modal && <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <h2>{moveName}</h2>
                        {moveDescription()}
                        <p>This is a {moveDetails.damage_class.name} move which  {moveDetails.power != null ? `has a power of ${moveDetails.power}` : `has no/varied power`} {moveDetails.accuracy != null ? `and an accuracy of ${moveDetails.accuracy}%` : "and always lands"}.</p>
                        <p>It has a PP of {moveDetails.pp}.</p>
                        <button className="close-modal" onClick={toggleModal}>×
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}
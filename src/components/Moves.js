import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import MoveDetails from "./MoveDetails"
import useMediaQuery from "../hooks/useMediaQuery";

export default function Moves(props) {

    const isDesktop = useMediaQuery('(min-width: 480px)')
    
    let name = props.name.toLowerCase()
    let [moves, setMoves] = useState([])

    function formatter(name) {
        let word = name.split(" ")
        for (let i = 0; i < word.length; i++) {
            word[i] = word[i][0].toUpperCase() + word[i].substr(1);
        }
        return word.join(" ")
    }

    async function getMoves() {
        try {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            setMoves(response.data.moves)
        } catch {
            console.log("Data not available.")
        }
    }

    function renderMoves() {

        // first sort moves by level learned
        moves.sort((a,b) => 
            a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at 
        )

        return moves.map((move) => {
            if (move.version_group_details[0].level_learned_at !== 0) {
                return (
                <MoveDetails
                    key={move.move.name}
                    moveName={formatter(move.move.name.replaceAll('-',' '))}
                    moveLevel={move.version_group_details[0].level_learned_at}
                    moveURL={move.move.url}
                />
                )
            }
        })
    }

    useEffect(() => {
        getMoves()
    }, [name])

    return (
        <div className="moves-spacer">
            <h1 className="title">MOVES</h1>
            <p className="moves-info">(Click on a move for more info!)</p>
            <table className="moves">
            <tbody>
                <tr>
                    <th className="moves-header">Level</th>
                    <th className="moves-header">Move</th>
                    <th className="moves-header">Type</th>
                    {isDesktop && <th className="moves-header">Power</th>}
                    {isDesktop && <th className="moves-header">Accuracy</th>}
                </tr>
                <tr>
                    <th><hr></hr></th>
                    <th><hr></hr></th>
                    <th><hr></hr></th>
                    {isDesktop && <th><hr></hr></th>}
                    {isDesktop && <th><hr></hr></th>}
                </tr>
                {renderMoves()}
            </tbody>
        </table>
        </div>
    )
}
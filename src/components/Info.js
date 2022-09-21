import React from "react"
import { useState } from "react"

export default function Info() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
            <div className="info" onClick={toggleModal}>ⓘ</div>
            {modal && <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <h2>Info / Background</h2>
                        <p>I worked on this simple pseudo-Pokédex over a week during my summer break (2022).</p>
                        <p>Feel free to read more <a href="https://yhhu.xyz/pages/notes/060922_pokeSearch.html" target="blank">here</a>!</p>
                        <hr></hr>
                        <h2>Colophon</h2>
                        <p>Built with React and PokéAPI, hosted on Netlify.</p>
                        <p>Fonts: IBM Plex Sans & Mono, PP Mori & NeueBit</p>
                        {/* <hr></hr>
                        <h2>Why Grovyle as the default entry?</h2>
                        <p>It's my favourite Pokémon!</p> */}
                        <button className="close-modal" onClick={toggleModal}>×
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}
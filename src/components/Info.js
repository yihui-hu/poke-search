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
                        <p>I built this simple pseudo-Pokédex over a week during my summer break (2022).</p>
                        <p>Feel free to read more about this project on my personal site <a href="https://yhhu.xyz">here.</a></p>
                        <h2>Colophon</h2>
                        <p>Built using React and PokéAPI, hosted on Netlify.</p>
                        <p>Fonts: IBM Plex Sans & Mono</p>
                        <h2>Why Grovyle as the default entry?</h2>
                        <p>It's my favourite Pokémon!</p>
                        <button className="close-modal" onClick={toggleModal}>×
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}
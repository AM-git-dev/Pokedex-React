import React from "react";

function PokemonDisplay({ pokemonData, isContainerTopVisible }) {
    return (
        <div className={`container-top ${isContainerTopVisible ? "visible" : "hidden"}`}>
            <div className="nameandimage">
                <h1>{pokemonData.id < 100 ? `0${pokemonData.id}` : pokemonData.id} - {pokemonData.name}</h1>
                <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                />
            </div>
            <div className="infos">
                <p id='type1' className={`class${pokemonData.types[0].type.name}`}>{pokemonData.types[0].type.name}</p>
                <p id='type2' className={`class${pokemonData.types[1] ? pokemonData.types[1].type.name : ''}`}>
                    {pokemonData.types[1] ? pokemonData.types[1].type.name : ''}
                </p>
                <audio controls src={pokemonData.cries?.latest} autoPlay={true}></audio>
            </div>
        </div>
    );
}

export default PokemonDisplay;
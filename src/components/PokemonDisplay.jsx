function PokemonDisplay({ pokemonData }) {
    return (
        <div>
            <div className="nameandimage">
                <h1>{pokemonData.id < 100 ? `0${pokemonData.id}` : pokemonData.id} - {pokemonData.name}</h1>
                <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                />
            </div>
            <div className="infos">
                <p className="type">{pokemonData.types[0].type.name}</p>
                {/* Enlevez l'audio si vous n'avez pas de source valide */}
                 <audio controls src={pokemonData.cries?.latest}></audio>
            </div>
        </div>
    );
}

export default PokemonDisplay;

import { useState } from 'react';

function PokemonFetcher({ onFetch }) {
    const [pokemonName, setPokemonName] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Entrez un nom de Pokémon"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
            />
            <button onClick={() => onFetch(pokemonName)}>Chercher</button>
        </div>
    );
}

export default PokemonFetcher;

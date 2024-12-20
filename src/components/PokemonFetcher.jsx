import { useState } from 'react';

function PokemonFetcher({ onFetch }) {
    const [pokemonName, setPokemonName] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            onFetch(pokemonName);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Entrez un nom de Pokémon"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default PokemonFetcher;

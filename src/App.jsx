import { useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonFetcher from './components/PokemonFetcher';
import PokemonDisplay from './components/PokemonDisplay';
import PokemonScrollableList from './components/PokemonScrollableList';

import soundFile from './song/gameboy_song.mp3'


function App() {
    const [light, setLight] = useState('rgb(104, 162, 94)');
    const [pokedexDescription, setPokedexDescription] = useState('');
    const [screenColor, setScreenColor] = useState('linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3)), #000000');
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isContainerTopVisible, setIsContainerTopVisible] = useState(false);

    /* audio */

    const playAudio = new Audio(soundFile);

    const HandleClickStart = () => {

        setScreenColor('white');
        setLight('rgb(38,255,0)');

        playAudio.volume = 0.1;
        playAudio.disableRemotePlayback = false;
        playAudio.play();

    }

    const HandleClickdown = (event) => {

        setScreenColor('linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3)), #000000')
        setLight('rgb(104, 162, 94)')
        setIsContainerTopVisible(false);
        setIsDescriptionVisible(false);

        playAudio.pause();

    }

    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    const handleFetch = async (pokemonName) => {
        if (!pokemonName) {
            setError("Veuillez entrer un nom.");
            setPokemonData(null);
            return;
        }

        try {
            const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            const speciesUrl = pokemonDetails.data.species.url;
            const speciesResponse = await axios.get(speciesUrl);
            const pokedexDescriptionData = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'fr');
            setPokedexDescription(pokedexDescriptionData ? pokedexDescriptionData.flavor_text : 'Description non disponible.');
            const frenchName = speciesResponse.data.names.find(
                name => name.language.name === 'fr'
            )?.name || pokemonDetails.data.name;

            const pokemonDataWithFrenchName = {
                ...pokemonDetails.data,
                name: frenchName
            };

            setPokemonData(pokemonDataWithFrenchName);
            setError(null);
            setIsDescriptionVisible(true);
            setIsContainerTopVisible(true);
        } catch (err) {
            setError("Aucun résultat trouvé. Vérifiez l'orthographe ou utilisez le nom anglais.");
            setPokemonData(null);
        }
    };

    const handleSelectFromList = (englishName) => {
        handleFetch(englishName);
    };

    return (
        <div className="pokedexcontainer">
            <div className="upscreencontainer">
                <div className="upscreenborder">
                    <div style={{background: screenColor}} className="upscreen">
                        {error && <div className="error-message">{error}</div>}
                        {pokemonData && <PokemonDisplay pokemonData={pokemonData} isContainerTopVisible={isContainerTopVisible} />}
                        <div className={`description ${isDescriptionVisible ? "visible" : "hidden"}`} style={{border: isDescriptionVisible ? '' : 'none'}}>
                            <p>{pokedexDescription}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="separator">
                <div className="separatordark1"></div>
                <div className="separatordark2"></div>
                <div className="separatordark3"></div>
            </div>

            <div className="containerbottompart">
                <div className="left">
                    <div className="lightup" style={{background: light}}></div>
                    <div className="lightdown" style={{background: light}}></div>
                    <div className="bluecircle">
                        <div className="reflect"></div>
                    </div>
                </div>

                <div className="bottomscreencontainer">
                    <div className="screenborder">
                        <div className="screen" style={{ background: screenColor }}>
                            <div className={`listcontainer ${screenColor === "white" ? "visible" : ""}`}>
                                <PokemonScrollableList onSelect={handleSelectFromList} />
                            </div>

                            <div className={`filters ${screenColor === "white" ? "visible" : ""}`}>
                                <PokemonFetcher onFetch={handleFetch} />
                            </div>


                        </div>
                        <div className="buttonscontainer">
                            <div onClick={HandleClickStart} className="start"></div>
                            <div onClick={HandleClickdown} className="select"></div>
                        </div>
                    </div>
                </div>

                <div className="rightborder">
                    <div className="rightborderinside">
                        <div className="joystick">
                            <button className="plus">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

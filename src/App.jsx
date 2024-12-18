import { useState, useEffect }  from 'react'
import './App.css'
import axios from 'axios';

function PokemonFetcher({ pokemonName }) {
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pokemonName) return;

        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(response => {
                setPokemonData(response.data);
            })
            .catch(err => {
                setError(err);
            });
    }, [pokemonName]);

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }

    if (!pokemonData) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1 style={{ textTransform: 'uppercase' }}>{pokemonData.name}</h1>
            <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
            />
            <p >Type principal : {pokemonData.types[0].type.name}</p>
        </div>
    );
}
function App() {

  return (

          <div className="pokedexcontainer">
              <div className="upscreencontainer">
                  <div className="upscreenborder">
                      <div className="upscreen">
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
                      <div className="lightup"></div>
                      <div className="lightdown"></div>
                      <div className="bluecircle">
                          <div className="reflect"></div>
                      </div>
                  </div>
                  <div className="bottomscreencontainer">
                      <div className="screenborder">
                          <div className="screen">
                              <PokemonFetcher pokemonName="bulbasaur"></PokemonFetcher>
                          </div>
                          <div className="buttonscontainer">
                              <div className="start"></div>
                              <div className="select"></div>
                          </div>

                      </div>
                  </div>
                  <div className="rightborder">
                      <div className="rightborderinside">
                          <div className="joystick">
                              <button>+</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

  )
}

export default App

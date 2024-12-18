import { useState, useEffect }  from 'react'
import './App.css'


function App() {

    const [light, setLight] = useState('black')

    const [screenColor, setcreenColor] = useState('black')

    const HandleClick = (event) => {

        setcreenColor('white')
        setLight('rgb(104, 162, 94)')
    }

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
                      <div className="lightup" style={{background: light}}></div>
                      <div className="lightdown" style={{background: light}}></div>
                      <div className="bluecircle">
                          <div className="reflect"></div>
                      </div>
                  </div>
                  <div className="bottomscreencontainer">
                      <div className="screenborder">
                          <div className="screen" style={{ backgroundColor: screenColor}}>
                              <source src="https://www.youtube.com/watch?v=9XlO26FrH48"></source>
                          </div>
                      </div>
                  </div>
                  <div className="rightborder">
                      <div className="rightborderinside">
                          <div className="joystick">
                              <button onClick={HandleClick}>+</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

  )
}

export default App
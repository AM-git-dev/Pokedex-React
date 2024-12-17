import { useState, useEffect }  from 'react'
import './App.css'


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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactNavbar } from "overlay-navbar";
import logo from './images/1.png'
import { FaUserAlt } from "react-icons/fa";

import Home from "./home.js";
import "./App.css";
import Transcript from "./transcript.js";
import Discord_Bot from "./discord_bot.js";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <ReactNavbar
            burgerColorHover="black"
            burgerSize="5vmax"
            navColor1="#264653"
            navColor2="#2A9D8F"
            navColor3="blue"
            navColor4="#E9C46A"
            logo={logo}
            link1Text = "Transcriber"
            link2Text = ""
            link3Text = "Discord bot"
            link4Text = ""
            link1Url = "/transcript"
            link3Url = "/discord_bot"
            profileIcon={true}
            ProfileIconElement={FaUserAlt}
            logoHoverSize="15px"
            searchIconColor="black"
            profileIconColor="black"
          />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/transcript" element={<Transcript />} />
            <Route exact path="/discord_bot" element={<Discord_Bot />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

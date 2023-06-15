import React from "react";

const mystyle = {
  backgroundColor: "brown",
  height: "100vh",
};

function Discord_Bot() {
  return (
    <div
      className="container  w-100 justify-content-center d-flex flex-column"
      style={mystyle}
    >
      <div className="container discord_image w-50 d-flex p-2 mt-4 justify-content-center text-white    flex-row align-items-center">
        <h2 className="ms-3">SymblDiscordBot</h2>
      </div>
      <div>
      <button className="btn btn-primary p-2 "><a href="https://discord.com/api/oauth2/authorize?client_id=1024343837130379284&permissions=0&scope=bot%20applications.commands" rel="link not found" className='text-white text-decoration-none' target={"_blank"}> server me aa jao </a></button>
      </div>
      <div className="container  text-white-50 p-3 text-decoration-none  mt-4">
        <li>
          Auto-detect audio upload and prompt a button to generate transcribed
          text{" "}
        </li>
        <li>
          Uses{" "}
          <a
            href="https://symbl.ai"
            className="text-decoration-none text-info"
        
          >

            Symbl.ai.
          </a>
        </li>
      </div>
    </div>
  );
}
export default Discord_Bot;

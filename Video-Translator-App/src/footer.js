import React from "react";
import "./footer.css"

const footer = () => {
  return (
    <div className="mystyle">
      <div className=" text-white text-start mt-1   ">
        <li>Upload a video to get transcribbed messages.</li>
        <li>
          
          <a
            href="https://symbl.ai"
            className="text-decoration-none text-info"
            target={"_blank"}
          >
            Symbl.ai
          </a>
            &nbsp;is used to generate transcribbed messages
        </li>
        <li>
          The larger thse size , more will be the time to process and generate
          transcribbed messages, So be patient!
        </li>
      </div>
    </div>
  );
};

export default footer;

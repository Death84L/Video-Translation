import React, { useEffect } from "react";
import firstlabel from './images/first_label.jpg'
import secondlabel from './images/second_label.gif' 
import thirdlabel from './images/third_label.jpg'
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./footer";
import "./home.css"
const fetch = require('node-fetch')


const mystyle = {
  backgroundColor: "black",
  fontFamily: "Arial",
  justify_content: "center",
};

function Home() {
  useEffect(() => {
    const appId =
      "6a4a5458667962724d63534c4d357a5a67797479546947633738335251487578";
    const appSecret =
      "59706265587030365853384946414a66496d617447794d776a5a6d4951794a4e62494b666d50785167687a38364a4b72475654316e6b65734b51446f697a696f";

    const url = "https://api.symbl.ai/oauth2/token:generate";
    const authOption = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "application",
        appId: appId,
        appSecret: appSecret,
      }),
    };

    fetch(url, authOption)
      .then((response) => response.json())
      .then((realData) =>
        window.localStorage.setItem("auth", realData.accessToken)
      )
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  return (
    <>
      <div style={{ padding: "50px" }}>
        <h5>
          Using an AI powered conversation intelligence platform{" "}
          <a href="https://symbl.ai" className="text-decoration-none text-info">
            Symbl.ai
          </a>{" "}
          , I developed a platform where user can :
        </h5>
      </div>

      <Carousel style={mystyle}>
        <Carousel.Item>
          <img
            className="d-inline w-90 "
            style={{ height: "600px"}}
            src={firstlabel}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3> <a href="/transcript">Video Transcriber</a> </h3>
            <p>A tool to convert video to text.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline w-90"
            style={{ height: "600px" }}
            src={secondlabel}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 > <a href="/discord_bot">Discord bot</a></h3>
            <p>Add this bot to your server anytime, and then enjoy the transcriber.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline w-90" 
            style={{ height: "600px" }}
            src={thirdlabel}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Chatbot</h3>
            <p>
             Have virtual convesation with the chatbot.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Footer />
    </>
  );
}

export default Home;

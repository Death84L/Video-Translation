import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./transcript.css";
import fetch from "node-fetch";

const fileTypes = ["MP4"];

function Transcript() {
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(false);
  const [innermsg, setInnerMsg] = useState("Get your transcribed message");
  const [jsondata, setJsonData] = useState();
  const [textdata, setTextData] = useState("");

  const handleChange = (file) => {
    console.log(file[0]);
    setFile(file);
  };

  function getMessage(res) {
    console.log(343);
    let timer = setInterval(() => {
      fetch(`https://api.symbl.ai/v1/job/${res.jobId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
          "Content-Type": "applicaton/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(data.status);
          if (data.status === "completed") {
            fetch(
              `https://api.symbl.ai/v1/conversations/${res.conversationId}/messages`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "auth"
                  )}`,
                  "Content-Type": "applicaton/json",
                },
              }
            )
              .then((res2) => res2.json())
              .then((res3) => {
                console.log(res3);
                setLoad(false);
                res3.messages.map((pre) => {
                  return setTextData((msg) => msg + pre.text + "\n");
                });
                setJsonData(
                  res3.messages.map((pre) => {
                    return {
                      text: pre.text,
                      conversationId: res.conversationId,
                    };
                  })
                );

                setInnerMsg("Your message has been successfully transcribed");
              })
              .catch((err) => {
                console.log(err.message);
              });
            clearInterval(timer);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);
  }

  function getdata(e) {
    if (file[0].size <= 15000000) {
      //load ko true krenge
      //inner msg  job id & vconvo id nilalenge
      // get mes (call)
      setLoad(true);
      setInnerMsg("kam chal rha hai");
      const url = "https://api.symbl.ai/v1/process/video";
      let option = {
        body: file[0],
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
          "Content-Type": "video/mp4",
        },
        method: "POST",
      };

      fetch(url, option)
        .then((response) => response.json())
        .then((data) => getMessage(data))
        .catch((err) => {
          console.log(err.name);
        });
    } else {
      setFile(null);
      alert("try to reduce the file size");
    }
  }

  //download text
  function downtext() {
    if (textdata) {
      var blob = new Blob([textdata], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "kar_le.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  //download json
  function downJson() {
    if (jsondata) {
      var blob = new Blob([JSON.stringify(jsondata)], {
        type: "application/json;charset=utf-8",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "kar_le.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  //clipboard
  function copytext() {
    if (textdata) {
      navigator.clipboard.writeText(textdata);
    }
  }

  return (
    <>
      <div className="d-flex flex-column align-center justify-content-center  main">
        <div className="container d-flex flex-column  align-items-center text-white mt-4">
          <FileUploader
            multiple = {true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            classes="text-white-50 mt-3"
            titleCss= {{color: "#000"}}
            className="select"
            maxSize = {15}
          />
          <button
            disabled={load}
            type="button"
            className="btn btn-success b-1  m-3"
            onClick={(e) =>
              file ? getdata(e) : alert("please select video file")
            }
          >
            {innermsg}
          </button>
        </div>
        <div
          className="container messagediv bg-gradient w-75 text-white-50 my-1 p-4 overflow-auto break-word text-start block"
          style={{ backgroundColor: "#171010", height: "435px" }}
        >
          {load ? (
            <h2>The video is being transcribed!</h2>
            // <div className="text-center  d-flex flex-row justify-content-center align-content-center "></div>
          ) : (
            <>
              {jsondata && (
                <h5 className="text-center text-info">
                  Here is your transcribed messages!
                </h5>
              )}
              {jsondata?.map((m) => {
                return (
                  <li
                    className="list"
                    key={m.conversationId * Math.random() * 2}
                  >
                    {m.text}
                  </li>
                );
              })}
            </>
          )}
        </div>

        <div className="container d-flex flex-row justify-content-around align-center p-3 mt-4 flex-wrap">
          <button
            disabled={load}
            className="btn btn-success m-2"
            onClick={copytext}
          >
            Copy
          </button>
          <button
            disabled={load}
            className="btn btn-secondary m-2"
            onClick={downJson}
          >
            Download JSON
          </button>
          <button
            disabled={load}
            className="btn btn-primary  m-2"
            onClick={downtext}
          >
            Download Text
          </button>
        </div>
      </div>
    </>
  );
}
export default Transcript;


// 
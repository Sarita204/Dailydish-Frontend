import React from "react";
import "../Styles/Livestream.css"
import { Container } from "react-bootstrap";

const LiveStreams = () => {

    const videos = [
        { url: "https://www.youtube.com/watch?v=XXXXXX" },
        { url: "https://www.youtube.com/watch?v=YYYYYY" },
        { url: "https://www.youtube.com/watch?v=ZZZZZZ" },
        { url: "https://www.youtube.com/watch?v=AAAAAA" },
      ];

  return (
    <div>
           <Container>
      <h1 className="text-center mt-4">Live Streams</h1>
      <div className="container mt-4">
        <div className="row">
          {videos.map((video, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="video-item">
                <video controls width="100%" height="100%">
                  <source src='../Assets/header-video-1.mp4' type="video/mp4" />
                </video>
                <h5 className="text-center">{video.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
    </div>
  )
}

export default LiveStreams
import React, { useState } from "react";
import io from "socket.io-client";
import TemperatureChart from "./charts/TemperatureChart";
import axios from 'axios';

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

function App() {
  const [dataPoints, setDataPoints] = useState([])

  socket.on("cluster_data", (msg) => {
    const datapoint = {
      x: new Date(msg.time * 1000),
      y: msg.measurements.temperature
    }
    setDataPoints([...dataPoints, datapoint]);
  });

  const onClick = () => {
    const requestBody = {
      message: "This is from react app"
    }
    axios.post(`${endPoint}/post`, requestBody)
    .then(res => console.log(res.data));
  }

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <h3>Temperature</h3>
            <TemperatureChart
              dataset={dataPoints}
            />
          </div>
          <div className="col-sm">
            <button onClick={() => onClick()}>POST</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

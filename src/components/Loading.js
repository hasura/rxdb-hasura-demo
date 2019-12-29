import React, { Component } from "react";
import loadingSVG from "./loading.svg";

export default class Loading extends Component {
  render() {
    const style = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white"
    };

    return (
      <div style={style}>
        <img src={loadingSVG} alt="loading" />
      </div>
    );
  }
}
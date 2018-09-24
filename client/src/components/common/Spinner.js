import React from "react";
import spinner from "./animated_loading__by__amiri.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="loading.."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
};

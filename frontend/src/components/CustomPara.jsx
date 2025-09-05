import React, { useState } from "react";

export default function CustomPara() {
  const [para, setPara] = useState("");

  function handleTextArea(event) {
    // addEventListener("keydown", (e) => {
    //   if (e.key === "Enter") {
    //     setPara((pre) => pre);
    //   } else {
    //     setPara((pre) => pre + event.target.value);
    //   }
    // });
    console.log(event.target.value);
    // if (para === event.target.value) {
    //   console.log("true");
    // }
    setPara(event.target.value);
    // return removeEventListener("keydown");
  }

  return (
    <div
      style={{
        border: "2px solid",
      }}
    >
      <textarea
        rows={5}
        className="form-control"
        style={{ boxShadow: "none", border: "none", resize: "none" }}
        value={para}
        onChange={handleTextArea}
      ></textarea>
    </div>
  );
}

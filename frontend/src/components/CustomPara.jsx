import React, { useState } from "react";

export default function CustomPara({ setContents, setCustomPara }) {
  const [para, setPara] = useState("");

  function handleTextArea(event) {
    const text = event.target.value
    setPara(text);

  }

  function handleAddPara() {
    setContents(pre => [...pre, para.trim()]);
    setPara("")
    setCustomPara(false)
  }

  return (
    <>
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
          title={"The content will be removed once the page is refreshed"}
        ></textarea>
      </div>
      {
        para.length != 0 &&
        <button className="btn btn-success" onClick={handleAddPara}>ADD</button>
      }
    </>
  );
}

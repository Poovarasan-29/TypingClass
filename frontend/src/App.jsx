import { useEffect, useRef, useState } from "react";
import "./App.css";
import CustomPara from "./components/CustomPara";

function App() {
  const [count, setCount] = useState(0);
  const [keyPressed, setKeyPressed] = useState(false);
  const [text, setText] = useState(null);
  const [correctWords, setCorrectWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [displayResult, setDisplayResult] = useState(false);
  const [showText, setShowText] = useState(null);
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);
  const [resume, setResume] = useState(false);
  const [typedWords, setTypedWords] = useState("");
  const [contents, setContents] = useState([
    "asas lklk opop dede jkjk qwqw pqpq uiui mnmn zxzx asas lklk opop. dede mnmn zxzx qwqw pqpq jkjk uiui asas lklk opop.",
    "India, officially known as the Republic of India, is a country in South Asia. It is the seventh-largest country by land area and the most populous democracy in the world. India is known for its rich cultural heritage, which spans thousands of years.",
    "ReactJS is a popular JavaScript library for building user interfaces, developed by Facebook. It allows developers to create reusable UI components, making development efficient and scalable. With a virtual DOM for fast rendering and a component-based structure, React is widely used for building dynamic and interactive web applications.",
  ]);
  const [customPara, setCustomPara] = useState(false);

  // Timer
  const defaultMinutes = 1;
  const defaultSeconds = 59;
  const [timer, setTimer] = useState({
    minutes: defaultMinutes,
    seconds: defaultSeconds,
  });
  const timerIntervalID = useRef(null);

  useEffect(() => {
    function handleKeyPress(e) {
      const preventKeys = [
        "Shift",
        "Control",
        "Alt",
        "Tab",
        "CapsLock",
        "Escape",
        "Backspace",
        "NumLock",
        "Meta",
        "Enter",
        "FN",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ];

      if (e.key === "Enter" && start) {
        handleStartBtn();
      }
      if (e.key === " " && document.activeElement.tagName === "BUTTON") {
        e.preventDefault();
      }

      if (
        !keyPressed &&
        !start &&
        pause &&
        !preventKeys.includes(e.key) &&
        count < text.length
      ) {
        if (e.key === text[count]) {
          setCorrectWords([...correctWords, count]);
        } else {
          setWrongWords([...wrongWords, count]);
        }
        setCount(count + 1);
        // setKeyPressed(true);
        setDisplayResult(false);
        setTypedWords((pre) => pre + e.key);

        setShowText(
          <div>
            {text.split("").map((val, index) => {
              if (e.key === text[count]) {
                if ([...correctWords, count].includes(index))
                  return (
                    <span className="text-success" key={index}>
                      {val}
                    </span>
                  );
                else if ([...wrongWords].includes(index))
                  return (
                    <span className="text-danger" key={index}>
                      {val}
                    </span>
                  );
                else
                  return (
                    <span
                      style={
                        count + 1 == index ? { borderBottom: "2px solid" } : {}
                      }
                      key={index}
                    >
                      {val}
                    </span>
                  );
              } else {
                if ([...correctWords].includes(index))
                  return (
                    <span className="text-success" key={index}>
                      {val}
                    </span>
                  );
                else if ([...wrongWords, count].includes(index))
                  return (
                    <span className="text-danger" key={index}>
                      {val}
                    </span>
                  );
                else
                  return (
                    <span
                      style={
                        count + 1 == index ? { borderBottom: "2px solid" } : {}
                      }
                      key={index}
                    >
                      {val}
                    </span>
                  );
              }
            })}
          </div>
        );
        console.log(count, " : ", text.length);

        if (count + 1 === text.length) {
          setStart(false);
          setPause(false);
          setDisplayResult(true);
          clearInterval(timerIntervalID.current);
          timerIntervalID.current = null;
        }
      }
    }

    function handleKeyUp() {
      setKeyPressed(false);
    }

    if (text !== 0) {
      document.addEventListener("keydown", handleKeyPress);
      //   document.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [count, keyPressed, text, start, pause]);

  function handleClickedContent(e) {
    const targetValue = e.target;
    const classNameCheck = targetValue.className.split(" ").includes("content");
    if (classNameCheck) {
      setCorrectWords([]);
      setWrongWords([]);
      setCount(0);
      setTypedWords("");
      clearInterval(timerIntervalID.current);
      timerIntervalID.current = null;
      setTimer({ minutes: defaultMinutes, seconds: defaultSeconds });
      setDisplayResult(false);
      setStart(true);
      setText(targetValue.innerText);
      setShowText(
        <div>
          <span style={{ borderBottom: "2px solid" }}>
            {targetValue.innerText[0]}
          </span>
          {targetValue.innerText.slice(1, targetValue.innerText.length)}
        </div>
      );
    }
  }

  // function handleResultBtn() {
  //     setDisplayResult(true);
  //     handlePauseBtn();
  // }

  function Timer() {
    if (timerIntervalID.current) return;
    timerIntervalID.current = setInterval(() => {
      setTimer((pre) => {
        if (pre.seconds === 0 && pre.minutes > 0)
          return { minutes: pre.minutes - 1, seconds: 59 };
        else if (pre.seconds === 0 && pre.minutes === 0) {
          setStart(false);
          setPause(false);
          setDisplayResult(true);
          clearInterval(timerIntervalID.current);
          return { minutes: 0, seconds: 0 };
        } else return { minutes: pre.minutes, seconds: pre.seconds - 1 };
      });
    }, 1000);
  }

  function handleStartBtn() {
    setStart(false);
    setPause(true);
    setResume(false);
    setDisplayResult(false);
    Timer();
  }
  function handlePauseBtn() {
    setStart(false);
    setPause(false);
    setResume(true);
    clearInterval(timerIntervalID.current);
    timerIntervalID.current = null;
  }
  function handleRestartBtn() {
    setStart(true);
    setCorrectWords([]);
    setWrongWords([]);
    setCount(0);
    setTypedWords("");
    clearInterval(timerIntervalID.current);
    timerIntervalID.current = null;
    setTimer({ minutes: defaultMinutes, seconds: defaultSeconds });
    setDisplayResult(false);
    setText(text);
    setShowText(
      <div>
        <span style={{ borderBottom: "2px solid" }}>{text[0]}</span>
        {text.slice(1, text.length)}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center p-5">Typing Test</h1>

      <div className="d-flex">
        <div
          className="div d-flex flex-column gap-4 px-3"
          style={{ width: "40%" }}
          onClick={handleClickedContent}
        >
          {contents.map((val, index) => (
            <div className="border border-4 p-2 content">{val}</div>
          ))}

          {customPara ? (
            <CustomPara setContents={setContents} setCustomPara={setCustomPara}/>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setCustomPara(true)}
            >
              Custom
            </button>
          )}
        </div>
        <div className="border border-dark" style={{ height: "100vh" }}></div>
        {text !== null && (
          <div className=" p-4" style={{ width: "60%" }}>
            <div className="top-options d-flex align-items-center justify-content-between">
              <div className="timer d-flex align-items-center gap-2">
                <div className="border border-dark-subtle p-1 px-3 fs-5">
                  <span style={{ width: "32px" }} className="d-inline-block">
                    {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
                  </span>
                  <span> : </span>
                  <span
                    style={{ width: "32px" }}
                    className="d-inline-block text-end"
                  >
                    {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
                  </span>
                </div>
                {start === false && (
                  <button
                    className="btn btn-primary my-3"
                    onClick={handleRestartBtn}
                  >
                    Restart
                  </button>
                )}
              </div>
              <div className="options d-flex gap-2">
                {/* {
                                    start === false && <button className='btn btn-warning my-3' onClick={handleResultBtn}>
                                        Get Result
                                    </button>
                                } */}
                {start ? (
                  <button
                    className="btn btn-success my-3"
                    title="Enter to start"
                    onClick={handleStartBtn}
                  >
                    Start
                  </button>
                ) : pause ? (
                  <button
                    className="btn btn-danger my-3"
                    onClick={handlePauseBtn}
                  >
                    Pause
                  </button>
                ) : resume ? (
                  <button
                    className="btn btn-success my-3"
                    onClick={handleStartBtn}
                  >
                    Resume
                  </button>
                ) : null}
              </div>
            </div>
            <div
              className="fs-3"
              style={{ letterSpacing: "1px", wordSpacing: "5px" }}
            >
              {showText}
            </div>
            <div
              className="fs-5 my-4 text-primary"
              style={{
                letterSpacing: "1px",
                wordSpacing: "5px",
                borderBottom: "2px solid black",
                paddingTop: typedWords.length == 0 ? "0px" : "0px",
              }}
            >
              <span style={{ borderRight: "2px solid black" }}>
                {typedWords}
              </span>
            </div>
            {displayResult && (
              <ul
                className="list-unstyled border border-3 p-3"
                style={{ width: "fit-content" }}
              >
                <h3>
                  Accuracy{" "}
                  {((correctWords.length / text.length) * 100).toFixed(2)}%
                </h3>
                <li>Total Letters : {text.length}</li>
                <li>Total Correct : {correctWords.length}</li>
                <li>Total Wrong : {wrongWords.length}</li>
                <li>
                  Time Taken :{" "}
                  {count === text.length
                    ? defaultMinutes - timer.minutes === 0
                      ? `${defaultSeconds + 1 - timer.seconds} Second(s)`
                      : `${defaultMinutes - timer.minutes} Minute(s)  ${
                          defaultSeconds + 1 - timer.seconds
                        } Second(s)`
                    : `Time out`}
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

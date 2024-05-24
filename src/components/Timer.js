import React, { useEffect, useState, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState({
    minutes: 0,
    timerMinutes: 0,
    seconds: 0,
    timerSeconds: 0,
  });

  const [isRuning, setIsRunning] = useState(false);

  const inputTime = useRef(null);

  const toTimeString = (time) => {
    let strTime = time.toString();
    while (strTime.length <= 1) {
      strTime = "0" + strTime;
    }
    return strTime;
  };

  const handleStart = (e) => {
    e.preventDefault();

    const tempSeconds = inputTime.current.seconds.value
      ? inputTime.current.seconds.value
      : 0;
    const tempMinutes = inputTime.current.minutes.value
      ? parseInt(inputTime.current.minutes.value)
      : 0;

    setTime({
      minutes: tempMinutes + Math.floor(tempSeconds / 60),
      timerMinutes: tempMinutes + Math.floor(tempSeconds / 60),
      seconds: tempSeconds % 60,
      timerSeconds: tempSeconds % 60,
    });

    setIsRunning(true);
  };

  const handleReset = () => {
    console.log("Reset");
    setTime({
      ...time,
      timerMinutes: time.minutes,
      timerSeconds: time.seconds,
    });
  };

  useEffect(() => {
    if (isRuning) {
      if (time.timerSeconds > 0) {
        const intervalID = setInterval(
          () =>
            setTime({
              ...time,
              timerSeconds: time.timerSeconds - 1,
            }),
          1000
        );
        return () => {
          clearInterval(intervalID);
        };
      } else if (time.timerMinutes > 0 && time.timerSeconds == 0) {
        const intervalID = setInterval(
          () =>
            setTime({
              ...time,
              timerMinutes: time.timerMinutes - 1,
              timerSeconds: 59,
            }),
          1000
        );
        return () => {
          clearInterval(intervalID);
        };
      } else if (time.timerMinutes <= 0 && time.timerSeconds <= 0) {
        setIsRunning(false);
      }
    }
  }, [time.timerMinutes, time.timerSeconds, isRuning]);

  const handlePauseResume = () => {
    if (isRuning === true) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  return (
    <>
      <h1>Timer</h1>
      <div className="timer--container">
        <form onSubmit={handleStart} ref={inputTime}>
          <label>
            <input name="minutes" type="number" defaultValue={0} />
            Minutes
          </label>

          <label>
            <input name="seconds" type="number" defaultValue={0} />
            Seconds
          </label>
          <button type="submit">START</button>
        </form>
      </div>
      <div className="timer--button">
        <button onClick={() => handlePauseResume()}>
          {isRuning ? "PAUSE" : "RESUME"}
        </button>
        <button onClick={() => handleReset()}>RESET</button>
      </div>
      <h1 className="timer--time">
        {toTimeString(time.timerMinutes)}:{toTimeString(time.timerSeconds)}
      </h1>
    </>
  );
};

export default Timer;

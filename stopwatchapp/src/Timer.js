import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const updateTime = () => {
    setTime((prevTime) => {
      let { hours, minutes, seconds } = prevTime;
      seconds += 1;

      if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
      }

      if (minutes >= 60) {
        minutes = 0;
        hours += 1;
      }

      return { hours, minutes, seconds };
    });
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(updateTime, 1000);
      setIntervalId(id);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        fontSize: '2rem',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div>
        {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
      </div>

      <button
        onClick={handleStartStop}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          backgroundColor: isRunning ? '#ff4d4d' : '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {isRunning ? 'Стоп' : 'Старт'}
      </button>

      {(time.hours !== 0 || time.minutes !== 0 || time.seconds !== 0) && (
        <button
          onClick={handleReset}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Сброс
        </button>
      )}
    </div>
  );
};

export default Timer;
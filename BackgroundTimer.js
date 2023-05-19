import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const TimerApp = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Start the timer
  const startTimer = () => {
    BackgroundTimer.start();
    setIsRunning(true);
  };

  // Stop the timer
  const stopTimer = () => {
    BackgroundTimer.stop();
    setIsRunning(false);
  };

  // Update the time every second
  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    // Return a function that will be called when the component is unmounted or the timer is stopped
    return () => {
      BackgroundTimer.clearInterval(intervalId);
    };
  }, []);

  return (
    <View>
      <Text>Time: {time} seconds</Text>

      {/* Start/Stop buttons */}
      {isRunning ? (
        <Button title="Stop" onPress={stopTimer} />
      ) : (
        <Button title="Start" onPress={startTimer} />
      )}
    </View>
  );
};

export default TimerApp;

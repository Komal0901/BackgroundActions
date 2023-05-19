// import {Button, StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import BackgroundService from 'react-native-background-actions';
// import TimerApp from './BackgroundTimer';
// const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
// const App = () => {
//   const [counter, setCounter] = useState(0);

//   // You can do anything in your task such as network requests, timers and so on,
//   // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
//   // React Native will go into "paused" mode (unless there are other tasks running,
//   // or there is a foreground app).
//   const veryIntensiveTask = async taskDataArguments => {
//     let i;
//     // Example of an infinite loop task
//     const {delay} = taskDataArguments;
//     await new Promise(async resolve => {
//       for (i = counter; BackgroundService.isRunning(); i++) {
//         console.log('count', i);
//         setCounter(i);
//         await BackgroundService.updateNotification({
//           taskDesc: 'New ExampleTask description' + ' ' + i,
//         });
//         await sleep(delay);
//       }
//     });
//   };

//   // Start the background task
//   const startBackgroundAction = async () => {
//     const options = {
//       taskName: 'Example',
//       taskTitle: 'ExampleTask title',
//       taskDesc: 'ExampleTask description',
//       taskIcon: {
//         name: 'ic_launcher',
//         type: 'mipmap',
//       },
//       color: '#ff00ff',
//       linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
//       parameters: {
//         delay: 1000,
//       },
//       startAndKeepAwake: true,
//     };
//     try {
//       console.log('hii');

//       await BackgroundService.start(veryIntensiveTask, options);
//     } catch (error) {
//       console.log('[ERROR]', error);
//     }
//   };
//   // Stop the background task

//   const stopBackgroundAction = async () => {
//     try {
//       await BackgroundService.stop();
//       console.log('stop');
//       setCounter(0);
//     } catch (error) {
//       console.log('[ERROR]', error);
//     }
//   };
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         marginHorizontal: 20,
//       }}>
//       <Text style={{textAlign: 'center', fontSize: 25}}>{counter}</Text>
//       <Button
//         title="Start background action"
//         onPress={() => {
//           startBackgroundAction();
//         }}
//       />
//       <View
//         style={{width: '100%', height: 10, backgroundColor: 'white'}}></View>
//       <Button
//         title="Stop background action"
//         onPress={() => {
//           stopBackgroundAction();
//         }}
//       />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import BackgroundService from 'react-native-background-actions';
import BackgroundCounter from './BackgroundCounter';
const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  console.log(time);
  // Start the timer
  const startTimer = async () => {
    await BackgroundTimer.start();
    setIsRunning(true);
  };

  // Stop the timer
  const stopTimer = () => {
    BackgroundTimer.stop();
    setIsRunning(false);
    setTime(0);
  };

  // Update the time every second
  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = BackgroundTimer.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    // Return a function that will be called when the component is unmounted or the timer is stopped
    return () => {
      if (intervalId) {
        BackgroundTimer.clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{alignSelf: 'center', fontSize: 20}}>
        Time: {time} seconds
      </Text>

      {/* Start/Stop buttons */}
      {isRunning ? (
        <Button title="Stop" onPress={stopTimer} />
      ) : (
        <Button title="Start" onPress={startTimer} />
      )}
      <BackgroundCounter />
    </View>
  );
};

export default App;

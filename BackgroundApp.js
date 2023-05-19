import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import BackgroundService from 'react-native-background-actions';
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).

const BackgroundApp = () => {
  console.log('BackgroundService.isRunning()', BackgroundService.isRunning());
  const [count, setCount] = useState(0);
  const veryIntensiveTask = async taskDataArguments => {
    let i;
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (i = 0; BackgroundService.isRunning(); i++) {
        setCount(i);
        BackgroundService.updateNotification({
          taskDesc: i + '%',
        });
        console.log(i);
        await sleep(delay);
      }
    });
  };

  const options = {
    taskName: 'Counter',
    taskTitle: 'downloading..',
    taskDesc: 'Description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 2000,
    },

    progressBar: {
      max: 10,
      value: 1,
    },
  };

  const startBackgroundServices = async () => {
    console.log('start');
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'My Counter is running',
    }); //this is used  to start  backgropund service
  };
  const stopBackgroundServices = async () => {
    // await BackgroundService.stop(); // this will stop background service
    console.log('background service stopped');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 25}}>{count}</Text>
      <TouchableOpacity
        onPress={() => startBackgroundServices()}
        style={{backgroundColor: 'green', padding: 10}}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          Start Background Services
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => stopBackgroundServices()}
        style={{backgroundColor: 'green', padding: 10, marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          Stop Background Services
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackgroundApp;

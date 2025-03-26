import React from 'react';
import {View, Text, Button} from 'react-native';
import ProgressBar from './ProgressBar';
import styles from '../styles';

const TimerItem = ({timer, updateTimer}) => {
  const startTimer = () => updateTimer(timer.id, {status: 'Running'});
  const pauseTimer = () => updateTimer(timer.id, {status: 'Paused'});
  const resetTimer = () =>
    updateTimer(timer.id, {
      status: 'Paused',
      remaining: timer.duration,
      halfwayAlert: false,
    });

  return (
    <View style={styles.timerItem}>
      <Text>
        {timer.name} - {timer.remaining}s ({timer.status})
      </Text>
      <ProgressBar total={timer.duration} remaining={timer.remaining} />
      <View style={styles.timerControls}>
        {timer.status !== 'Running' && (
          <Button title="Start" onPress={startTimer} />
        )}
        {timer.status === 'Running' && (
          <Button title="Pause" onPress={pauseTimer} />
        )}
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
};

export default TimerItem;

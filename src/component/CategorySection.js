import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import TimerItem from './TimerItem';
import {saveTimers} from '../utils/storage';
import styles from '../styles';

const CategorySection = ({category, timers, setTimers}) => {
  const [expanded, setExpanded] = useState(false);

  const updateTimer = (id, updates) => {
    const updatedTimers = timers.map(t =>
      t.id === id ? {...t, ...updates} : t,
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const bulkAction = action => {
    const updatedTimers = timers.map(t => {
      if (action === 'start') return {...t, status: 'Running'};
      if (action === 'pause') return {...t, status: 'Paused'};
      if (action === 'reset')
        return {
          ...t,
          status: 'Paused',
          remaining: t.duration,
          halfwayAlert: false,
        };
      return t;
    });
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  return (
    <View style={styles.category}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.categoryTitle}>
          {category} ({timers.length})
        </Text>
      </TouchableOpacity>
      {expanded && (
        <>
          <View style={styles.bulkActions}>
            <Button title="Start All" onPress={() => bulkAction('start')} />
            <Button title="Pause All" onPress={() => bulkAction('pause')} />
            <Button title="Reset All" onPress={() => bulkAction('reset')} />
          </View>
          {timers.map(timer => (
            <TimerItem key={timer.id} timer={timer} updateTimer={updateTimer} />
          ))}
        </>
      )}
    </View>
  );
};

export default CategorySection;

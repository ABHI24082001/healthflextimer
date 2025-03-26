import React from 'react';
import {View} from 'react-native';
import styles from '../styles';

const ProgressBar = ({total, remaining}) => {
  const progress = (remaining / total) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, {width: `${progress}%`}]} />
    </View>
  );
};

export default ProgressBar;

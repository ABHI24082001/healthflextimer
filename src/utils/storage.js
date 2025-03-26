import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTimers = async timers => {
  try {
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
  } catch (e) {
    console.error('Error saving timers:', e);
  }
};

export const loadTimers = async () => {
  try {
    const timers = await AsyncStorage.getItem('timers');
    return timers ? JSON.parse(timers) : [];
  } catch (e) {
    console.error('Error loading timers:', e);
    return [];
  }
};

export const saveHistory = async timer => {
  try {
    const history = await loadHistory();
    history.push(timer);
    await AsyncStorage.setItem('history', JSON.stringify(history));
  } catch (e) {
    console.error('Error saving history:', e);
  }
};

export const loadHistory = async () => {
  try {
    const history = await AsyncStorage.getItem('history');
    return history ? JSON.parse(history) : [];
  } catch (e) {
    console.error('Error loading history:', e);
    return [];
  }
};

import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput, Card, Portal, Modal, Text } from 'react-native-paper';
import {ProgressChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInput from '../component/CustomTextInput';
import {saveTimers, loadTimers, saveHistory} from '../utils/storage';

const HomeScreen = () => {
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); // For success modal
  const [completedTimer, setCompletedTimer] = useState(null);

  useEffect(() => {
    loadTimers().then(setTimers);
  }, []);

 const saveTimer = async () => {
   if (!name || duration <= 0 || !category) {
     alert('Please fill all fields with valid values.');
     return;
   }
   const newTimer = {
     id: Date.now(),
     name,
     duration,
     category,
     remaining: duration,
     status: 'paused',
   };
   const updatedTimers = [...timers, newTimer];
   setTimers(updatedTimers);
   await saveTimers(updatedTimers);
   setName('');
   setDuration(0);
   setCategory('');
   setSuccessModalVisible(true); // Show success modal
 };

  const updateTimerStatus = (id, status, remaining = null) => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id
          ? {...timer, status, remaining: remaining ?? timer.remaining}
          : timer,
      ),
    );
  };

  const startTimer = id => {
    updateTimerStatus(id, 'running');
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          if (
            timer.id === id &&
            timer.status === 'running' &&
            timer.remaining > 0
          ) {
            const newRemaining = timer.remaining - 1;
            if (newRemaining === 0) {
              clearInterval(interval);
              setCompletedTimer(timer);
              setModalVisible(true);
              saveHistory({...timer, completionTime: Date.now()});
              return {...timer, remaining: 0, status: 'completed'};
            }
            return {...timer, remaining: newRemaining};
          }
          return timer;
        }),
      );
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <CustomTextInput
          label="Name"
          value={name}
          onChangeText={setName}
          iconName="timer"
        />

        <CustomTextInput
          label="Duration (seconds)"
          value={duration.toString()}
          onChangeText={text => {
            const number = Number(text);
            if (!isNaN(number) && number > 0) {
              setDuration(number);
            } else {
              setDuration(0);
            }
          }}
          iconName="clock"
          keyboardType="numeric"
        />
        <CustomTextInput
          label="Category"
          value={category}
          onChangeText={setCategory}
          iconName="folder"
        />
        <Button mode="contained" onPress={saveTimer} style={styles.addButton}>
          <Icon name="plus" size={20} color="#ffffff" /> Add Timer
        </Button>
      </Card>

      {timers.map(timer => (
        <Card key={timer.id} style={styles.timerCard}>
          <View style={styles.timerHeader}>
            <Icon name="timer" size={20} color="#000" />
            <Text style={styles.timerName}>{timer.name}</Text>
          </View>
          <Text style={styles.timerText}>Remaining: {timer.remaining}s</Text>
          <Text style={styles.timerText}>Status: {timer.status}</Text>
          <Text style={styles.timerText}>Category: {timer.category}</Text>
          <ProgressChart
            data={[timer.duration > 0 ? timer.remaining / timer.duration : 0]}
            width={375}
            height={100}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
            }}
            hideLegend
          />
          <View style={styles.buttons}>
            <Button mode="contained" onPress={() => startTimer(timer.id)}>
              <Icon name="play" size={20} color="#fff" />
            </Button>
            <Button
              mode="contained"
              onPress={() => updateTimerStatus(timer.id, 'paused')}>
              <Icon name="pause" size={20} color="#fff" />
            </Button>
            <Button
              mode="contained"
              onPress={() =>
                updateTimerStatus(timer.id, 'paused', timer.duration)
              }>
              <Icon name="refresh" size={20} color="#fff" />
            </Button>
          </View>
        </Card>
      ))}

      <Portal>
        <Modal
          visible={successModalVisible}
          onDismiss={() => setSuccessModalVisible(false)}
          contentContainerStyle={styles.modalContainer}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalText}>Timer added successfully!</Text>
            <Button
              mode="contained"
              onPress={() => setSuccessModalVisible(false)}>
              OK
            </Button>
          </Card>
        </Modal>
      </Portal>

      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalText}>
              Congratulations! Timer "{completedTimer?.name}" has completed.
            </Text>
            <Button mode="contained" onPress={() => setModalVisible(false)}>
              Close
            </Button>
          </Card>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16 , backgroundColor: '#fff'},
  card: {padding: 16, marginBottom: 16},
  addButton: {marginTop: 16},
  timerCard: {padding: 16, marginBottom: 8},
  timerHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  timerName: {fontSize: 18, fontWeight: 'bold', marginLeft: 8},
  timerText: {fontSize: 18, marginBottom: 4 , fontWeight: '500',margin: 0},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalCard: {padding: 16, margin: 16},
  modalText: {fontSize: 16, marginBottom: 16},
});

export default HomeScreen;

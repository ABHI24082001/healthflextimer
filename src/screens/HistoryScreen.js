import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {loadHistory} from '../utils/storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const savedHistory = await loadHistory();
      setHistory(savedHistory);
    };
    fetchHistory();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {history.map((item, index) => (
        <Card key={index} style={styles.card} elevation={3}>
          <View style={styles.historyItem}>
            <Icon name="timer" size={24} color="#6200ee" />
            <View style={styles.historyText}>
              <Text style={styles.historyName}>{item.name}</Text>
              <Text style={styles.historyTime}>
                Completed at: {new Date(item.completionTime).toLocaleString()}
              </Text>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light gray background
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8, // Rounded corners
    backgroundColor: '#ffffff', // White card background
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyText: {
    marginLeft: 12,
    flex: 1,
  },
  historyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Dark text for better readability
  },
  historyTime: {
    fontSize: 14,
    color: '#666', // Gray text for secondary information
  },
});

export default HistoryScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherCard from '../component/WeatherCard';
const API_KEY = 'e7a67d3a255aba9408f20e889a23ddb0';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  

  useEffect(() => {
    loadHistory();
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName) return alert('Please enter a city name');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      const data = response.data;
      console.log(response.data);
     
      setWeather({
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
      saveToHistory(data.name);
     
    } catch (error) {
      alert('City not found. Please try again.');
    }
  };

  const saveToHistory = async (cityName) => {
    let updatedHistory = [cityName, ...history.filter((c) => c !== cityName)];
    updatedHistory = updatedHistory.slice(0, 5);
    setHistory(updatedHistory);
    await AsyncStorage.setItem('weatherHistory', JSON.stringify(updatedHistory));
  };

  




  const loadHistory = async () => {
    const savedHistory = await AsyncStorage.getItem('weatherHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App 🌤️</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor={'#000'}
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={() => fetchWeather(city)} />

      {weather && <WeatherCard weather={weather} />}

      <Text style={styles.historyTitle}>Search History</Text>
      <ScrollView>
        {history.map((city, index) => (
          <TouchableOpacity key={index} onPress={() => fetchWeather(city)}>
            <Text style={styles.historyItem}>🔍 {city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 , color: '#000' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5  ,  color: '#000'},
  historyTitle: { fontSize: 18, marginTop: 20, fontWeight: 'bold',  color: '#000' },
  historyItem: { fontSize: 16, padding: 5, color: 'blue'  ,  color: '#000'},
});

export default WeatherApp;

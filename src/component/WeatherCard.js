import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherCard = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Image source={{uri: weather.icon}} style={styles.icon} />
      <Text style={styles.temp}>{weather.temp}°C</Text>
      <Text style={styles.temp}>{weather.description}</Text>
      <Text style={styles.temp}>Humidity: {weather.humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginTop: 20, padding: 20, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center' },
  city: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  icon: { width: 50, height: 50  , color: '#000' },
  temp: { fontSize: 18, fontWeight: 'bold' , color: '#000' },
});

export default WeatherCard;

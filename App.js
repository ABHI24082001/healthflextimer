import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PaperProvider, MD3LightTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
   primary: '#4CAF50',
    background: '#ffffff',
    text: '#000000',
  },
};

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'History') {
                iconName = 'history';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Home" component={HomeScreen}  />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTextInput = ({label, value, onChangeText, iconName}) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={24} color="#000" style={styles.icon} />
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
});

export default CustomTextInput;

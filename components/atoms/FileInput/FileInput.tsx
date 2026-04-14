import React from 'react';
import { View, Text } from 'react-native';
import { fileInputStyles as styles } from './styles';
import { FileInputProps } from './types';

export const FileInput = (props: FileInputProps) => {
  return (
    <View style={styles.container}>
      <Text>FileInput</Text>
    </View>
  );
};

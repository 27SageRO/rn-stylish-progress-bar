import React, { useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import StylishProgressBar from 'rn-stylish-progress-bar';

export default function App() {
  const [min, setMin] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setMin(Math.floor(Math.random() * 11))}>
        <Text>Trigger</Text>
      </TouchableOpacity>
      <StylishProgressBar min={min} max={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 32,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

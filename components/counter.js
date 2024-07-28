import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(1));

  const increment = () => {
    setCount(prevCount => prevCount + 1);
    bounce();
  };
  
  const decrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, 0));
    bounce();
  };
  
  const reset = () => {
    setCount(0);
    bounce();
  };

  const bounce = () => {
    setBounceValue(new Animated.Value(1));
    Animated.spring(bounceValue, {
      toValue: 1.5,
      friction: 2,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.counterText, { transform: [{ scale: bounceValue }] }]}>
        {count}
      </Animated.Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.incrementButton]} onPress={increment}>
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.decrementButton]} onPress={decrement}>
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 100,
  },
  counterText: {
    fontSize: 80,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '150%',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  incrementButton: {
    backgroundColor: '#4CAF50',
  },
  decrementButton: {
    backgroundColor: '#FF5722',
  },
  resetButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Counter;

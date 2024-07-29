import React, { useEffect } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install expo-vector-icons if not already done

const { width } = Dimensions.get('window');

const Toast = ({ message, isVisible, onHide, type = 'success' }) => {
  const translateY = new Animated.Value(-100);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#4caf50', icon: 'check-circle' };
      case 'error':
        return { backgroundColor: '#f44336', icon: 'error' };
      case 'warning':
        return { backgroundColor: '#ff9800', icon: 'warning' };
      default:
        return { backgroundColor: '#2196f3', icon: 'info' };
    }
  };

  const { backgroundColor, icon } = getToastStyle();

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          transform: [{ translateY }],
          opacity,
          backgroundColor 
        }
      ]}
    >
      <View style={styles.content}>
        <MaterialIcons name={icon} size={24} color="white" style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40, 
    left: 20,
    right: 20,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});

export default Toast;
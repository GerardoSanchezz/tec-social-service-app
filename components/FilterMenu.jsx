import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FilterMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View className = "flex flex-row items-center space-x-4 w-full h-16 px-1 bg-transparent rounded-2xl">
      <TouchableOpacity 
        className="flex flex-row items-center justify-center h-10 bg-[#1A1A1A] rounded-xl border-2 border-[#333333]"
        onPress={toggleMenu}
      >
        <Text style={styles.buttonText}>Filtrar oferta</Text>
      </TouchableOpacity>
      {isMenuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Item 1</Text>
          <Text style={styles.menuItem}>Item 2</Text>
          <Text style={styles.menuItem}>Item 3</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40, // 16 units * 4 (16 is the given height)
    paddingHorizontal: 16, // 4 units * 4 (16 is the given padding)
    backgroundColor: '#1A1A1A', // Assuming black-100
    borderRadius: 20, // 2xl
    borderWidth: 2,
    borderColor: '#333333', // Assuming black-200
  },
  buttonText: {
    color: '#FFFFFF',
  },
  menu: {
    position: 'absolute',
    top: 200, // Adjust based on your design needs
    width: '100%',
    backgroundColor: '#1A1A1A', // Assuming same color as button for consistency
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#333333',
  },
  menuItem: {
    color: '#FFFFFF',
    paddingVertical: 8,
  },
});

export default FilterMenu;

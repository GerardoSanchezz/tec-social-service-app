import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Text, Modal, StyleSheet } from "react-native";
import { BlurView } from 'expo-blur';
import { icons } from "../constants";

const SearchInput = ({ initialQuery, onSearch, filterCriteria, onFilterChange }) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filterCriteria[0]);

  const handleSearch = () => {
    onSearch(query || null, selectedFilter);
  };

  const handleChangeText = (text) => {
    setQuery(text);
    onSearch(text, selectedFilter);
  };

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
    setDropdownVisible(false);
  };

  const getPlaceholderText = () => {
    const placeholders = {
      "NOMBRE DEL PROYECTO": "Buscar oferta por nombre",
      "MODALIDAD": "Buscar por modalidad",
      "CARRERAS PREFERENCIALES": "Buscar por carrera",
      "HORAS MÁXIMAS A ACREDITAR": "Buscar por horas a acreditar",
      "HORARIO": "Buscar por horario",
      "CUPO DE ESTUDIANTES": "Buscar por lugares restantes",
    };
    return placeholders[selectedFilter] || "Busca una oferta";
  };

  return (
    <>
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={query}
          placeholder={getPlaceholderText()}
          placeholderTextColor="#CDCDE0"
          onChangeText={handleChangeText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
          <Image
            source={icons.rightArrow}
            className="w-5 h-5"
            resizeMode="contain"
            style={{ transform: [{ rotate: isDropdownVisible ? '90deg' : '0deg' }] }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.6)"
        />
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            {filterCriteria.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleFilterChange(filter)}
                style={[
                  styles.filterItem,
                  selectedFilter === filter && styles.selectedFilterItem
                ]}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedFilterItem: {
    backgroundColor: '#F0F0F0',
  },
  filterText: {
    fontSize: 16,
    color: 'black',
  },
  selectedFilterText: {
    fontWeight: 'bold',
  },
});

export default SearchInput;
import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Text } from "react-native";
import Modal from 'react-native-modal';
import { icons } from "../constants";


const SearchInput = ({ initialQuery, onSearch, filterCriteria, onFilterChange }) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filterCriteria[0]);

  
  const handleSearch = () => {
    if (query === "") {
      onSearch(null, selectedFilter); 
    } else {
      onSearch(query, selectedFilter);
    }
  };

  const handleChangeText = (text) => {
    setQuery(text);
    onSearch(text); // Trigger search on text change
  };

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
    setDropdownVisible(false);
  };

  const getPlaceholderText = () => {
    switch (selectedFilter) {
      case "NOMBRE DEL PROYECTO":
        return "Buscar oferta por nombre";
      case "MODALIDAD":
        return "Buscar por modalidad";
      case "CARRERAS PREFERENCIALES":
        return "Buscar por carrera";
      case "HORAS MÁXIMAS A ACREDITAR":
        return "Buscar por horas a acreditar";
      case "HORARIO":
        return "Buscar por horario";
      case "CUPO DE ESTUDIANTES":
        return "Buscar por lugares restantes";
      default:
        return "Busca una oferta";
    }
  };

  return (
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
        <Image source={icons.rightArrow} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
      <Modal isVisible={isDropdownVisible} onBackdropPress={() => setDropdownVisible(false)}>
        <View className="bg-white rounded-xl p-4">
          {filterCriteria.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleFilterChange(filter)}
                className="py-2"
              >
                <Text className={selectedFilter === filter ? "font-bold" : ""}>{filter}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </Modal>
    </View>
  );
};

export default SearchInput;

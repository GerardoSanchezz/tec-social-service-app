import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

const OffersCard = ({ 
  nombreProyecto, 
  modalidad, 
  carrerasPreferenciales, 
  horasMaximas, 
  horario, 
  contacto, 
  cupo 
}) => {
  return (
    <View className="relative flex flex-col items-center justify-center px-4 mb-14 border border-gray-300 rounded-lg p-4 bg-gray-900">
       <View style={styles.deleteButtonWrapper}>
        <LinearGradient
          colors={['#ffffff', '#e0f7fa']} 
          style={styles.gradientButtonDelete}
        >
          <TouchableOpacity style={styles.buttonDelete}>
            <Entypo name="circle-with-minus" size={24} color="black" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.buttonWrapper}>
        <LinearGradient
          colors={['#ffffff', '#e0f7fa']} 
          style={styles.gradientButtonSave}
        >
          <TouchableOpacity style={styles.buttonSave}>
          <Entypo name="bookmark" size={24} color="black" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View className="flex flex-col items-center mt-12">
        <Text className="font-semibold text-lg text-white text-center" numberOfLines={1}>
          {nombreProyecto}
        </Text>

        <View className="w-full flex flex-col items-center mt-3 space-y-2">
          <Text className="text-sm text-white text-center">
            <Text className="font-bold">Modalidad:</Text> {modalidad}
          </Text>
          <Text className="text-sm text-white text-center">
            <Text className="font-bold">Carreras Preferenciales:</Text> {carrerasPreferenciales}
          </Text>
          <Text className="text-sm text-white text-center">
            <Text className="font-bold">Horas Máximas a Acreditar:</Text> {horasMaximas}
          </Text>
          <Text className="text-sm text-white text-center">
            <Text className="font-bold">Horario:</Text> {horario}
          </Text>
          <Text className="text-sm text-white text-center">
            <Text className="font-bold">Contacto:</Text> {contacto}
          </Text>
          <Text className="text-sm text-white text-center">
            <Text className="font-bold">Cupo:</Text> {cupo}
          </Text>
        </View>
        
        <LinearGradient
          colors={['#ffffff', '#e0f7fa']} 
          style={styles.gradientButtonComplete}
        >
          <TouchableOpacity style={styles.buttonComplete}>
            <Text style={styles.buttonText}>Ver Oferta Completa 🧐</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButtonWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  gradientButtonDelete: {
    borderRadius: 50,
    padding: 5,
  },
  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1, 
  },
  gradientButtonSave: {
    borderRadius: 50,
    padding: 5,
  },
  buttonSave: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientButtonComplete: {
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
    width: '100%',
  },
  buttonComplete: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default OffersCard;

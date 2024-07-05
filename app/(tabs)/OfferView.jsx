
 // OfferDetails.js
 import React from 'react';
 import { View, Text } from 'react-native';
 
const OfferView = ( {
  nombreProyecto,
  modalidad,
  carrerasPreferenciales,
  horasMaximas,
  horario,
  contacto,
  cupo,
} ) => {
   return (
     <View className="p-4 bg-gray-900 h-full">
      <Text className="font-semibold text-lg text-white mb-2">{nombreProyecto}</Text>
      <Text className="text-sm text-white mb-2"><Text className="font-bold">Modalidad:</Text> {modalidad}</Text>
      <Text className="text-sm text-white mb-2"><Text className="font-bold">Carreras Preferenciales:</Text> {carrerasPreferenciales}</Text>
      <Text className="text-sm text-white mb-2"><Text className="font-bold">Horas Máximas a Acreditar:</Text> {horasMaximas}</Text>
      <Text className="text-sm text-white mb-2"><Text className="font-bold">Horario:</Text> {horario}</Text>
      <Text className="text-sm text-white mb-2"><Text className="font-bold">Contacto:</Text> {contacto}</Text>
      <Text className="text-sm text-white mb-2"><Text className="font-bold">Cupo:</Text> {cupo}</Text>
     </View>
   );
 };
 
 export default OfferView;

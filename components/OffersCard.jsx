import { View, Text } from "react-native";

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
    <View className="flex flex-col items-center px-4 mb-14 border border-gray-300 rounded-lg p-4 bg-gray-900">
      <View className="w-full flex items-center">
        <Text className="font-semibold text-lg text-white" numberOfLines={1}>
          {nombreProyecto}
        </Text>
      </View>

      <View className="w-full flex flex-col items-center mt-3 space-y-2">
        <Text className="text-sm text-white">Modalidad: {modalidad}</Text>
        <Text className="text-sm text-white">
          Carreras Preferenciales: {carrerasPreferenciales}
        </Text>
        <Text className="text-sm text-white">Horas Máximas a Acreditar: {horasMaximas}</Text>
        <Text className="text-sm text-white">Horario: {horario}</Text>
        <Text className="text-sm text-white">Contacto: {contacto}</Text>
        <Text className="text-sm text-white">Cupo: {cupo}</Text>
      </View>
    </View>
  );
};

export default OffersCard;

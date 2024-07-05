import { View, Text, Button } from "react-native";

const OffersCard = ({ 
  nombreProyecto, 
  modalidad, 
  carrerasPreferenciales, 
  horasMaximas, 
  horario, 
  contacto, 
  cupo 
}) => {
  const handleViewOffer = () => {
    navigation.navigate('OfferView', { offer });
  };
  return (
    <View className="flex flex-col items-center justify-center px-4 mb-14 border border-gray-300 rounded-lg p-4 bg-gray-900">
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
        <Button title="Ver Detalles" onPress={handleViewOffer} />
      </View>
    </View>
  );
};

export default OffersCard;

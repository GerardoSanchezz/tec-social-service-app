import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, TextInput, TouchableOpacity, Alert} from "react-native";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, SearchInput, OffersCard } from "../../components";

import { icons } from "../../constants";



const Home = () => {
  const { user, data } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [filteredData, setFilteredData] = useState(data);


  console.log("Data in Home component:", data); // Log data to ensure it's being received

  const onRefresh = async () => {
    setUserInput(userInput)
    setRefreshing(true);
    setRefreshing(false);
  };

  const handleSearch = (text) => {
    if(text){
      const filtered = data.filter(item =>
        item["NOMBRE DEL PROYECTO"].toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }else{
      setFilteredData(data);
    }
  };


  const renderItem = ({ item }) => (
    <OffersCard
      nombreProyecto={item["NOMBRE DEL PROYECTO"]}
      modalidad={item["MODALIDAD"]}
      carrerasPreferenciales={item["CARRERAS PREFERENCIALES"]}
      horasMaximas={item["HORAS MÁXIMAS A ACREDITAR"]}
      horario={item["HORARIO"]}
      contacto={item["DATOS DE CONTACTO CON LA OSF"]}
      cupo={item["CUPO DE ESTUDIANTES"]}
    />
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bienvenido de vuelta
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username ?? "Usuario"}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logo}
                  className="w-20 h-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
              <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={userInput}
                placeholder="Busca una oferta"
                placeholderTextColor="#CDCDE0"
                onChangeText={(text) => {setUserInput(text); handleSearch(text)}}
              />
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No hay datos"
            subtitle="No se encontraron proyectos de servicio social"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

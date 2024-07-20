import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, OffersCard, FilterMenu} from "../../components";
import SearchInput from "../../components/SearchInput";

const Home = () => {
  const { user, data } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const onRefresh = async () => {
    setRefreshing(false);
  };

  const handleSearch = useCallback((query) => {
    if (query) {
      const filtered = data.filter(item =>
        item["NOMBRE DEL PROYECTO"].toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data]);

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

            <SearchInput initialQuery="" onSearch={handleSearch} />

              <FilterMenu />
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
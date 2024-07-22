import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, RefreshControl, Text, View } from "react-native";
import Animated, { FadeIn } from 'react-native-reanimated';
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, SearchInput, OffersCard } from "../../components";

const Home = () => {
  const { user, data } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [filterCriteria] = useState(["NOMBRE DEL PROYECTO", "MODALIDAD", "CARRERAS PREFERENCIALES", "HORAS MÁXIMAS A ACREDITAR", "HORARIO", "CUPO DE ESTUDIANTES"]); // Add more criteria as needed
  const [selectedFilter, setSelectedFilter] = useState(filterCriteria[0]);
  

  //console.log("Data in Home component:", data); // Log data to ensure it's being received

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (searchQuery) {
      if (selectedFilter === "CUPO DE ESTUDIANTES") {
        const filtered = data.filter(item => item[selectedFilter] <= parseInt(searchQuery)); // El cupo se busca de menor o igual a la query
        setFilteredData(filtered);
      }else{
        const lowercasedQuery = searchQuery?.toLowerCase();
        const filtered = data.filter(item =>
          item[selectedFilter]?.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredData(filtered);
      }
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data, selectedFilter]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
  };


  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeIn.delay(index * 200)} key={index}>
      <OffersCard
        nombreProyecto={item["NOMBRE DEL PROYECTO"]}
        modalidad={item["MODALIDAD"]}
        carrerasPreferenciales={item["CARRERAS PREFERENCIALES"]}
        horasMaximas={item["HORAS MÁXIMAS A ACREDITAR"]}
        horario={item["HORARIO"]}
        contacto={item["DATOS DE CONTACTO CON LA OSF"]}
        cupo={item["CUPO DE ESTUDIANTES"]}
      />
    </Animated.View>
  );


  return (
    <SafeAreaView className="bg-primary h-full">
      <Animated.FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={ // El fix solo era quitar la funcion de flecha de estos componentes, no entiendo porque pero funciona ahora
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
            <SearchInput initialQuery={searchQuery} onSearch={handleSearch} filterCriteria={filterCriteria} onFilterChange={handleFilterChange} />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="No hay datos"
            subtitle="No se encontraron proyectos de servicio social"
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
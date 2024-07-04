import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

const Home = () => {
  const { user, data } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  console.log("Data in Home component:", data); // Log data to ensure it's being received

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: '#2a2a2a', padding: 16, marginBottom: 16, borderRadius: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{item["NOMBRE DEL PROYECTO"]}</Text>
      <Text style={{ fontSize: 16, color: '#ccc' }}>{item["ORGANIZACIÓN SOCIO FORMADORA"]}</Text>
      <Text style={{ fontSize: 14, color: '#aaa' }}>{item["ODS que atiende"]}</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
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

        <SearchInput />
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

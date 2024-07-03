import { useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, Flatlist } from "react-native";

import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SearchInput } from "../../components";

const Home = () => {
  const { user } = useGlobalContext();
  const { data, setData } = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/data")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const renderItem = ({ item }) => ( 
    <View className="bg-secondary p-4 mb-4 rounded-lg">
      <Text className="text-lg font-psemibold text-white">{item.field1}</Text>
      <Text className="text-md font-pregular text-gray-200">{item.field2}</Text>
      <Text className="text-sm font-plight text-gray-300">{item.field3}</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
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
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>

        <SearchInput />

        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-lg font-pregular text-gray-100 mb-3">
            Ofertas de servicio social
          </Text>
          <Flatlist>
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          </Flatlist>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

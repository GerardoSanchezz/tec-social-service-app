import { useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, FlatList} from "react-native";

import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomButton, SearchInput } from "../../components";

const Home = () => {
  const { user, data } = useGlobalContext();

  // Data fetch is being done in the GlobalProvider, is this the best approach?
  /* Bugs to fix 
    1. Bug in user registration in verification process, if you mess up during input, you wont be able to verify the code,
    as the error message from input validation is shown and doesnt allow you to continue.
    2. For some reason i cant see the components bellow search input.
    3. I think some icons were lost, as some dont load in this page and others idk why.
  */

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
              source={images.logo}
              className="w-20 h-9"
              resizeMode="contain"
            />
          </View>
        </View>

        <SearchInput />
        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-lg font-pregular text-gray-100 mb-3">
            Ofertas de servicio social
          </Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
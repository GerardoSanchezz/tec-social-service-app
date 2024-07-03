import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "react-native";

import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SearchInput } from "../../components";

const Home = () => {
  const { user } = useGlobalContext();

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
          {/* Aquí puedes agregar otros componentes que desees mostrar */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

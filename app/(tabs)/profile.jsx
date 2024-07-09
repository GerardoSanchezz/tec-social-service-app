import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { InfoBox } from "../../components";

const Profile = () => {
  const { user, logout } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity
          onPress={logout} 
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />

        <View className="mt-5 flex flex-row">
          <InfoBox
            title={user?.email}
            subtitle="Correo"
            titleStyles="text-sm"
            containerStyles="mr-17"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

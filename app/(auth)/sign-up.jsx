import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { KeyboardAvoidingView, Platform } from "react-native";

const validateEmail = (email) => { // is adding the RE in code a security risk? /s
  const emailRegex = /\b[A-Za-z0-9._%+-]+@tec\.mx\b/;
  return emailRegex.test(email);
};
const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(form.email)) { // Appwrite checks another time for valid email so were safe
      Alert.alert("Error", "Please enter a valid Tec de Monterrey email address");
      return;
    }

    // We should add a security code implementation so we make sure the tec emails are real emails

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-2"
          style={{
            minHeight: Dimensions.get("window").height - 200,
          }}
        >
          <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{ width:300, height: 160 }}
            />
          </View>

          <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
            Registrarse
          </Text>

          <FormField
            title="Usuario"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Correo electrónico"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Contraseña"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7 mb-3"
          />

          <CustomButton
            title="Continuar"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              ¿Ya tienes una cuenta?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-blue-400"
            >
              Inicia sesión.
            </Link>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

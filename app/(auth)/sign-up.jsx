import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import { useRouter } from "expo-router"; // Cambiar el import de router
import { KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { Link } from "expo-router";
import axios from 'axios'; 
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { authenticateUser } from "../../utils/auth";

const validateEmail = (email) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@tec\.mx\b/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&+\-_.])[A-Za-z\d@$!%*?&+\-_.]{8,}$/;
  return passwordRegex.test(password);
};

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();

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

    if (!validateEmail(form.email)) {
      Alert.alert("Error", "Please enter a valid Tec de Monterrey email address");
      return;
    }

    if (!validatePassword(form.password)) {
      Alert.alert("Error", "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3000/api/users/create', {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      if (response.status === 201) {
        const authSuccess = await authenticateUser(form.email, form.password);
        if (authSuccess) {
          router.replace({
            pathname: "/email-verification",
            params: { email: form.email, username: form.username, password: form.password }
          });
        }
      }
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
              paddingBottom: 200
            }}
          >
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{ width: 300, height: 160 }}
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

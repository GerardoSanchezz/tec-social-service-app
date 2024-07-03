import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import emailjs from "@emailjs/browser";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appwrite";

export default function EmailVerification() {
  const route = useRoute(); 
  const halfScreen = Math.round(Dimensions.get("window").height / 1.3);
  const { setUser, setIsLogged } = useGlobalContext();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user_email = route.params?.email;
  const username = route.params?.username;
  const password = route.params?.password;

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendEmailVerification = async () => {
    const code = generateCode();
    setCode(code);
    console.log("Generated code: ", code);

    if (!user_email) {
      console.error("User email is not defined");
      setErrorMessage(true);
      return;
    }

    const templateParams = {
      code: code,
      user_email: user_email,
      username: username,
    };

    console.log("templateParams: ", templateParams);

    emailjs
      .send(
        'service_ny64dvk', 
        'template_74j2emi', 
        templateParams,
        'jTJJdAxA1EOGSP9JZ',
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSuccessMessage(true);
        },
        (err) => {
          console.log('FAILED...', err);
          setErrorMessage(true);
        },
      );
  };
  
  useEffect(() => {
      sendEmailVerification();
  }, []);

  const validateCode = async () => {
    setIsLoading(true);
    if (inputCode == code) {
      try {
        const result = await createUser(user_email, password, username);
        setUser(result);
        setIsLogged(true);
        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false); 
      }
    } else {
      Alert.alert("Error", "The input code does not match the generated code");
      setIsLoading(false);
    }
  };
      
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      className="bg-transparent"
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ height: halfScreen }}
        className="bg-transparent"
      ></TouchableOpacity>

      <View
        style={{
          height: halfScreen,
          width: "100%",
          backgroundColor: "#161622",
          justifyContent: "start",
          borderTopRadius: 40,
        }}
        className="rounded-2xl py-6"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-3 top-3 left-1 bg-transparent"
        >
          <Icon.ArrowLeft
            strokeWidth={2.5}
            stroke="white"
            width={25}
            height={25}
          />
        </TouchableOpacity>
        <Text className="font-bold text-2xl self-center mt-14 text-white">
          Autenticación de dos factores
        </Text>

        <Text className="text-base text-center mt-2 w-5/6 mx-auto text-white">
          Introduzca el código de 6 dígitos enviado a su correo electrónico
        </Text>
        <TextInput
          placeholder="Código"
          style={{
            backgroundColor: "#F3F3F3",
            width: "80%",
            height: 50,
            borderRadius: 10,
            marginTop: 20,
            alignSelf: "center",
            textAlign: "center",
            fontSize: 30,
          }}
          keyboardType="numeric"
          maxLength={6}
          minLength={6}
          onChangeText={(text) => {
            setInputCode(text);
          }}
        />
        <TouchableOpacity
          onPress={validateCode}
          style={{
            backgroundColor: "#D70040",
            width: "80%",
            height: 50,
            borderRadius: 10,
            marginTop: 20,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="text-white text-center text-base">Validar</Text>
          )}
        </TouchableOpacity>

        <Text
          className="text-blue-500 text-center mt-4"
          onPress={() => {
            sendEmailVerification();
          }}
        >
          Reenviar código
        </Text>
      </View>
    </View>
  );
}

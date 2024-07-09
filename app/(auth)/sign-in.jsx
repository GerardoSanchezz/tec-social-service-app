import React, { useState } from "react";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { authenticateUser } from "../../utils/auth";

const SignIn = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        setSubmitting(true);

        try {
            const { success, user, error } = await authenticateUser(form.email, form.password);
            console.log("Success:", success, "User:", user, "Error:", error);
            if (success) {
                setUser(user); 
                setIsLogged(true);
                router.replace("/home");
            } else {
                Alert.alert("Error", error || "Credenciales inválidas");
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
                        className="w-full flex justify-center h-full px-4 my-4"
                        style={{
                            minHeight: Dimensions.get("window").height - 200,
                            paddingBottom: 200
                        }}
                    >
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
                            <Image
                                source={images.logo}
                                resizeMode="contain"
                                style={{ width:300, height: 160 }}
                            />
                        </View>

                        <Text className="text-2xl font-semibold text-white mt-2 font-psemibold">
                            Ingresa con tu cuenta.
                        </Text>

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
                            otherStyles="mt-7"
                        />

                        <CustomButton
                            title="Ingresar"
                            handlePress={submit}
                            containerStyles="mt-7"
                            isLoading={isSubmitting}
                        />

                        <View className="flex justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-100 font-pregular">
                                ¿No tienes una cuenta? 
                            </Text>
                            <Link
                                href="/sign-up"
                                className="text-lg font-psemibold text-blue-400"
                            >
                                Regístrate.
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignIn;

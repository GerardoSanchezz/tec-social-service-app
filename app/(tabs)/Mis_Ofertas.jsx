import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, RefreshControl, Text, View } from "react-native";
import Animated, { FadeIn } from 'react-native-reanimated';
import axios from 'axios';
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, OffersCard } from "../../components";
import { images } from "../../constants";

const Mis_Ofertas = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [favoriteOffers, setFavoriteOffers] = useState([]);
  const [filteredData, setFilteredData] = useState(favoriteOffers);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFavoriteOffers();
    setRefreshing(false);
  };

  const fetchFavoriteOffers = async () => {
    try {
      const response = await axios.get(`http://192.168.100.15:3000/api/users/favorite/${user?.id}`);
      if (response.data.success) {
        setFavoriteOffers(response.data.favoriteOffers);
        setFilteredData(response.data.favoriteOffers);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching favorite offers:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchFavoriteOffers();
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      const intervalId = setInterval(() => {
        fetchFavoriteOffers();
      }, 10000);

      return () => clearInterval(intervalId); 
    }
  }, [user]);

  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeIn.delay(index * 200)} key={index}>
      <OffersCard
        _id={item["_id"]}
        nombreProyecto={item["NOMBRE DEL PROYECTO"]}
        modalidad={item["MODALIDAD"]}
        carrerasPreferenciales={item["CARRERAS PREFERENCIALES"]}
        horasMaximas={item["HORAS MÁXIMAS A ACREDITAR"]}
        horario={item["HORARIO"]}
        contacto={item["DATOS DE CONTACTO CON LA OSF"]}
        cupo={item["CUPO DE ESTUDIANTES"]}
        clave={item["CLAVE"]}
        crn={item["CRN"]}
        grupo={item["GRUPO"]}
        organizacion={item["ORGANIZACIÓN SOCIO FORMADORA"]}
        ods={item["ODS que atiende"]}
        direccion={item["DIRECCIÓN / UBICACIÓN"]}
        rutaDesdeTec={item["RUTA DESDE EL TEC"]}
        kmDistancia={item["KM de distancia desde el TEC"]}
        tipoHorario={item["Tipo de horarios"]}
        poblacion={item["POBLACIÓN QUE SE ATIENDE"]}
        actividades={item["ACTIVIDADES A REALIZAR"]}
        entregable={item["ENTREGABLE"]}
        notas={item["NOTAS IMPORTANTES"]}
        linkWeb={item["Link de sitio web de la OSF"]}
        objetivo={item["Objetivo del Proyecto Solidario (El objetivo es el cambio deseado que se quiere lograr con el proyecto solidario respecto al problema identificado)"]}
        habilidades={item["Habilidades o competencias que el alumno requiere para participar en el proyecto: "]}
        userId={user?.id}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <Animated.FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ListHeaderComponent={
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Mis Ofertas 
                </Text>
                <Text className="font-pmedium text-base text-gray-300 mt-2">
            {favoriteOffers.length} ofertas guardadas
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

export default Mis_Ofertas;

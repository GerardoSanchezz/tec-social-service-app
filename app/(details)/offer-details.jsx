import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OfferDetails = () => {
  const route = useRoute();
  const { params } = route;

  if (!params) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No se recibieron parámetros.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full p-3" >
      <ScrollView >
        <Text style={styles.title}>Detalles de la Oferta</Text>
        <Text style={styles.label}>Nombre del Proyecto:</Text>
        <Text style={styles.text}>{params.nombreProyecto}</Text>

        <Text style={styles.label}>Modalidad:</Text>
        <Text style={styles.text}>{params.modalidad}</Text>

        <Text style={styles.label}>Carreras Preferenciales:</Text>
        <Text style={styles.text}>{params.carrerasPreferenciales}</Text>

        <Text style={styles.label}>Horas Máximas a Acreditar:</Text>
        <Text style={styles.text}>{params.horasMaximas}</Text>

        <Text style={styles.label}>Horario:</Text>
        <Text style={styles.text}>{params.horario}</Text>

        <Text style={styles.label}>Contacto:</Text>
        <Text style={styles.text}>{params.contacto}</Text>

        <Text style={styles.label}>Cupo:</Text>
        <Text style={styles.text}>{params.cupo}</Text>

        <Text style={styles.label}>Clave:</Text>
        <Text style={styles.text}>{params.clave}</Text>

        <Text style={styles.label}>CRN:</Text>
        <Text style={styles.text}>{params.crn}</Text>

        <Text style={styles.label}>Grupo:</Text>
        <Text style={styles.text}>{params.grupo}</Text>

        <Text style={styles.label}>Organización:</Text>
        <Text style={styles.text}>{params.organizacion}</Text>

        <Text style={styles.label}>ODS:</Text>
        <Text style={styles.text}>{params.ods}</Text>

        <Text style={styles.label}>Dirección / Ubicación:</Text>
        <Text style={styles.text}>{params.direccion}</Text>

        <Text style={styles.label}>Ruta Desde el TEC:</Text>
        <Text style={styles.text}>{params.rutaDesdeTec}</Text>

        <Text style={styles.label}>KM de Distancia Desde el TEC:</Text>
        <Text style={styles.text}>{params.kmDistancia}</Text>

        <Text style={styles.label}>Tipo de Horarios:</Text>
        <Text style={styles.text}>{params.tipoHorario}</Text>

        <Text style={styles.label}>Población que se Atiende:</Text>
        <Text style={styles.text}>{params.poblacion}</Text>

        <Text style={styles.label}>Actividades a Realizar:</Text>
        <Text style={styles.text}>{params.actividades}</Text>

        <Text style={styles.label}>Entregable:</Text>
        <Text style={styles.text}>{params.entregable}</Text>

        <Text style={styles.label}>Notas Importantes:</Text>
        <Text style={styles.text}>{params.notas}</Text>

        <Text style={styles.label}>Link de Sitio Web:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(params.linkWeb)}>
            <Text style={[styles.text, { color: '#B2CAFC' }]}>{params.linkWeb}</Text>
          </TouchableOpacity>

        <Text style={styles.label}>Objetivo del Proyecto Solidario:</Text>
        <Text style={styles.text}>{params.objetivo}</Text>

        <Text style={styles.label}>Habilidades o Competencias Requeridas:</Text>
        <Text style={styles.text}>{params.habilidades}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: "#fff",
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 8,
    color: "#fff"
    
  },
  text: {
    fontSize: 19,
    marginBottom: 16,
    color: "#fff",
  },
});

export default OfferDetails;

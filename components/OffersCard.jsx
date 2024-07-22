import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const OffersCard = ({
  _id,
  nombreProyecto,
  modalidad,
  carrerasPreferenciales,
  horasMaximas,
  horario,
  contacto,
  cupo,
  clave,
  crn,
  grupo,
  organizacion,
  ods,
  direccion,
  rutaDesdeTec,
  kmDistancia,
  tipoHorario,
  poblacion,
  actividades,
  entregable,
  notas,
  linkWeb,
  objetivo,
  habilidades,
}) => {
  const router = useRouter();
  const scaleValue = new Animated.Value(1);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(() => {
      router.push({
        pathname: '/offer-details',
        params: {
          _id,
          clave,
          crn,
          grupo,
          organizacion,
          nombreProyecto,
          ods,
          horasMaximas,
          carrerasPreferenciales,
          modalidad,
          direccion,
          rutaDesdeTec,
          kmDistancia,
          horario,
          tipoHorario,
          poblacion,
          actividades,
          entregable,
          contacto,
          cupo,
          notas,
          linkWeb,
          objetivo,
          habilidades,
        },
      });
    });
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{nombreProyecto}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Entypo name="bookmark" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Entypo name="circle-with-minus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color="#fff" />
            <Text style={styles.infoText}>{modalidad}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="engineering" size={20} color="#fff" />
            <Text style={styles.infoText} numberOfLines={1}>{carrerasPreferenciales}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={20} color="#fff" />
            <Text style={styles.infoText}>{horasMaximas} horas</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="calendar-alt" size={20} color="#fff" />
            <Text style={styles.infoText}>{horario}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="group" size={20} color="#fff" />
            <Text style={styles.infoText}>Cupo: {cupo}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.detailsButton} onPress={handlePress}>
          <Text style={styles.detailsButtonText}>Ver Oferta Completa</Text>
          <MaterialIcons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  content: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default OffersCard;
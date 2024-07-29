import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OfferDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { params } = route;
  const [expandedSections, setExpandedSections] = useState({});

  if (!params) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No se recibieron parámetros.</Text>
      </SafeAreaView>
    );
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderSection = (label, content, icon) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name={icon} size={24} color="#4A90E2" />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.text}>{content}</Text>
    </View>
  );

  const renderCollapsibleSection = (label, content, icon) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleSection(label)} style={styles.cardHeader}>
        <Icon name={icon} size={24} color="#4A90E2" />
        <Text style={styles.label}>{label}</Text>
        <Icon name={expandedSections[label] ? 'expand-less' : 'expand-more'} size={24} color="#4A90E2" />
      </TouchableOpacity>
      {expandedSections[label] && <Text style={styles.text}>{content}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalles de la Oferta</Text>
        
        {renderSection('Nombre del Proyecto', params.nombreProyecto, 'work')}
        {renderSection('Modalidad', params.modalidad, 'school')}
        {renderSection('Carreras Preferenciales', params.carrerasPreferenciales, 'person')}
        {renderSection('Horas Máximas a Acreditar', params.horasMaximas, 'access-time')}
        {renderSection('Horario', params.horario, 'schedule')}
        {renderSection('Contacto', params.contacto, 'contact-mail')}
        {renderSection('Cupo', params.cupo, 'group')}
        {renderSection('Clave', params.clave, 'vpn-key')}
        {renderSection('CRN', params.crn, 'confirmation-number')}
        {renderSection('Grupo', params.grupo, 'group-work')}
        {renderSection('Organización', params.organizacion, 'business')}
        {renderSection('ODS', params.ods, 'eco')}
        {renderSection('Dirección / Ubicación', params.direccion, 'location-on')}
        {renderSection('Ruta Desde el TEC', params.rutaDesdeTec, 'directions')}
        {renderSection('KM de Distancia Desde el TEC', params.kmDistancia, 'straighten')}
        {renderSection('Tipo de Horarios', params.tipoHorario, 'access-time')}
        {renderSection('Población que se Atiende', params.poblacion, 'people')}
        
        {renderCollapsibleSection('Actividades a Realizar', params.actividades, 'list')}
        {renderCollapsibleSection('Entregable', params.entregable, 'assignment')}
        {renderCollapsibleSection('Notas Importantes', params.notas, 'note')}
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="link" size={24} color="#4A90E2" />
            <Text style={styles.label}>Link de Sitio Web</Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(params.linkWeb)} style={styles.linkButton}>
            <Text style={styles.linkText}>Visitar sitio web</Text>
          </TouchableOpacity>
        </View>
        
        {renderCollapsibleSection('Objetivo del Proyecto Solidario', params.objetivo, 'flag')}
        {renderCollapsibleSection('Habilidades o Competencias Requeridas', params.habilidades, 'build')}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#1E1E2E', // Slightly lighter than the background for contrast
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    borderColor: '#2A2A3A', // Subtle border for definition
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
    color: '#FFFFFF',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: '#E0E0E0', // Lighter color for better readability on dark background
  },
  linkButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4A90E2',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default OfferDetails;
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, logout } = useGlobalContext();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={logout} 
        style={styles.logoutButton}
      >
        <MaterialIcons name="logout" size={24} color="#FF6347" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/borregos-blue.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622', 
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 20,
    marginTop: 10,
    marginRight: 10,
  },
  logoutText: {
    color: '#FF6347',
    marginLeft: 5,
    fontSize: 16,
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 150,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4A90E2',
    overflow: 'hidden',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 20,
  },
});

export default Profile;
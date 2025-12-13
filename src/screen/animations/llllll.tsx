import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, ToastAndroid, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function RegisterScreen({ route }) {
  const { inviteCode: routeInviteCode } = route.params || {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState(routeInviteCode || "");

  const validInviteCodes = ["PNT12345"];

  React.useEffect(() => {
    if (validInviteCodes.includes(inviteCode)) {
      ToastAndroid.show(`You are eligible for $50 reward!`, ToastAndroid.LONG);
    } else {
      ToastAndroid.show(`Invalid referral code: ${inviteCode}`, ToastAndroid.LONG);
    }
  }, [inviteCode]); // Runs when inviteCode is set

  const handleRegister = () => {
    if (validInviteCodes.includes(inviteCode)) {
      ToastAndroid.show("You are eligible for $50 reward!", ToastAndroid.LONG);
    }
    Alert.alert("Registering with: ", { name, email, password, inviteCode });
  };

  const{id} = route.params
  Alert.alert('tttt', id)
  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.titleBox}>
        <Text style={styles.title}>SIGN UP</Text>
      </View>
      <Image source={require("../assets/login.png")} style={styles.image} />
      <TextInput placeholder="Name" placeholderTextColor="#ccc" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" placeholderTextColor="#ccc" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" placeholderTextColor="#ccc" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Invite Code" placeholderTextColor="#ccc" style={styles.input} value={inviteCode} onChangeText={setInviteCode} editable={!routeInviteCode} />
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titleBox: {
    width: '90%',
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  image: {
    width: "90%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
    fontSize: 16,
  },
  loginButton: {
    width: "90%",
    backgroundColor: "#ff7eb3",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 50,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
})










import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  StatusBar,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SendHorizonal} from 'lucide-react-native';

export default function ReferAndEarn() {
  const inviteCode = 'PNT12345'; // Example invite code
  const shareLink = `https://pntstore.in/refer/RegisterScreen/${inviteCode}`; // Example share link

  // const handleInvite = async () => {
  //   try {
  //     await Share.share({
  //       message: `${shareLink}`,
  //     });
  //   } catch (error) {
  //     console.error("Error sharing invite link:", error);
  //   }
  // }

  // const handleInvite = async () => {
  //   try {
  //     await Share.share({
  //       message: `${shareLink}`,
  //     });
  //   } catch (error) {
  //     console.log('error sharing invite link:', error);
  //   }
  // };

    const handleInvite = async () => {
    try {
      const inviteCode = '12345';
      const link = `https://pntstore.in/register/${inviteCode}`;

      await Share.share({
        message: `Join using my invite: ${link}`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.titleBox}>
        <Text style={styles.title}>REFER & EARN</Text>
      </View>

      <Image
        source={require('../assets/refer-earn.png')}
        style={styles.image}
      />

      <View style={styles.inviteBox}>
        <Text style={styles.inviteTitle}>Referral Code</Text>
        <Text style={styles.inviteCode}>{inviteCode}</Text>
      </View>

      <Text style={styles.subtitle}>
        Invite your friends and earn rewards when they sign up!
      </Text>

      <TouchableOpacity style={styles.inviteButton} onPress={handleInvite}>
        <Text style={styles.inviteButtonText}>Invite Now</Text>
        <SendHorizonal size={20} color="#fff" style={{marginLeft: 5}} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleBox: {
    backgroundColor: '#FFD700',
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inviteBox: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'white',
  },
  inviteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  inviteCode: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  inviteButton: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#ff7eb3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

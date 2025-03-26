import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth, Auth } from "../Auth.native";
import { COLORS } from "@/config/variables";

export default function LoginScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to home
  React.useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PLM</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>
      <View style={styles.authContainer}>
        <Auth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FFFFFF"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: "#FFFFFF"
  },
  authContainer: {
    marginTop: 20,
  }
}); 
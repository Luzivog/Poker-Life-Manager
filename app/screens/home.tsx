import React from "react";
import { Text, View, Button } from "react-native";
import { Auth, useAuth } from "../Auth.native";

export default function HomeScreen() {
  const { user, loading, signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
      }}
    >
      {loading || !user ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>Welcome, {user.email || 'User'}!</Text>
          <Button title="Log Out" onPress={signOut} />
        </>
      )}
    </View>
  );
}

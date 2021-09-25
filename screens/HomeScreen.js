import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import { IconButton } from "../components";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Button from "../components/Button";
import * as LocalAuthentication from "expo-local-authentication";

const auth = Firebase.auth();

export default function HomeScreen({ route, navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const [passedBio, setPassedBio] = useState(undefined);

  useEffect(() => {
    if (passedBio) return;

    LocalAuthentication.authenticateAsync().then((state) => {
      if (state.success) setPassedBio(true);
    });
  });

  const onTryAgain = useCallback(async () => {
    const state = await LocalAuthentication.authenticateAsync();
    if (state.success) {
      setPassedBio(true);
    }
  });

  return passedBio ? (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email}!</Text>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <Button
        title="Radar"
        onPress={() => navigation.navigate("ViewScreens", { screen: "Radar" })}
        containerStyle={{ marginBottom: 8 }}
      />
      <Button
        title="Matrix"
        onPress={() => navigation.navigate("ViewScreens", { screen: "Matrix" })}
        containerStyle={{ marginBottom: 8 }}
      />
      <Button
        title="Calendars"
        onPress={() =>
          navigation.navigate("ViewScreens", { screen: "Calendar" })
        }
        containerStyle={{ marginBottom: 8 }}
      />
      <Button
        title="Global"
        onPress={() => navigation.navigate("ViewScreens", { screen: "Global" })}
        containerStyle={{ marginBottom: 8 }}
      />
      <Button
        title="Overdue"
        onPress={() =>
          navigation.navigate("ViewScreens", { screen: "Overdue" })
        }
        containerStyle={{ marginBottom: 8 }}
      />
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>You must authenticate to use this app.</Text>
      <Button
        title="Try Again"
        containerStyle={{ marginTop: 8 }}
        onPress={onTryAgain}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e3440",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
});

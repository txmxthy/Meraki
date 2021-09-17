import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { IconButton } from "../components";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Button from "../components/Button";

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
  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email}!</Text>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <Text style={styles.text}>Your UID is: {user.uid} </Text>
      <Button 
        title="Radar" 
        onPress={() => navigation.navigate("Views", { screen: 'Radar'})} />
      <Button 
        title="Matrix" 
        onPress={() => navigation.navigate("Views", { screen: 'Matrix'})} />
      <Button 
        title="Calendar" 
        onPress={() => navigation.navigate("Views", { screen: 'Calendar'})} />
      <Button 
        title="Global" 
        onPress={() => navigation.navigate("Views", { screen: 'Global'})} />
      <Button 
        title="Overdue" 
        onPress={() => navigation.navigate("Views", { screen: 'Overdue'})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e93b81",
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

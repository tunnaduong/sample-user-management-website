import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function Logout() {
  await AsyncStorage.setItem("loggedIn", "false");
  await AsyncStorage.setItem("username", "");
  await AsyncStorage.setItem("name", "");
  await AsyncStorage.setItem("role", "");
  window.location.href = "/login";
}

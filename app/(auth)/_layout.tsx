import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="test" />
      <Stack.Screen name="resetpassword" />
      <Stack.Screen name="resetbyemail" />
      <Stack.Screen name="resetbyphone" />
      <Stack.Screen name="newpassword" />
      <Stack.Screen name="Resetcomplete" />
      <Stack.Screen name="register" />
      <Stack.Screen name="verify-otp" />
      <Stack.Screen name="Complete-Registeration" />
    </Stack>
  );
}
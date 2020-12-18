import React from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"

import { NavigationScreen, FeedbackScreen } from "../screens"
import { IndoorStackParamList } from "./types"

const Stack = createNativeStackNavigator<IndoorStackParamList>()

export function IndoorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="indoor-navigation" component={NavigationScreen} />
      <Stack.Screen name="second-screen" component={FeedbackScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["main"]

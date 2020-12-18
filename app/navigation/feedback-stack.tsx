import React from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"

import { FeedbackScreen, FeedbackCompleteScreen } from "../screens"
import { FeedbackStackParamList } from "./types"

const Stack = createNativeStackNavigator<FeedbackStackParamList>()

export function FeedbackStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="feedback" component={FeedbackScreen} />
      <Stack.Screen name="feedback-complete" component={FeedbackCompleteScreen} />
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

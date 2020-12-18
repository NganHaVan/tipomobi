import "./i18n"

import { NavigationContainerRef } from "@react-navigation/native"
import { contains } from "ramda"
import React, { useEffect, useRef, useState } from "react"
import { Platform, View, ViewStyle, YellowBox } from "react-native"
import { ActivityIndicator, Provider as PaperProvider } from "react-native-paper"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"

import { RootStore, RootStoreProvider, setupRootStore } from "./models/root-store"
import { exitRoutes, RootNavigator, setRootNavigation } from "./navigation"
import getActiveRouteName from "./navigation/get-active-routename"
import { useBackButtonHandler } from "./navigation/use-back-button-handler"
import { PaperTheme } from "./theme"
import * as storage from "./utils/storage"
import { ModalProvider } from "./hocs"
import { SnackbarProvider } from "./hocs/SnackbarProvider"
import env from "./config/env"
import steerpathConfig from "./config/steerpath.json"
import { SmartMapManager } from "react-native-steerpath-smart-map"
import RNFS from "react-native-fs"
import SplashScreen from 'react-native-splash-screen'

import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import { FEEDBACK_CHANNEL } from "./utils/notification"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens()

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Require cycle:",
])

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes)

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

export let NOTIFICATION_FEEDBACK_ACTION = false

PushNotification.configure({
  // eslint-disable-next-line
  onNotification: (notification) => {
    NOTIFICATION_FEEDBACK_ACTION = true
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
})

PushNotification.createChannel(
  {
    channelId: FEEDBACK_CHANNEL,
    channelName: "Feedback channel",
  }
)

/**
 * Deep linking configuration
 */
const linking = {
  prefixes: ["tipomobi://"],
  config: {
    navigation: "navigate/:poiId",
  },
}

const initializeMapManager = async () => {
  await RNFS.writeFile(env.CONFIG_FILE_PATH, JSON.stringify(steerpathConfig), "utf8")
  SmartMapManager.startWithConfig({
    apiKey: env.API_KEY,
    // configString: JSON.stringify(steerpathConfig),
    configFilePath: env.CONFIG_FILE_PATH,
  })
}

const FLEX: ViewStyle = { flex: 1, alignItems: "center", justifyContent: "center" }

/**
 * This is the root component of our app.
 */
const App: React.FunctionComponent<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [initialNavigationState, setInitialNavigationState] = useState()
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(true)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)

  /**
   * Keep track of state changes
   * Track Screens
   * Persist State
   */
  const routeNameRef = useRef()
  const onNavigationStateChange = state => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = getActiveRouteName(state)

    if (previousRouteName !== currentRouteName) {
      // track screens.
      // eslint-disable-next-line no-console
      __DEV__ && console.tron.log(currentRouteName)
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName

    // Persist state to storage
    storage.save(NAVIGATION_PERSISTENCE_KEY, state)
  }
  useEffect(() => {
    ;(async () => {
      const rootStore = await setupRootStore()
      setRootStore(rootStore)
      const {
        uiStore: { setSdkLoaded },
      } = rootStore
      setSdkLoaded(false)
      await initializeMapManager()
      setSdkLoaded(true)
      SplashScreen.hide()
    })()
  }, [])

  useEffect(() => {
    const restoreState = async () => {
      try {
        const state = await storage.load(NAVIGATION_PERSISTENCE_KEY)

        if (NOTIFICATION_FEEDBACK_ACTION) {
          state.index = state.routeNames.findIndex(obj => obj === "feedback")
        }

        if (state) {
          setInitialNavigationState(state)
        }
      } finally {
        setIsRestoringNavigationState(false)
      }
    }

    if (isRestoringNavigationState) {
      restoreState()
    }
  }, [isRestoringNavigationState])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  //
  // This step should be completely covered over by the splash screen though.
  //
  // You're welcome to swap in your own component to render if your boot up
  // sequence is too slow though.
  if (!rootStore) {
    return null
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <PaperProvider theme={PaperTheme}>
        <ModalProvider>
          <SnackbarProvider>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <RootNavigator
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
                linking={linking}
                fallback={() => (
                  <View style={FLEX}>
                    <ActivityIndicator size="large" />
                  </View>
                )}
              />
            </SafeAreaProvider>
          </SnackbarProvider>
        </ModalProvider>
      </PaperProvider>
    </RootStoreProvider>
  )
}

export default App

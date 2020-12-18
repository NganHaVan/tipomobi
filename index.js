import "react-native-gesture-handler"

import App from "./app/app"
import { AppRegistry } from "react-native"

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "TipotieNavi"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

let RootComponent = App
if (__DEV__ && SHOW_STORYBOOK) {
  // Only include Storybook if we're in dev mode
  const { StorybookUIRoot } = require("./storybook")
  RootComponent = StorybookUIRoot
}

AppRegistry.registerComponent(APP_NAME, () => RootComponent)

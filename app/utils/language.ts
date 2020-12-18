import env from "../config/env"
import { NativeModules, Platform } from "react-native"

const LOCALE_FI = "fi_FI"

function getLocale(): string {
  if (Platform.OS === "android") {
    return NativeModules.I18nManager.localeIdentifier
  } else {
    return NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
  }
}

export function getAccessibilityStatementLink(): string {
  return getLocale() === LOCALE_FI ? env.URL_ACCESSIBILITY_STATEMENT_FI : env.URL_ACCESSIBILITY_STATEMENT_EN
}

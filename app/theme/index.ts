import { typography as fonts } from "./typography"
import { color as colors } from "./color"
import { DefaultTheme } from "react-native-paper"

export * from "./color"
export * from "./spacing"
export * from "./typography"
export * from "./timing"

export const PaperTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 10,
  colors,
  fonts
}

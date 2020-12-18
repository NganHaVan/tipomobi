import { ViewStyle, TextStyle } from "react-native"
import { color } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  // alignItems: "flex-start",
}

const BASE_TEXT: TextStyle = {
  color: color.palette.white,
  paddingBottom: 2,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A button without extras.
   *
   */
  primary: { ...BASE_VIEW },
  outlined: { ...BASE_VIEW },
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, alignSelf: "center" } as TextStyle,
  outlined: { ...BASE_TEXT, color: color.palette.black },
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets

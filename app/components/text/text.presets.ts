import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  ...typography.regular,
  color: color.text
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE } as TextStyle,

  /**
   * Large headers.
   */
  title: { color: color.text, textTransform: "uppercase" } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 13, color: color.placeholder } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.placeholder } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets | "title" | "caption" | "paragraph" | "subheading"

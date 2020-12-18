import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export type PaletteColors = keyof typeof palette
export const color = {
  palette,
  transparent: "rgba(0,0,0,0)",
  primary: palette.darkWarmRed,
  background: palette.lightBlueGray,
  surface: palette.lightBlueGray,
  accent: palette.mistyBlue,
  error: palette.darkWarmRed,
  text: palette.black,
  onSurface: palette.darkGray,
  onBackground: palette.darkGray,
  disabled: palette.lightGray,
  placeholder: palette.black,
  backdrop: "rgba(0,0,0,0.35)",
  notification: palette.darkGray,
}

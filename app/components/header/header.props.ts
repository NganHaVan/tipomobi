import { ViewStyle, TextStyle } from "react-native"
import { IconTypes } from "../icon/icons"
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon"

export interface HeaderProps {
  /**
   * Main header
   */
  headerTx?: string

  /**
   * header non-i18n
   */
  headerText?: string

  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconTypes | IconSource

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconTypes | IconSource

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: ViewStyle

  /**
   * Title style overrides.
   */
  titleStyle?: TextStyle
}

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { IconButton } from "react-native-paper"

import { translate } from "../../i18n/"
import { spacing } from "../../theme"
import { Text } from "../text/text"
import { HeaderProps } from "./header.props"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  // paddingTop: spacing[5],
  // paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 48 }
const RIGHT: ViewStyle = { width: 48 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = props => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={{ ...ROOT, ...style }}>
      {leftIcon ? (
        <IconButton
          icon={leftIcon}
          onPress={onLeftPress}
          accessibilityLabel={translate("accessibleNames." + leftIcon)}
        />
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text preset="title" style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon ? (
        <IconButton
          icon={rightIcon}
          onPress={onRightPress}
          accessibilityLabel={translate("accessibleNames." + leftIcon)}
        />
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}

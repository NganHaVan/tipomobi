import * as React from "react"
import { TouchableOpacity, TextStyle, ViewStyle, View } from "react-native"
import { Text } from "../text/text"
import { color, spacing } from "../../theme"
import { CheckboxProps } from "./checkbox.props"
import { mergeAll, flatten } from "ramda"
import { List } from "react-native-paper"

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing[1],
  alignSelf: "flex-start",
}

const DIMENSIONS = { width: 32, height: 32 }

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: color.text,
  borderRadius: 4,
}

const LABEL: TextStyle = { paddingLeft: spacing[2] }

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1

  const rootStyle = mergeAll(flatten([ROOT, props.style]))
  const outlineStyle = mergeAll(flatten([OUTLINE, props.outlineStyle]))

  const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null
  const labelStyle = mergeAll(flatten([LABEL, { marginTop: props.multiline ? 0 : spacing[1] }]))
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <View style={outlineStyle}>
        {props.value && <List.Icon icon="check-bold" color={color.primary} size={18} />}
      </View>
      <Text
        text={props.text}
        tx={props.tx}
        preset="subheading"
        numberOfLines={numberOfLines}
        style={labelStyle}
      />
    </TouchableOpacity>
  )
}

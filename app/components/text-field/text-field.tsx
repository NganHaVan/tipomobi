import * as React from "react"
import { flatten, mergeAll } from "ramda"
import { View, ViewStyle } from "react-native"
import { TextInput } from "react-native-paper"

import { translate } from "../../i18n"
import { color, spacing } from "../../theme"
import { TextFieldProps } from "./text-field.props"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
  containerStyle = enhance(containerStyle, styleOverride)

  // let inputStyle = enhance(inputStyle, inputStyleOverride)
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
  const actualLabel = labelTx ? translate(labelTx) : label
  return (
    <View style={containerStyle}>
      <TextInput
        label={actualLabel}
        mode="outlined"
        placeholder={actualPlaceholder}
        placeholderTextColor={color.placeholder}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyleOverride}
        ref={forwardedRef}
      />
    </View>
  )
}

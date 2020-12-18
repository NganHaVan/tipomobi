import * as React from "react"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"
import { Button as PaperButton } from "react-native-paper"
import { translate } from "../../i18n"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    txOptions,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    ...rest
  } = props

  const mode = { contained: "contained", outlined: "outlined", text: "text" }[preset] || "contained"
  const viewStyle = mergeAll(flatten([viewPresets[preset] || {}, styleOverride]))
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text
  // const content = children || <Text tx={tx} text={text} style={textStyle} />
  return (
    <PaperButton
      mode={mode}
      style={viewStyle}
      {...rest}
      accessibilityLabel={content}
      labelStyle={textStyle}
    >
      {content}
    </PaperButton>
  )
}

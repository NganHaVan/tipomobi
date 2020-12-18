import * as React from "react"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"
import { mergeAll, flatten } from "ramda"
import { Title, Text as PaperText, Subheading, Paragraph, Caption } from "react-native-paper"
import { color } from "../../theme"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    tx,
    txOptions,
    text,
    children,
    color: userColor,
    style: styleOverride,
    ...rest
  } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children
  const colorStyle = userColor ? { color: color.palette[userColor] } : {}
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride, colorStyle]))

  switch (preset) {
    case "title":
      return (
        <Title {...rest} style={style}>
          {content}
        </Title>
      )
    case "subheading":
      return (
        <Subheading {...rest} style={style}>
          {content}
        </Subheading>
      )
    case "paragraph":
      return (
        <Paragraph {...rest} style={style}>
          {content}
        </Paragraph>
      )
    case "caption":
      return (
        <Caption {...rest} style={style}>
          {content}
        </Caption>
      )
    default:
      return (
        <PaperText {...rest} style={style}>
          {content}
        </PaperText>
      )
  }
}

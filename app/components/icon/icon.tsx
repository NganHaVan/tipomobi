import * as React from "react"
import { View, Image, ImageStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"
import { color } from "../../theme"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle, color: userColor, size } = props
  const style: ImageStyle = {
    ...ROOT,
    tintColor: userColor || color.primary,
    height: size || 24,
    width: size || 24,
    ...styleOverride,
  }

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}

import * as React from "react"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { ParamListBase } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, View, ViewStyle, Dimensions, TextStyle } from "react-native"

import { Button, Screen, Text } from "../../components"
import { spacing, color } from "../../theme"
import FadeInView from "react-native-fade-in-view"

// import { useStores } from "../models/root-store"
const logo = require("./tipotie_nega.png")
const stripes = require("./stripes.png")
const { height } = Dimensions.get("window")
export interface MenuScreenProps {
  navigation: DrawerNavigationProp<ParamListBase>
}

const FLEX: ViewStyle = {
  flex: 1,
}

const BACKGROUND_CONTAINER: ViewStyle = {
  ...FLEX,
  backgroundColor: color.palette.greyBlue,
}

const LOGO: ImageStyle = {
  alignSelf: "center",
  marginTop: spacing[4],
  marginBottom: spacing[5],
  maxWidth: "80%",
}

const STRIPES: ImageStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: height * 0.33,
  height: height * 0.33,
  maxWidth: 349,
  maxHeight: 292,
}

const CONTENT: ViewStyle = {
  margin: spacing[5],
  zIndex: 1,
}
const BUTTON: ViewStyle = {
  marginVertical: spacing[4],
}

const BUTTON_CONTAINER: ViewStyle = {
  marginVertical: spacing[7],
}

const HEADING: TextStyle = {
  fontSize: 22,
}

const SUBHEADING: TextStyle = {
  marginTop: spacing[4],
  fontSize: 18,
}

export const MenuScreen: React.FunctionComponent<MenuScreenProps> = observer(props => {
  return (
    <FadeInView style={FLEX}>
      <View style={BACKGROUND_CONTAINER}>
        <Image source={stripes} style={STRIPES} resizeMode="contain" />
        <Screen preset="scroll" statusBar="light-content" backgroundColor={color.transparent}>
          <Image
            accessibilityLabel="Tipotie logo"
            source={logo}
            style={LOGO}
            resizeMode="contain"
          />
          <View style={CONTENT}>
            <View accessible>
              <Text preset="title" color="white" tx="menuScreen.hi" style={HEADING} />
              <Text
                preset="subheading"
                color="white"
                tx="menuScreen.welcomeText"
                style={SUBHEADING}
              />
            </View>
            <View style={BUTTON_CONTAINER}>
              {/*
            --- Disabled, until there's a use case for this ---
            <Button
              tx="menuScreen.invitation"
              style={BUTTON}
              icon="qrcode"
              onPress={() => props.navigation.navigate("qrcode")}
            /> */}
              <Button
                tx="menuScreen.search"
                style={BUTTON}
                icon="magnify"
                onPress={() =>
                  props.navigation.navigate("navigation", { poiId: undefined, poi: undefined })
                }
              />
            </View>
          </View>
        </Screen>
      </View>
    </FadeInView>
  )
})

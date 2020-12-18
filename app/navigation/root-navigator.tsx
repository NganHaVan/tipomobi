/* eslint-disable react/display-name */
// Drawer options cause errors
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DefaultTheme, NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import React from "react"

import { Icon, Text } from "../components"
import { MenuScreen, NavigationScreen, TaxiScreen, InfoScreen } from "../screens"
import { color } from "../theme"
import { DrawerParamList } from "./types"
import { FeedbackStack } from "./feedback-stack"
import { translate } from "../i18n"

const Drawer = createDrawerNavigator<DrawerParamList>()

const NavTheme = {
  ...DefaultTheme,
  colors: {
    primary: color.primary,
    background: color.backdrop,
    card: color.surface,
    text: color.palette.black,
    border: color.disabled,
  },
}

const DrawerLabel = ({ color, tx }) => (
  <Text
    accessible={true}
    accessibilityLabel={translate(tx)}
    preset="title"
    tx={tx}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{ color: color, fontSize: 18 }}
  />
)

const RootStack = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      options={{
        drawerLabel: props => <DrawerLabel tx="drawer.menu" {...props} />,
        drawerIcon: props => <Icon {...props} icon="home" />,
      }}
      name="menu"
      component={MenuScreen}
    />
    {/*
      --- Disabled, until there's a use case for this ---
      <Drawer.Screen
        options={{
          drawerLabel: props => <DrawerLabel tx="drawer.qrCode" {...props} />,
          drawerIcon: props => <Icon {...props} icon="camera" />,
        }}
        name="qrcode"
        component={QrCodeScreen}
      /> */}
    <Drawer.Screen
      options={{
        drawerLabel: props => <DrawerLabel tx="drawer.navigation" {...props} />,
        drawerIcon: props => <Icon {...props} icon="navigation" />,
      }}
      name="navigation"
      component={NavigationScreen}
    />
    <Drawer.Screen
      options={{
        drawerLabel: props => <DrawerLabel tx="drawer.feedback" {...props} />,
        drawerIcon: props => <Icon {...props} icon="thumbs-up" />,
      }}
      name="feedback"
      component={FeedbackStack}
    />
    <Drawer.Screen
      options={{
        drawerLabel: props => <DrawerLabel tx="drawer.taxi" {...props} />,
        drawerIcon: props => <Icon {...props} icon="car" />,
      }}
      name="taxi"
      component={TaxiScreen}
    />
    <Drawer.Screen
      options={{
        drawerLabel: props => <DrawerLabel tx="drawer.info" {...props} />,
        drawerIcon: props => <Icon {...props} icon="info" />,
      }}
      name="info"
      component={InfoScreen}
    />
  </Drawer.Navigator>
)

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => (
  <NavigationContainer {...props} ref={ref} theme={NavTheme}>
    <RootStack />
  </NavigationContainer>
))

RootNavigator.displayName = "RootNavigator"

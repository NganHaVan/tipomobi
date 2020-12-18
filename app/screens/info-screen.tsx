import * as React from "react"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { ParamListBase } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Linking, View, ViewStyle } from "react-native"

import { Button, Header, Screen, Text } from "../components"
import env from "../config/env"
import { spacing } from "../theme"
import { getAccessibilityStatementLink } from "../utils/language"

export interface InfoScreenProps {
  navigation: DrawerNavigationProp<ParamListBase>
}

const CONTENT: ViewStyle = {
  marginHorizontal: spacing[6],
  marginVertical: spacing[3],
}

const BUTTON: ViewStyle = {
  marginVertical: spacing[2],
}

const Content: React.FC<{accessible?: boolean}> = ({ children, ...rest }) => <View style={CONTENT} { ...rest}>{children}</View>

export const InfoScreen: React.FunctionComponent<InfoScreenProps> = observer(props => {
  const { navigation } = props
  return (
    <Screen preset="scroll">
      <Header
        headerTx="infoScreen.header"
        leftIcon="menu"
        onLeftPress={() => navigation.openDrawer()}
      />
      <Content accessible>
        <Text preset="subheading" tx="infoScreen.description" />
      </Content>
      <Content accessible>
        <Button
          tx="infoScreen.privacyPolicyBtn"
          icon="account-group"
          onPress={() => Linking.openURL(env.URL_PRIVACY_POLICY)}
          preset="outlined"
          style={BUTTON}
        />
        <Button
          tx="infoScreen.accessibilityBtn"
          icon="account"
          onPress={() => Linking.openURL(getAccessibilityStatementLink())}
          preset="outlined"
          style={BUTTON}
        />
      </Content>
    </Screen>
  )
})

import * as React from "react"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { ParamListBase } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Linking, View, ViewStyle } from "react-native"

import { Button, Header, Screen, Text } from "../components"
import env from "../config/env"
import { spacing } from "../theme"

// import { useStores } from "../models/root-store"
export interface TaxiScreenProps {
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

export const TaxiScreen: React.FunctionComponent<TaxiScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const { navigation } = props
  return (
    <Screen preset="scroll">
      <Header
        headerTx="taxiScreen.header"
        leftIcon="menu"
        onLeftPress={() => navigation.openDrawer()}
      />
      <Content accessible>
        <Text preset="subheading" tx="taxiScreen.bookingDescription1" />
        <Text preset="subheading" tx="taxiScreen.bookingDescription2" />
      </Content>
      <Content>
        <Button
          tx="taxiScreen.call"
          onPress={() => Linking.openURL("tel:" + env.TAXI_PHONE_NUMBER)}
          icon="phone"
          style={BUTTON}
        />
        <Button
          tx="taxiScreen.feedback"
          onPress={() => Linking.openURL(env.TAXI_FEEDBACK_URL)}
          preset="outlined"
          style={BUTTON}
        />
      </Content>
      <Content accessible>
        <Text preset="title" tx="taxiScreen.withDisabilitiesHeader" />
        <Text preset="subheading" tx="taxiScreen.disabilitiesDescribtion" />
      </Content>
      <Content>
        <Button
          tx="taxiScreen.sms"
          icon="message"
          onPress={() => Linking.openURL("sms:" + env.TAXI_SMS_NUMBER)}
          preset="outlined"
          style={BUTTON}
        />
      </Content>
    </Screen>
  )
})

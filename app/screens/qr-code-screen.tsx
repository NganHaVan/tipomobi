import * as React from "react"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { ParamListBase } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import QRCodeScanner from "react-native-qrcode-scanner"

import { Header, Screen, Text } from "../components"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"
import { translate } from "../i18n"

// import { useStores } from "../models/root-store"
export interface QrCodeScreenProps {
  navigation: DrawerNavigationProp<ParamListBase>
}

const TEXT: TextStyle = {
  margin: spacing[5],
  marginTop: spacing[6],
  textAlign: "center",
}

const CAMERA_CONTAINER: ViewStyle = {
  flex: 1,
}

export const QrCodeScreen: React.FunctionComponent<QrCodeScreenProps> = observer(props => {
  const {
    metaStore: { validatePOI },
    uiStore,
  } = useStores()
  const scannerRef = useRef<QRCodeScanner>()

  return (
    <Screen preset="fixed">
      <Header
        leftIcon="menu"
        onLeftPress={() => props.navigation.openDrawer()}
        headerTx="qrCodeScreen.header"
      />
      <Text preset="subheading" tx="qrCodeScreen.helpText" style={TEXT} />
      <View
        accessible
        accessibilityLabel={translate("accessibleNames.cameraPreview")}
        style={CAMERA_CONTAINER}
      >
        <QRCodeScanner
          ref={scannerRef}
          onRead={async e => {
            const poiId = e.data
            const poi = await validatePOI(poiId)
            poi
              ? props.navigation.navigate("navigation", { poi })
              : uiStore.enqueueModal({
                title: translate("common.error"),
                content: translate("qrCodeScreen.qrCodeNotValid"),
                hideCancel: true,
                onAccept: () => {
                  scannerRef.current && scannerRef.current.reactivate()
                },
              })
          }}
          // flash={RNCamera.Constants.FlashMode.torch}
          // topViewStyle={Platform.OS === "android" ? { marginBottom: spacing[8] } : {}}
          // topContent={<Text preset="subheading" tx="qrCodeScreen.helpText" style={TEXT} />}
          // bottomContent={<Button text="Jokin nappi" onPress={() => {}} />}
        />
      </View>
    </Screen>
  )
})

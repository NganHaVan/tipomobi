import React, { useRef, useEffect } from "react"
import { View, ViewStyle, Platform } from 'react-native'
import { DrawerScreenProps } from "@react-navigation/drawer"
import { observer } from "mobx-react-lite"

import { ActivityIndicator } from "react-native-paper"
import {
  SmartMapModes,
  SmartMapObject,
  SmartMapUserTask,
  SmartMapView,
  SmartMapViewProps,
} from "react-native-steerpath-smart-map"

import { Header, Screen } from "../components"
import config from "../config/env"
import { useStores } from "../models/root-store"
import { DrawerParamList } from "../navigation/types"
import { delay } from '../utils/delay'
import { translate } from '../i18n'
import { scheduledNotification } from "../utils/notification"

// import { useStores } from "../models/root-store"
export interface NavigationScreenProps extends DrawerScreenProps<DrawerParamList, "navigation"> {}

type SmartMapCameraCommand = {
  latitude: number
  longitude: number
  zoomLevel: number
  bearing: number
  pitch: number
  floorIndex: number
  buildingRef: string
}

type SmartMapRef = {
  selectMapObject: (obj: Partial<SmartMapObject>) => void
  startUserTask: (task: SmartMapUserTask) => void
  animateCamera: (obj: SmartMapCameraCommand) => void
  animateCameraToObject: (obj: Partial<SmartMapObject>) => void
  onBackPressed: (payload: any) => void
  stop: () => void
  start: () => void
} & SmartMapViewProps

const FLEX: ViewStyle = { flex: 1, alignItems: "center", justifyContent: "center" }

export const NavigationScreen: React.FunctionComponent<NavigationScreenProps> = observer(props => {
  const smartMapRef = useRef<SmartMapRef>()
  const {
    feedbackStore: { setFeedbackMode },
    uiStore: { sdkLoaded, enqueueModal },
    metaStore: { validatePOI },
  } = useStores()

  const {
    navigation,
    route: { params },
  } = props
  useEffect(() => {
    ;(async () => {
      if (params && params.poi && smartMapRef.current) {
        smartMapRef.current.selectMapObject(params.poi.properties)
      } else if (params && params.poiId && smartMapRef.current) {
        const poi = await validatePOI(params.poiId)
        smartMapRef.current.selectMapObject(poi.properties)
      }
    })()
  }, [params])

  const onMapLoaded = () => {
    if (Platform.OS === 'android') {
      navigation.addListener('blur', () => {
        smartMapRef.current.stop()
      })
      navigation.addListener('focus', () => {
        smartMapRef.current.start()
      })
    }
  }

  return (
    <Screen preset="fixed">
      <Header
        leftIcon="menu"
        onLeftPress={() => {
          // mapStopHandler()
          navigation.openDrawer()
        }}
        headerTx="navigationScreen.header"
      />

      {sdkLoaded ? (
        <SmartMapView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flex: 1 }}
          apiKey={config.API_KEY}
          // @ts-ignore
          ref={smartMapRef}
          mapMode={SmartMapModes.STATIC}
          onMapLoaded={onMapLoaded}
          onMapClicked={payload => {
            try {
              const { mapObjects } = payload
              const smartMapObject = mapObjects[0]
              // use selectMapObject() to open the default info bottomsheet of selected smartMapObject
              smartMapObject &&
                  smartMapRef.current &&
                  smartMapRef.current.selectMapObject(smartMapObject)
            } catch (err) {
              // console.tron.log(err)
            }
          }}
          // onUserFloorChanged={payload => console.tron.log("User floor changed", payload)}
          // onVisibleFloorChanged={payload => console.tron.log("Visible Floor changed", payload)}
          onSearchResultSelected={payload => {
            try {
              const { mapObject } = payload
              payload && smartMapRef.current && smartMapRef.current.selectMapObject(mapObject)
            } catch (err) {
              // console.tron.log(err)
            }
          }}
          // onViewStatusChanged={payload => console.tron.log("onViewstatuschanged", payload)}
          onNavigationDestinationReached={async () => {
            await delay(2000)
            enqueueModal({
              title: translate("feedbackScreen.header"),
              content: translate("feedbackScreen.feedbackPrompt"),
              cancelText: translate("common.back"),
              acceptText: translate("common.yes"),
              onAccept: () => {
                setFeedbackMode('fromNavigation')
                navigation.navigate("feedback")
              },
              onCancel: () => {
                scheduledNotification(
                  translate("notifications.feedback.title"),
                  translate("notifications.feedback.message"),
                  translate("common.yes"),
                  translate("common.no")
                )
              },
            })
          }}
          // onNavigationStarted={() => {
          //   console.tron.log("navigation started")
          // }}
          // onNavigationEnded={() => {
          //   console.tron.log("onNavigationEnded")
          // }}
          // onNavigationPreviewAppeared={() => console.tron.log("navigation PreviewAppeared")}
          // onUserTaskResponse={payload => console.tron.log(payload)}
          // onBackPressed={payload => console.tron.log("onBackPressed", payload)}
        />
      ) : (
        <View style={FLEX}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </Screen>
  )
})

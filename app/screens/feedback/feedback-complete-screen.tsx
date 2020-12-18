import * as React from "react"
import { ViewStyle, TextStyle, View } from "react-native"
import { ParamListBase, StackActions } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button } from "../../components"
import { color, spacing } from "../../theme"
import { IconButton } from "react-native-paper"
import { translate } from "../../i18n"

export interface FeedbackCompleteScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const DONE_CONTENT: ViewStyle = {
  padding: spacing[6],
  justifyContent: "center",
  alignItems: "center",
}

const BUTTON_CONTAINER: ViewStyle = {
  marginVertical: spacing[6],
  width: "100%",
}

const MARGIN: ViewStyle = {
  marginVertical: spacing[6],
}

const MARGIN_BOTTOM: TextStyle = {
  marginBottom: spacing[5],
}

export const FeedbackCompleteScreen: React.FunctionComponent<FeedbackCompleteScreenProps> = props => {
  const navigateAndReset = (route: string, params?: object) => {
    props.navigation.navigate(route, params)
    props.navigation.dispatch(StackActions.popToTop())
  }
  return (
    <Screen preset="scroll">
      <View style={DONE_CONTENT}>
        <IconButton
          icon="comment-check"
          size={64}
          color={color.accent}
          accessibilityRole="image"
          accessibilityLabel={translate("accessibleNames.feedbackSuccess")}
        />
        <Text style={MARGIN_BOTTOM} preset="title" text={translate("common.thanks") + "!"} />
        <Text style={MARGIN_BOTTOM} preset="subheading" tx="feedbackScreen.submitted" />
        <View style={BUTTON_CONTAINER}>
          <Button
            tx="feedbackScreen.returnToStart"
            onPress={() => navigateAndReset("menu")}
            style={MARGIN}
          />
          <Button
            tx="feedbackScreen.returnToMap"
            onPress={() => navigateAndReset("navigation", { poiId: undefined })}
          />
        </View>
      </View>
    </Screen>
  )
}

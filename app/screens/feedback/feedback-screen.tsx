import * as React from "react"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"

import {
  Button,
  FeedbackButtons,
  FeedbackOptions,
  Header,
  Screen,
  Text,
  TextField,
} from "../../components"
import { useStores } from "../../models/root-store"
import { DrawerParamList } from "../../navigation/types"
import { spacing } from "../../theme"
import { delay } from "../../utils/delay"

export interface FeedbackScreenProps extends DrawerScreenProps<DrawerParamList, "feedback"> {}

const CONTENT: ViewStyle = {
  padding: spacing[6],
}

const MARGIN: ViewStyle = {
  marginVertical: spacing[6],
}

const MARGIN_BOTTOM: TextStyle = {
  marginBottom: spacing[5],
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = observer(props => {
  const [freeText, setFreeText] = React.useState<string>("")
  const {
    feedbackStore: {
      showFeedbackForm,
      setSelected,
      sendFeedback,
      selected,
      formVisible,
      mode,
      status,
      setFeedbackMode,
    },
  } = useStores()
  return (
    <Screen preset="scroll">
      <Header
        leftIcon="menu"
        onLeftPress={() => props.navigation.openDrawer()}
        headerTx="feedbackScreen.header"
      />
      <View style={CONTENT}>
        <Text
          style={MARGIN_BOTTOM}
          preset="subheading"
          tx={
            mode === "fromNavigation"
              ? "feedbackScreen.afterNavigationFeedback"
              : "feedbackScreen.normalFeedback"
          }
        />
        <FeedbackButtons
          onChange={value => {
            showFeedbackForm(true)
            setSelected(value)
          }}
          selected={selected as FeedbackOptions}
        />
        {!formVisible && mode === "fromNavigation" ? (
          <Button
            tx="feedbackScreen.noFeedback"
            style={MARGIN}
            mode="outlined"
            onPress={async () => {
              props.navigation.navigate("menu")
              await delay(500)
              // Reset feedback mode
              setFeedbackMode("fromMenu")
            }}
          />
        ) : (
          <>
            <TextField
              placeholderTx="feedbackScreen.giveFeedback"
              value={freeText}
              onChangeText={text => setFreeText(text)}
            />
            <Button
              tx="feedbackScreen.send"
              style={MARGIN_BOTTOM}
              loading={status === "pending"}
              onPress={async () => {
                if (status !== "pending") {
                  try {
                    await sendFeedback(freeText)
                    props.navigation.navigate("feedback-complete")
                    // Wait for navigation to complete
                    await delay(500)
                    setFreeText("")
                  } catch (err) {
                    // Do nothing, an error message has been displayed
                  }
                }
              }}
            />
          </>
        )}
      </View>
    </Screen>
  )
})

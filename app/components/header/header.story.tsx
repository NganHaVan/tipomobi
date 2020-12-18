import * as React from "react"
import { View, Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Header } from "./header"
import { color } from "../../theme"

declare let module

const VIEWSTYLE = {
  flex: 1,
  backgroundColor: color.background,
}

storiesOf("Header", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Behavior", () => (
    <Story>
      <UseCase noPad text="default" usage="The default usage">
        <View style={VIEWSTYLE}>
          <Header headerTx="menuScreen.header" />
        </View>
      </UseCase>
      <UseCase noPad text="leftIcon" usage="A left nav icon">
        <View style={VIEWSTYLE}>
          <Header
            headerTx="menuScreen.header"
            leftIcon="chevron-left"
            onLeftPress={() => Alert.alert("left nav")}
          />
        </View>
      </UseCase>
      <UseCase noPad text="rightIcon" usage="A right nav icon">
        <View style={VIEWSTYLE}>
          <Header
            headerTx="menuScreen.header"
            rightIcon="chevron-right"
            onRightPress={() => Alert.alert("right nav")}
          />
        </View>
      </UseCase>
      <UseCase noPad text="both icons" usage="Both nav icons">
        <View style={VIEWSTYLE}>
          <Header
            headerTx="menuScreen.header"
            leftIcon="home"
            rightIcon="chevron-right"
            onRightPress={() => Alert.alert("right nav")}
          />
        </View>
      </UseCase>
    </Story>
  ))

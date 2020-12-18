/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TextField } from "../"
import { State } from "react-powerplug"
import { Alert } from "react-native"

declare let module
let alertWhenFocused = true

storiesOf("TextField", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Labelling", () => (
    <Story>
      <UseCase text="Normal text" usage="Use placeholder and label to set the text.">
        <State initial={{ value: "" }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label="Name"
              placeholder="omg your name"
            />
          )}
        </State>
      </UseCase>

      <UseCase text="i18n text" usage="Use placeholderTx and labelTx for i18n lookups">
        <State initial={{ value: "" }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              placeholderTx="feedbackScreen.header"
              labelTx="feedbackScreen.giveFeedback"
            />
          )}
        </State>
      </UseCase>
    </Story>
  ))
  .add("Style Overrides", () => (
    <Story>
      <UseCase
        noPad
        text="Container Styles"
        usage="Useful for applying margins when laying out a form to remove padding if the form brings its own."
      >
        <State initial={{ value: "Inigo" }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label="First Name"
              style={{ paddingTop: 0, paddingHorizontal: 40 }}
            />
          )}
        </State>
        <State initial={{ value: "Montoya" }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label="Last Name"
              style={{ paddingBottom: 0 }}
            />
          )}
        </State>
      </UseCase>
      <UseCase
        text="Input Styles"
        usage="Useful for 1-off exceptions.  Try to steer towards presets for this kind of thing."
      >
        <State initial={{ value: "fancy colour" }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label="Name"
              inputStyle={{
                backgroundColor: "aliceblue",
                color: "white",
                padding: 40,
                borderWidth: 6,
                borderRadius: 10,
                borderColor: "green",
              }}
            />
          )}
        </State>
      </UseCase>
    </Story>
  ))
  .add("Ref forwarding", () => (
    <Story>
      <UseCase text="Ref forwarding" usage="">
        <State initial={{ value: "fancy colour" }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label="Name"
              forwardedRef={ref => ref}
              onFocus={() => {
                if (alertWhenFocused) {
                  alertWhenFocused = false
                  Alert.alert("Text field focused with forwarded ref!")
                }
              }}
            />
          )}
        </State>
      </UseCase>
    </Story>
  ))

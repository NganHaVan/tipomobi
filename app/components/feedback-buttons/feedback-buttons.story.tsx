import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { FeedbackButtons, FeedbackOptions } from "./feedback-buttons"
import { useState } from "react"

declare let module

storiesOf("FeedbackButton", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () =>
    React.createElement(() => {
      const [selected, setSelected] = useState<FeedbackOptions>("excited")
      return (
        <Story>
          <UseCase text="Default">
            <FeedbackButtons selected={selected} onChange={setSelected} />
          </UseCase>
        </Story>
      )
    }),
  )

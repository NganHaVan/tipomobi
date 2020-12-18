import * as React from "react"
import { ViewStyle, View } from "react-native"
import { IconButton } from "react-native-paper"
import { color } from "../../theme"
import { translate } from "../../i18n"

const ICONS = {
  excited: "emoticon-excited-outline",
  happy: "emoticon-happy-outline",
  neutral: "emoticon-neutral-outline",
  disappointed: "emoticon-sad-outline",
}
export type FeedbackOptions = keyof typeof ICONS

export interface FeedbackButtonsProps {
  onChange: (value: FeedbackOptions) => void
  selected: FeedbackOptions
}

const ROOT: ViewStyle = {
  borderWidth: 2,
  borderColor: color.palette.greyBlue,
  borderRadius: 10,
}

const SELECTED: ViewStyle = {
  backgroundColor: color.palette.greyBlue,
}

const ROW: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
  justifyContent: "space-between",
  width: "104%",
}

/**
 * Feedback square button with an emoticon.
 */
export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ onChange, selected }) => {
  return (
    <View style={ROW}>
      {Object.keys(ICONS).map(icon => {
        const isSelected = selected === icon
        const selectedHint = isSelected
          ? `, ${translate("accessibleNames.selected")}`
          : `, ${translate("accessibleNames.deselected")}`
        return (
          <IconButton
            key={icon}
            icon={ICONS[icon]}
            accessible
            accessibilityLabel={translate("accessibleNames." + icon) + selectedHint}
            accessibilityLiveRegion="polite"
            onPress={() => onChange(icon as FeedbackOptions)}
            size={48}
            style={[ROOT, isSelected ? SELECTED : {}]}
            color={isSelected ? color.palette.white : undefined}
          />
        )
      })}
    </View>
  )
}

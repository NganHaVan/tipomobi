import * as React from "react"
import { Portal, Dialog, Paragraph } from "react-native-paper"
import { Button } from "../components"
import { translate } from "../i18n"
import { observer } from "mobx-react-lite"
import { useStores } from "../models/root-store"
import { ViewStyle } from "react-native"

const MARGIN: ViewStyle = {
  marginLeft: 12,
}
export const ModalProvider: React.FC = observer(props => {
  const {
    uiStore: { displayedModal, removeModal, getCurrentModal },
  } = useStores()
  const modal = getCurrentModal()
  return (
    <>
      {props.children}
      {displayedModal && (
        <Portal>
          <Dialog key={displayedModal} visible onDismiss={() => removeModal(modal)}>
            <Dialog.Title>{modal.title}</Dialog.Title>
            <Dialog.Content>
              {typeof modal.content === "string" ? (
                <Paragraph>{modal.content}</Paragraph>
              ) : (
                modal.content()
              )}
            </Dialog.Content>
            <Dialog.Actions>
              {modal.hideCancel || (
                <Button
                  style={MARGIN}
                  onPress={() => {
                    modal.onCancel && modal.onCancel()
                    removeModal(modal)
                  }}
                  text={modal.cancelText || translate("common.back")}
                />
              )}
              <Button
                style={MARGIN}
                mode="outlined"
                onPress={() => {
                  modal.onAccept && modal.onAccept()
                  removeModal(modal)
                }}
                text={modal.acceptText || translate("common.continue")}
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </>
  )
})

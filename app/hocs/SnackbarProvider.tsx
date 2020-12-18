import * as React from "react"
import { Observer, observer } from "mobx-react-lite"
import { Portal, Snackbar } from "react-native-paper"

import { translate } from "../i18n"
import { useStores } from "../models/root-store"

export const SnackbarProvider: React.FC = observer(props => {
  const {
    uiStore: { displayedSnackbar, removeSnackbar, getCurrentSnackbar },
  } = useStores()
  const snackbar = getCurrentSnackbar()
  return (
    <>
      {props.children}
      <Observer>
        {() =>
          displayedSnackbar ? (
            <Portal>
              <Snackbar
                key={displayedSnackbar}
                duration={Snackbar.DURATION_MEDIUM}
                visible
                style={{ ...snackbar.style }}
                onDismiss={() => removeSnackbar(snackbar)}
                action={{
                  label: snackbar.actionText || translate("common.ok"),
                  onPress: () => {
                    snackbar.callback && snackbar.callback()
                    removeSnackbar(snackbar)
                  },
                }}
              >
                {snackbar.message}
              </Snackbar>
            </Portal>
          ) : null
        }
      </Observer>
    </>
  )
})

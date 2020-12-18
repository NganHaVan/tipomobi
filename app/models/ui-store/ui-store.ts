import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ViewStyle } from "react-native"

type Snackbar = {
  key?: number
  message: string
  callback?: () => void
  style?: ViewStyle
  actionText?: string
}

type Modal = {
  key?: number
  title: string
  content: string | (() => React.ReactNode)
  cancelText?: string
  acceptText?: string
  onAccept: () => void
  onCancel?: () => void
  hideCancel?: boolean
}

/**
 * Model description here for TypeScript hints.
 */
export const UiStoreModel = types
  .model("UiStore")
  .props({
    sdkLoaded: types.boolean,
    displayedSnackbar: types.maybe(types.number),
    displayedModal: types.maybe(types.number),
    snackbars: types.frozen<Snackbar[]>(),
    modals: types.frozen<Modal[]>(),
  })
  .views(self => ({
    getCurrentSnackbar: () =>
      Array.isArray(self.snackbars) && self.snackbars.find(el => el.key === self.displayedSnackbar),
    getCurrentModal: () =>
      Array.isArray(self.modals) && self.modals.find(el => el.key === self.displayedModal),
  }))
  .actions(self => ({
    setSdkLoaded: (state: boolean) => {
      self.sdkLoaded = state
    },
    enqueueSnackbar: (snackbar: Snackbar) => {
      self.snackbars = [
        ...self.snackbars,
        { key: new Date().getTime() + Math.random(), ...snackbar },
      ]
      if (!self.displayedSnackbar) {
        self.displayedSnackbar = self.snackbars[0].key
      }
    },
    removeSnackbar: (snackbar: Snackbar) => {
      self.snackbars = self.snackbars.filter(el => el.key !== snackbar.key)
      if (self.snackbars.length > 0) {
        self.displayedSnackbar = self.snackbars[0].key
      } else {
        self.displayedSnackbar = undefined
      }
    },
    enqueueModal: (modal: Modal) => {
      self.modals = [...self.modals, { key: new Date().getTime() + Math.random(), ...modal }]
      if (!self.displayedModal) {
        self.displayedModal = self.modals[0].key
      }
    },
    removeModal: (modal: Modal) => {
      self.modals = self.modals.filter(el => el.key !== modal.key)
      if (self.modals.length > 0) {
        self.displayedModal = self.modals[0].key
      } else {
        self.displayedModal = undefined
      }
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UiStoreType = Instance<typeof UiStoreModel>
export interface UiStore extends UiStoreType {}
type UiStoreSnapshotType = SnapshotOut<typeof UiStoreModel>
export interface UiStoreSnapshot extends UiStoreSnapshotType {}

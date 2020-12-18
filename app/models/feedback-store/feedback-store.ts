import { Instance, SnapshotOut, types, flow, getRoot } from "mobx-state-tree"
import { FeedbackOptions } from "../../components"
import { withStatus, withEnvironment } from "../extensions"
import { RootStore } from "../root-store"
import { translate } from "../../i18n"

/**
 * Feedback form state
 */
export const FeedbackStoreModel = types
  .model("FeedbackStore")
  .extend(withEnvironment)
  .props({
    formVisible: types.boolean,
    selected: types.maybe(
      types.union(
        types.literal("excited"),
        types.literal("happy"),
        types.literal("neutral"),
        types.literal("disappointed"),
      ),
    ),
    // Whether to show after navigation UX or from menu
    mode: types.union(types.literal("fromNavigation"), types.literal("fromMenu")),
  })
  .extend(withStatus)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .views(self => ({}))
  .actions(self => ({
    resetForm: () => {
      self.formVisible = false
      self.setStatus("idle")
    },
    showFeedbackForm: (state: boolean) => {
      self.formVisible = state
    },
    setSelected: (value: FeedbackOptions) => {
      self.selected = value
      self.formVisible = true
    },
    setFeedbackMode: (mode: "fromNavigation" | "fromMenu") => {
      self.mode = mode
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendFeedback: flow(function * (freeText: string) {
      try {
        self.setStatus("pending")
        self.environment.api.sendFeedback(
          translate("accessibleNames." + self.selected, { locale: "fi" }),
          freeText,
        )
        self.setStatus("done")
        self.formVisible = false
        self.selected = undefined
      } catch (err) {
        const { uiStore } = getRoot<RootStore>(self)
        uiStore.enqueueSnackbar({ message: translate("feedbackScreen.submitError") })
        self.setStatus("error")
        throw err
      }
    }),
  }))
/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type FeedbackStoreType = Instance<typeof FeedbackStoreModel>
export interface FeedbackStore extends FeedbackStoreType {}
type FeedbackStoreSnapshotType = SnapshotOut<typeof FeedbackStoreModel>
export interface FeedbackStoreSnapshot extends FeedbackStoreSnapshotType {}

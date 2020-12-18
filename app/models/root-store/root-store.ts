import { MetaStoreModel } from "../../models/meta-store"
import { FeedbackStoreModel } from "../../models/feedback-store"
import { UiStoreModel } from "../../models/ui-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  metaStore: types.optional(MetaStoreModel, { validPoiCache: [] }),
  feedbackStore: types.optional(FeedbackStoreModel, { mode: "fromMenu", formVisible: false }),
  uiStore: types.optional(UiStoreModel, { sdkLoaded: false, snackbars: [], modals: [] }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

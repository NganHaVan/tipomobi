/* eslint-disable @typescript-eslint/camelcase */
import { Instance, SnapshotOut, types, flow, cast } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { GetPOIResult } from "../../services/api"

const PoiProps = types.model({
  layerIndex: types.number,
  localRef: types.string,
  area: types.model({
    type: types.string, // t@odo: enum
    coordinates: types.array(types.array(types.array(types.number))),
  }),
  css_class: types.string,
  tags: types.array(types.string),
  sourceRef: types.model({
    url: types.string,
    objectId: types.string,
  }),
  subType: types.string, // @todo enum,
  title: types.string,
  buildingRef: types.string,
  editor_reset: types.boolean,
  fill_color: types.string,
  point: types.maybe(
    types.model({
      type: types.string,
      coordinates: types.array(types.number),
    }),
  ),

  editor_deleted: types.boolean,
  editor_saved: types.boolean,
  _dbid: types.string,
  textHaloColor: types.string,
})

const Poi = types.model({
  properties: PoiProps,
  geometry: types.model({
    type: types.string,
    coordinates: types.array(types.number),
  }),
  type: types.string, // @todo: enum
  id: types.string,
})

export const MetaStoreModel = types
  .model("MetaStore")
  .extend(withEnvironment)
  .props({
    validPoiCache: types.array(Poi),
  })
  .views(self => ({
    findFromCache: (id: string) => self.validPoiCache.find(el => el.id === id),
  }))
  .actions(self => ({
    findPOIWithId: flow(function * (id: string) {
      const cached = self.findFromCache(id)
      if (cached) return cached

      const poi: GetPOIResult = yield self.environment.api.getPOI(id)
      if (poi.kind === "ok") {
        self.validPoiCache = cast([...self.validPoiCache, poi.data])
        return poi.data
      }
      return null
    }),
  }))
  .actions(self => ({
    validatePOI: flow(function * (id: string) {
      let parsedId = id
      try {
      // User might read a deep linking url (tipomobi://)
        if (id.startsWith("tipomobi://")) {
          const urlParts = id.split("/")
          const idx = urlParts.indexOf("navigate")
          if (idx > 0) {
            parsedId = urlParts[idx + 1]
          }
        }
        return self.findPOIWithId(parsedId)
      } catch (err) {
        // Try to validate nevertheless
        return self.findPOIWithId(parsedId)
      }
    }),
  }))
/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MetaStoreType = Instance<typeof MetaStoreModel>
export interface MetaStore extends MetaStoreType {}
type MetaStoreSnapshotType = SnapshotOut<typeof MetaStoreModel>
export interface MetaStoreSnapshot extends MetaStoreSnapshotType {}

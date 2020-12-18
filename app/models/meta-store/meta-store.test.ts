/* eslint-disable @typescript-eslint/camelcase */
import { MetaStoreModel, MetaStore } from "./meta-store"

const testPOI = {
  properties: {
    layerIndex: 0,
    localRef: "D1 017",
    area: {
      type: "Polygon",
      coordinates: [
        [
          [23.7298774039, 61.4996230737],
          [23.7298518469, 61.4996051729],
          [23.7299409651, 61.4995761156],
          [23.7299665208, 61.4995940255],
          [23.7298774039, 61.4996230737],
        ],
      ],
    },
    css_class: "category_waiting_room",
    tags: ["category_waiting_room"],
    sourceRef: {
      url: "640/0",
      objectId: "1AA",
    },
    subType: "poi",
    title: "Odotustila 02",
    buildingRef: "640",
    editor_reset: false,
    fill_color: "#762627",
    editor_deleted: false,
    editor_saved: false,
    _dbid: "5ecccbf63c45f20ee55ff025",
    textHaloColor: "#471718",
  },
  geometry: {
    type: "Point",
    coordinates: [23.7299091864, 61.499599596],
  },
  type: "Feature",
  id: "5ecccbf63c45f20ee55ff025",
}

test("can be created", () => {
  const instance: MetaStore = MetaStoreModel.create({ validPoiCache: [] })
  expect(instance).toBeTruthy()
})

test("should validate a deep linking POI url", async () => {
  const instance: MetaStore = MetaStoreModel.create(
    { validPoiCache: [] },
    {
      api: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getPOI: async (_id: string) => ({
          kind: "ok",
          data: testPOI,
        }),
      },
    },
  )
  const valid = await instance.validatePOI("tipomobi://navigate/5ecccbf63c45f20ee55ff025")
  expect(valid).toBe(testPOI)
})

test("should validate a POI id", async () => {
  const instance: MetaStore = MetaStoreModel.create(
    { validPoiCache: [] },
    {
      api: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getPOI: async (_id: string) => ({
          kind: "ok",
          data: testPOI,
        }),
      },
    },
  )
  const valid = await instance.validatePOI("5ecccbf63c45f20ee55ff025")
  expect(valid).toBe(testPOI)
})

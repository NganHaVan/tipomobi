import { FeedbackStoreModel, FeedbackStore } from "./feedback-store"

test("can be created", () => {
  const instance: FeedbackStore = FeedbackStoreModel.create({
    formVisible: false,
    mode: "fromMenu",
  })

  expect(instance).toBeTruthy()
})

test("can change feedback mode", () => {
  const instance: FeedbackStore = FeedbackStoreModel.create({
    formVisible: false,
    mode: "fromMenu",
  })

  instance.setFeedbackMode("fromNavigation")
  expect(instance.mode).toBe("fromNavigation")

  instance.setFeedbackMode("fromMenu")
  expect(instance.mode).toBe("fromMenu")
})

test("can leave feedback and submit it", async () => {
  const instance: FeedbackStore = FeedbackStoreModel.create(
    {
      formVisible: false,
      mode: "fromMenu",
    },
    { api: { sendFeedback: () => true } },
  )

  instance.setSelected("happy")
  await instance.sendFeedback("This is some text")
  expect(instance.status).toBe("done")
  expect(instance.formVisible).toBe(false)

  instance.setFeedbackMode("fromMenu")
  expect(instance.mode).toBe("fromMenu")
})

import { UiStoreModel, UiStore } from "./ui-store"

test("can be created", () => {
  const instance: UiStore = UiStoreModel.create({
    snackbars: [],
    modals: [],
    sdkLoaded: false,
  })

  expect(instance).toBeTruthy()
})

test("can enqueue and dismiss a snackbar", () => {
  const instance: UiStore = UiStoreModel.create({
    snackbars: [],
    modals: [],
    sdkLoaded: false,
  })
  instance.enqueueSnackbar({ message: "Viesti" })
  expect(instance.snackbars.length).toBe(1)
  expect(instance.displayedSnackbar).toBeTruthy()
  instance.removeSnackbar(instance.snackbars[0])
  expect(instance.snackbars.length).toBe(0)
  expect(instance.displayedSnackbar).toBeFalsy()
})

test("can enqueue and dismiss a modal", () => {
  const instance: UiStore = UiStoreModel.create({
    snackbars: [],
    modals: [],
    sdkLoaded: false,
  })
  instance.enqueueModal({
    title: "Otsikko",
    content: "Viesti",
    onAccept: () => 1 + 1,
  })
  expect(instance.modals.length).toBe(1)
  expect(instance.displayedModal).toBeTruthy()
  instance.removeModal(instance.modals[0])
  expect(instance.modals.length).toBe(0)
  expect(instance.displayedModal).toBeFalsy()
})

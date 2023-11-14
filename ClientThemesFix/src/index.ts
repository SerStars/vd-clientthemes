import { find, findByProps } from "@vendetta/metro"
import { instead, after } from "@vendetta/patcher"
import { storage } from "@vendetta/plugin"

const AppearanceSettings = findByProps("setShouldSyncAppearanceSettings")
const canUse = findByProps('canUseClientThemes');

storage.isEnabled ??= false

AppearanceSettings.setShouldSyncAppearanceSettings(false)

const patches = [
    instead("setShouldSyncAppearanceSettings", AppearanceSettings, () => !storage.isEnabled),
    instead(canUse, "canUseClientThemes", () => () => true)
]

export const onUnload = () => {
    for (const unpatch of patches) unpatch()
}

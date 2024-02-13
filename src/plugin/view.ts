import { type App as VueApp, createApp } from 'vue'
import { createPinia } from 'pinia'
import type { WorkspaceLeaf } from 'obsidian'
import { ItemView } from 'obsidian'
import App from '../App.vue'

export const VIEW_TYPE_VUE_TEST = 'vue-test-view'

export class VueTestView extends ItemView {
  vueApp: VueApp

  constructor(leaf: WorkspaceLeaf) {
    super(leaf)

    this.icon = 'flask-conical'

    this.vueApp = createApp(App)
    this.vueApp.use(createPinia())
  }

  getViewType() {
    return VIEW_TYPE_VUE_TEST
  }

  getDisplayText() {
    return 'Vue Test View'
  }

  async onOpen() {
    const mountPoint = this.containerEl.children[1]

    this.vueApp.mount(mountPoint)
  }

  async onClose() {
    this.vueApp.unmount()
  }
}

// stores/obsidianStore.ts
import { defineStore } from 'pinia';
import type { App } from 'obsidian';

export const useObsidianStore = defineStore('obsidian', {
  state: () => ({
    app: null as App | null,
  }),
  actions: {
    setApp(app: App) {
      this.app = app;
    },
  },
});

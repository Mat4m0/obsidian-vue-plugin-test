<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useObsidianStore } from './stores/obsidianStore';

const obsidianStore = useObsidianStore();

// Initialize files as a ref to an empty array
let files = ref([]);

onMounted(() => {
  if (obsidianStore.app) {
    // Update the value of files to be the array of markdown files
    files.value = obsidianStore.app.vault.getMarkdownFiles();
    console.log(`Number of notes: ${files.value.length}`);
  }
});
</script>

<template>
  <h1>Vue Test View</h1>
  <div class="test bg-gray-100">
    <div class="text-3xl">Number of notes: {{ files.length }}</div>
  </div>
</template>

<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

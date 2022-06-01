<template>
  <div class="flex align-items-center p-2">
    <h1 class="text-2xl p-2 text-600">Daughtridge Sales</h1>
    <div class="flex-grow-1 text-center text-6xl text-600 font-bold">
      Simple Price Change
      <span class="text-xs text-100">v{{ version }}</span>
    </div>
    <div>
      <Button
        class="uppercase ml-2 p-button-outlined"
        label="Update Item"
        @click="emit('setActiveView', 'item')"
      />
      <Button
        class="uppercase ml-2 p-button-outlined"
        label="Update Option"
        @click="emit('setActiveView', 'option')"
      />
      <a
        class="p-button uppercase ml-2 p-button-outlined no-underline"
        href="https://dascosales.notion.site/Simple-Price-Change-Application-3f7503122a4f47df94037715ee8fb59e"
        target="_blank"
      >
        Docs
        <i class="pi pi-external-link ml-2" />
      </a>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['setActiveView'])
const version = import.meta.env.VITE_APP_VERSION
</script>

<style scoped>
.no-underline {
  text-decoration: none;
}
</style>
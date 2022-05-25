<template>
  <div class="flex align-items-center p-2">
    <h1 class="text-2xl p-2 text-600">Daughtridge Sales</h1>
    <div class="flex-grow-1 text-center text-6xl text-600 font-bold">Simple Price Change</div>
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
      <Button
        class="uppercase ml-2 p-button-outlined"
        icon="pi pi-external-link"
        label="Docs"
        iconPos="right"
        v-tooltip.bottom="'Coming Soon'"
        @click="() => {}"
      />
    </div>
  </div>
</template>

<script setup>
const emit= defineEmits(['setActiveView'])
</script>

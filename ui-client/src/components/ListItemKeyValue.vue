<template>
  <li class="flex flex-wrap align-items-center justify-content-between py-2">
    <span>
      {{ label }}
    </span>
    <div class="ml-4">
      {{ value }}
    </div>
  </li>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  }
})
</script>
<template>
  <div>
    <span class="block text-6xl font-bold mb-1">Look up item</span>
    <div class="text-6xl text-primary font-bold mb-9">in NAV and Experlogix</div>
    <div class="mt-6 flex">
      <span class="p-float-label">
        <InputText
          v-model="item_no"
          class="p-inputtext-lg"
          id="item_no"
          type="text"
          @keyup.enter="getInfo"
        />
        <label
          for="item_no"
          class="text-lg"
        >Item No.</label>
      </span>
      <Button
        class="ml-2"
        label="Search"
        :disabled="!item_no"
        @click="getInfo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Emit
const emit  = defineEmits(['sqlResults'])

const item_no = ref('')

async function getInfo () {
  if (!item_no.value) return
  try {
    emit('sqlResults', null)
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/getItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item_no: item_no.value.toUpperCase() })
    })
    const body = await res.json()
    emit('sqlResults', body)
  } catch (error) {
    console.error(error)
  }
}
</script>

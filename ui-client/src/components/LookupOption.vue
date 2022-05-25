<template>
  <div>
    <span class="block text-6xl font-bold mb-1">Look up option</span>
    <div class="text-6xl text-primary font-bold mb-9">in Experlogix</div>
    <div class="mt-6 flex">
      <span class="p-float-label">
        <InputText
          v-model="option_key"
          class="p-inputtext-lg"
          id="item_no"
          type="text"
          style="min-width: 350px;"
          @keydown.enter="getInfo"
        />
        <label
          for="item_no"
          class="text-lg"
        >Option Key</label>
      </span>
      <Button
        class="ml-2"
        label="Search"
        :disabled="!option_key"
        @click="getInfo"
      />
    </div>
    <div class="mt-2 text-xs">
      Uncheck Admin View in Experlogix and then copy the <code>ComponentAssemblyOptions</code> value that you need to update. There may be more than one if you have multiple options in your configuration.
    </div>
    <div class="mt-2 text-xs">
      An example would be <code>451279AS02LGF100115880</code>.
    </div>
    <div class="mt-2 text-xs">
      This is the glycerin fill for a <code>45 1279 AS 02L</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['sqlResults'])

const option_key = ref('')

async function getInfo () {
  if (!option_key.value) return
  try {
    emit('sqlResults', null)
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/getOption`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option_key: option_key.value.toUpperCase() })
    })
    const body = await res.json()
    emit('sqlResults', body)
  } catch (error) {
    console.error(error)
  }
}
</script>

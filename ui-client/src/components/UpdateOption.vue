<template>
  <section class="mt-8">
    <h2 class="text-6xl font-bold mb-9">
      Update option <span class="text-primary">in Experlogix</span>
    </h2>
    <div>
      <div class="flex align-items-center justify-content-start">
        <div>
          <div class="p-inputgroup">
            <span class="p-float-label">
              <InputNumber
                v-model="update.list_price"
                id="list_price"
                locale="en-US"
                :minFractionDigits="2"
                mode="decimal"
                style="max-width: 15em;"
              />
              <label
                for="list_price"
                class="text-lg"
              >
                New List Price
              </label>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <Button
        :disabled="disableUpdateExperlogix"
        class="p-button-info p-button-lg"
        label="Update"
        @click="updateOption"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from "primevue/usetoast"

// Props
const props = defineProps({
  itemInfo: {
    type: Object
  }
})

const toast = useToast()

// Update Data
const update = reactive({
  list_price: null
})
const flow = ref('ready') // updating

const disableUpdateExperlogix = computed(() => {
  const arr = [
    flow.value === 'updating',
    !update.list_price
  ]
  return arr.some(i => i)
})

async function updateOption () {
  try {
    if (flow.value !== 'ready') return
    flow.value = 'updating'
    const obj = {
      key: props.itemInfo.no,
      ...update
    }
    const updateOption = await fetch(`${import.meta.env.VITE_API_BASE_URL}/updateOption`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    const res = await updateOption.json()

    if (res.body.success) {
      sendToast.success(res.body.msg)
    }
    if (!res.body.success) {
      sendToast.error(res.body.msg)
    }
    flow.value = 'ready'
  } catch (error) {
    flow.value = 'ready'
    sendToast.error('Item was not updated')
    console.error(error)
  }
}

const sendToast = {
  success: (msg) => toast.add({ severity: 'success', summary: 'Success', detail: msg, life: 3000 }),
  error: (msg) => toast.add({ severity: 'error', summary: 'Error', detail: msg, life: 3000 })
}
</script>

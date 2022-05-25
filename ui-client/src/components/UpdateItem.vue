<template>
  <section>
    <h2 class="text-6xl font-bold mb-9">
      Update item <span class="text-primary">in NAV</span>
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
        <div class="ml-2">
          <ToggleButton
            v-model="update.update_list_price"
            onLabel="Update List Price"
            onIcon="pi pi-check"
            offLabel="Skip List Price"
            offIcon="pi pi-times"
            style="width: 15em"
          />
        </div>
      </div>
    </div>
    <div class="mt-6">
      <div class="flex align-items-center justify-content-start">
        <div>
          <div class="p-inputgroup">
            <span class="p-float-label">
              <InputNumber
                v-model="update.standard_cost"
                class="text-3xl"
                large
                id="standard_cost"
                locale="en-US"
                :minFractionDigits="3"
                mode="decimal"
                style="max-width: 15em;"
              />
              <label
                for="standard_cost"
                class="text-lg"
              >
                New Standard Cost
              </label>
            </span>
          </div>
        </div>
        <div class="ml-2">
          <ToggleButton
            v-model="update.update_standard_cost"
            onLabel="Update Standard Cost"
            onIcon="pi pi-check"
            offLabel="Skip Standard Cost"
            offIcon="pi pi-times"
            style="width: 15em"
          />
        </div>
      </div>
    </div>
    <div class="mt-6">
      <Button
        :disabled="disableUpdateItemNav"
        class="p-button-info p-button-lg"
        label="Update"
        @click="updateItem('nav')"
      />
    </div>
  </section>

  <section class="mt-8">
    <h2 class="text-6xl font-bold mb-9">
      Update item <span class="text-primary">in Experlogix</span>
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
        <div class="ml-2">
          <ToggleButton
            v-model="update.update_list_price"
            onLabel="Update List Price"
            onIcon="pi pi-check"
            offLabel="Skip List Price"
            offIcon="pi pi-times"
            style="width: 15em"
          />
        </div>
      </div>
    </div>
    <div class="mt-6">
      <Button
        :disabled="disableUpdateItemExperlogix"
        class="p-button-info p-button-lg"
        label="Update"
        @click="updateItem('experlogix')"
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
  standard_cost: null,
  list_price: null,
  update_list_price: true,
  update_standard_cost: true
})
const flow = ref('ready') // updating

const disableUpdateItemNav = computed(() => {
  const arr = [
    flow.value === 'updating',
    !!update.update_list_price && !update.list_price,
    !!update.update_standard_cost && !update.standard_cost,
    !update.update_list_price && !update.update_standard_cost
  ]
  return arr.some(i => i)
})

const disableUpdateItemExperlogix = computed(() => {
  const arr = [
    flow.value === 'updating',
    !!update.update_list_price && !update.list_price
  ]
  return arr.some(i => i)
})

async function updateItem (app) {
  try {
    if (flow.value !== 'ready') return
    flow.value = 'updating'
    const obj = {
      item_no: props.itemInfo.item_no,
      app,
      ...update
    }
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/updateItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    // const body = await res.json()

    sendToast.success(`Item updated in ${app}`)
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
<template>
  <NavBar />
  <div class="grid surface-section text-800 p-4 mx-8">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex">
      <section>
        <LookupItem @sql-results="response = $event" />
        <ItemLookUpInfoCardVue
          v-if="itemInfo"
          type="nav"
          :item-info="itemInfo"
        />
        <ItemLookUpInfoCardVue
          v-if="itemInfo"
          type="experlogix"
          :item-info="itemInfo"
        />
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <UpdateItem :item-info="itemInfo" />
    </div>
    <div
      v-if="response"
      class="col-12 p-6 fadein animation-duration-300 overflow-scroll"
    >
      Response
      <pre class=" p-4 surface-card border-round">
  {{ response }}
            </pre>
    </div>
  </div>
  <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import NavBar from './NavBar.vue'
import LookupItem from './components/LookupItem.vue'
import ItemLookUpInfoCardVue from './components/ItemLookUpInfoCard.vue'
import UpdateItem from './components/UpdateItem.vue'

const response = ref(null)

const itemInfo = computed(() => {
  if (!response.value) return null
  return response.value.body.results
})

</script>

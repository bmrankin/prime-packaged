<template>
  <NavBar @set-active-view="activeView = $event; response = null" />
  <div
    v-if="activeView === 'option'"
    class="grid surface-section text-800 p-4 mx-8"
  >
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex">
      <section>
        <LookupOption @sql-results="response = $event" />
        <InfoCard
          v-if="itemInfo"
          type="option"
          :item-info="itemInfo"
        />
      </section>
    </div>
     <div class="col-12 md:col-6 overflow-hidden">
      <UpdateOption :item-info="itemInfo" />
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
  <div
    v-if="activeView === 'item'"
    class="grid surface-section text-800 p-4 mx-8"
  >
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex">
      <section>
        <LookupItem @sql-results="response = $event" />
        <InfoCard
          v-if="itemInfo"
          type="nav"
          :item-info="itemInfo"
        />
        <InfoCard
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
import LookupOption from './components/LookupOption.vue'
import InfoCard from './components/InfoCard.vue'
import UpdateItem from './components/UpdateItem.vue'
import UpdateOption from './components/UpdateOption.vue'

const response = ref(null)

const activeView = ref('option')

const itemInfo = computed(() => {
  if (!response.value) return null
  return response.value.body.results
})

</script>

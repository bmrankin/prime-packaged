<template>
  <Card class="mt-4 fadein animation-duration-300">
    <template #title>
      {{ config[type].title }}
    </template>
    <template #content>
      <template v-if="!itemInfo[config[type].exists]">
        <div>
          Does not exist in database
        </div>
      </template>
      <ul v-else class="list-none p-0 m-0">
        <ListItemKeyValueVue
          v-for="i in config[type].listItems"
          :key="i.prop"
          :label="i.label"
          :value="itemInfo[i.prop] || '-'"
        />
      </ul>
    </template>
  </Card>
</template>

<script setup>
import ListItemKeyValueVue from './ListItemKeyValue.vue'

// props
defineProps({
  type: {
    type: String // nav, experlogix, option
  },
  itemInfo: {
    type: Object
  }
})

const config = {
  nav: {
    exists: 'exists_nav',
    title: 'NAV Data',
    listItems: [
      {
        label: 'Item No',
        prop: 'item_no'
      },
      {
        label: 'Description',
        prop: 'desc_nav'
      },
      {
        label: 'Unit List Price',
        prop: 'list_price_nav'
      },
      {
        label: 'Standard Cost',
        prop: 'standard_cost_nav'
      },
    ]
  },
  experlogix: {
    exists: 'exists_experlogix',
    title: 'Experlogix Data',
    listItems: [
      {
        label: 'Item No',
        prop: 'item_no'
      },
      {
        label: 'Description',
        prop: 'desc_experlogix'
      },
      {
        label: 'List Price',
        prop: 'list_price_experlogix'
      }
    ]
  },
  option: {
    exists: 'exists',
    title: 'Experlogix Option',
    listItems: [
      {
        label: 'List Price',
        prop: 'list_price'
      },
      {
        label: 'Key (PseudoNo)',
        prop: 'no'
      },
      {
        label: 'Family',
        prop: 'family'
      },
      {
        label: 'Display Option',
        prop: 'displayOption'
      },
      {
        label: 'Option Code',
        prop: 'optionCode'
      },
      {
        label: 'Description',
        prop: 'desc'
      },
      {
        label: 'Feature',
        prop: 'feature'
      },
      {
        label: 'Feature Description',
        prop: 'featureDesc'
      },
      {
        label: 'XOR',
        prop: 'xor'
      },
      {
        label: 'XOR Required',
        prop: 'requiredXOR'
      },
      {
        label: 'Component Item No',
        prop: 'componentItemNo'
      },
      {
        label: 'Qty Per',
        prop: 'qtyPer'
      },
      {
        label: 'Net Adder',
        prop: 'netAdder'
      }
    ]
  }
}
</script>

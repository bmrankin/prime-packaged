import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import Button from 'primevue/button'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Spacer from './components/Spacer.vue'
import Toast from 'primevue/toast'
import ToggleButton from 'primevue/togglebutton'

import Tooltip from 'primevue/tooltip'


import 'primevue/resources/themes/vela-orange/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)

// Add global directives
app.directive('tooltip', Tooltip)

// Add global components
app.component('Button', Button)
app.component('Card', Card)
app.component('Divider', Divider)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Spacer', Spacer)
app.component('Toast', Toast)
app.component('ToggleButton', ToggleButton)

app.mount('#app')

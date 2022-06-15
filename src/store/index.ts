import { createPinia } from 'pinia'
import { userStore } from './modules/user'

const pinia = createPinia()

export { userStore }
export default pinia

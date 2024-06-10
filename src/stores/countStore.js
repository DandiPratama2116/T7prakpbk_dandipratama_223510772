import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCountStore = defineStore('count', () => {
    const count = ref(5)
    const name = ref('Eduardo')
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    return { count, name, doubleCount, increment}
})
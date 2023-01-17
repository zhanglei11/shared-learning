
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
//混入 为了公用字典
export default defineComponent({
  name: 'mixin',
  setup() {
    const store = useStore()
    const getDictionary = (type:string, val:string | number | null) => {
      let data = computed(() => {
        return store.state.user.dictionaryInfo[type]
      })
      let name = ''
      for (var key in data.value) {
        if (data.value[key].value == val) name = data.value[key].name
      }
      return name
    }
    return {
      getDictionary
    }
  }
})


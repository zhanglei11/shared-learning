
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { VITE_API_URL } from '@/config'
export default defineComponent({
  name: 'websocket',
  setup() {
    onMounted(() => {
      initWebSocket()
    })
    onUnmounted(() => {
      closeWebSocket()
    })

    //websocket
    const websock = ref()
    const websocketMessageName = ref()
    const wsUrl = `ws://${VITE_API_URL}/smart-audit/api/webSocket` //链接地址
    const initWebSocket = () => {
      console.log('开始çç连接')
      //初始化
      websock.value = new WebSocket(wsUrl)
      websock.value.onopen = () => {
        console.log('连接成功')
      }
      websock.value.onerror = () => {
        console.log('连接错误')
      }
      websock.value.onmessage = (e: any) => {
        websocketMessageName.value = e.data
      }
    }

    //关闭链接（在页面销毁时可销毁链接）
    const closeWebSocket = () => {
      websock.value.close()
      websock.value = null
    }

    return {
      websocketMessageName,
    }
  }
})


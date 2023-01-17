<template>
  <!--开启摄像头的弹窗-->
  <a-image :src="imgSrc" v-if="imgSrc" style="width: 100%; height: 100%"></a-image>
  <!--开启摄像头的拍照和-->
  <a-dialog title="拍照上传" :visible.sync="visible" @close="onCancel1" width="1065px">
    <div class="box">
      <video
        id="videoCamera"
        class="canvas"
        :width="videoWidth"
        :height="videoHeight"
        autoPlay
      ></video>
      <canvas
        id="canvasCamera"
        class="canvas"
        style="display: none"
        :width="videoWidth"
        :height="videoHeight"
      ></canvas>
    </div>
    <div slot="footer">
      <a-button @click="drawImage" size="small"> 拍照 </a-button>
      <a-button @click="getCompetence" size="small"> 打开摄像头 </a-button>
      <a-button @click="stopNavigator" size="small"> 关闭摄像头 </a-button>
      <a-button @click="resetCanvas" size="small"> 重置 </a-button>
      <a-button @click="onCancel" size="small"> 完成 </a-button>
      <a-button @click="down" size="small"> 下载 </a-button>
    </div>
  </a-dialog>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, nextTick } from 'vue'
const router = useRouter()
const route = useRoute()
const url = ref()
const visible = ref(false)
const videoWidth = ref(500)
const videoHeight = ref(300)
const os = ref(false)
const thisCancas = ref(null)
const thisContext = ref(null)
const thisVideo = ref(null)
const imgSrc = ref(null)
const imgFile = ref(null)

/*调用摄像头拍照开始*/
const onTake = () => {
  visible.value = true
  getCompetence()
}

/*关闭弹窗，以及关闭摄像头功能*/
const onCancel1 = () => {
  visible.value = false
  stopNavigator() // 关闭摄像头
}

// 调用摄像头权限
const getCompetence = () => {
  //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
  nextTick(() => {
    // const _this = this
    os.value = false //切换成关闭摄像头
    // 获取画布节点
    thisCancas.value = document.getElementById('canvasCamera')
    // 为画布指定绘画为2d类型
    thisContext.value = thisCancas.value.getContext('2d')
    //获取video节点
    thisVideo.value = document.getElementById('videoCamera')
    // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
    if (navigator.mediaDevices === undefined) {
      navigator.menavigatordiaDevices = {}
    }
    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    // 使用getUserMedia，因为它会覆盖现有的属性。
    // 这里，如果缺少getUserMedia属性，就添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia =  (constraints) => {
        // 首先获取现存的getUserMedia(如果存在)
        let getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
        // 有些浏览器不支持，会返回错误信息
        // 保持接口一致
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
        }
        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
        return new Promise( (resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject)
        })
      }
    }
    const constraints = {
      audio: false,
      video: {
        width: videoWidth.value,
        height: videoHeight.value,
        transform: 'scaleX(-1)'
      }
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in thisVideo.value) {
          thisVideo.value.srcObject = stream
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          thisVideo.value.src = window.URL.createObjectURL(stream)
        }
        thisVideo.value.onloadedmetadata = (e) => {
          thisVideo.value.play()
        }
      })
      .catch((err) => {
        // this.$notify({
        //   title: '警告',
        //   message: '没有开启摄像头权限或浏览器版本不兼容.',
        //   type: 'warning'
        // })
      })
  })
}

//调用摄像头 --- 进行绘制图片
const drawImage = () => {
  // 点击，canvas画图
  thisContext.value.drawImage(thisVideo.value, 0, 0, videoWidth.value, videoHeight.value)
  // 获取图片base64链接
  imgSrc.value = thisCancas.value.toDataURL('image/png')

  /*const imgSrc=this.imgSrc;*/
}
//清空画布
const clearCanvas = (id) => {
  let c = document.getElementById(id)
  let cxt = c.getContext('2d')
  cxt.clearRect(0, 0, c.width, c.height)
}

//重置画布
const resetCanvas = () => {
  clearCanvas('canvasCamera')
}

//关闭摄像头
const stopNavigator = () => {
  if (thisVideo.value && thisVideo.value !== null) {
    thisVideo.value.srcObject.getTracks()[0].stop()
    os.value = true //切换成打开摄像头
  }
}
/*调用摄像头拍照结束*/

/*完成拍照并对其照片进行上传*/
const onCancel = () => {
  visible.value = false
  imgFile.value = dataURLtoFile(imgSrc.value, new Date() + '.png')
  stopNavigator()
  // 提交上传
  // let data = new FormData()
  // data.append('photo', imgFile.value) //1是图片，2是视频
  // data.append("code", this.addForm.code);
}

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const down = () => {
  let date = new Date()
  if (!imgSrc.value) return
  let aLink = document.createElement('a') // 创建一个a标签
  let blob = base64ToBlob(imgSrc.value)
  let event = document.createEvent('HTMLEvents')
  event.initEvent('click', true, true)
  aLink.download = date.getTime() + '.' + blob.type.split('/')[1] // 使用时间戳给文件命名
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

// base64转Blob对象
const base64ToBlob = (code) => {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length
  let uint8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; i++) {
    uint8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uint8Array], { type: contentType })
}
</script>

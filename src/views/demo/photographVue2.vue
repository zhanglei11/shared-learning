<template>
  <!--开启摄像头的弹窗-->
  <!-- <div class="info2" @click="onTake">
    <a-image :src="url" style="width: 100%; height: 100%"></a-image>
  </div> -->
  <a-image :src="imgSrc" style="width: 100%; height: 100%"></a-image>
  <!--开启摄像头的拍照和-->
  <a-dialog title="拍照上传" :visible.sync="visible" @close="onCancel1" width="1065px">
    <div class="box">
      <video
        id="videoCamera"
        class="canvas"
        :width="videoWidth"
        :height="videoHeight"
        autoPlay
      ></video
      >4444
      <canvas id="canvasCamera" class="canvas" :width="videoWidth" :height="videoHeight"></canvas>
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
<script>
export default {
  name: 'LoginIndex',
  components: {},
  data() {
    return {
      url: '', // 上传的图片的地址
      visible: false, //弹窗
      videoWidth: 500, // 绘画布的宽高
      videoHeight: 400,
      os: false, //控制摄像头开关
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      imgSrc: undefined,
      imgFile: null
    }
  },
  onMounted() {},
  created() {},
  watch: {},
  methods: {
    /*调用摄像头拍照开始*/
    onTake() {
      this.visible = true
      this.getCompetence()
    },

    /*关闭弹窗，以及关闭摄像头功能*/
    onCancel1() {
      this.visible = false
      this.stopNavigator() // 关闭摄像头
    },

    // 调用摄像头权限
    getCompetence() {
      //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this
        this.os = false //切换成关闭摄像头
        // 获取画布节点
        this.thisCancas = document.getElementById('canvasCamera')
        // 为画布指定绘画为2d类型
        this.thisContext = this.thisCancas.getContext('2d')
        //获取video节点
        this.thisVideo = document.getElementById('videoCamera')
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia =
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        const constraints = {
          audio: false,
          video: {
            width: _this.videoWidth,
            height: _this.videoHeight,
            transform: 'scaleX(-1)'
          }
        }
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ('srcObject' in _this.thisVideo) {
              _this.thisVideo.srcObject = stream
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream)
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play()
            }
          })
          .catch((err) => {
            this.$notify({
              title: '警告',
              message: '没有开启摄像头权限或浏览器版本不兼容.',
              type: 'warning'
            })
          })
      })
    },

    //调用摄像头 --- 进行绘制图片
    drawImage() {
      // 点击，canvas画图
      this.thisContext.drawImage(this.thisVideo, 0, 0, this.videoWidth, this.videoHeight)
      // 获取图片base64链接
      this.imgSrc = this.thisCancas.toDataURL('image/png')

      /*const imgSrc=this.imgSrc;*/
    },
    //清空画布
    clearCanvas(id) {
      let c = document.getElementById(id)
      let cxt = c.getContext('2d')
      cxt.clearRect(0, 0, c.width, c.height)
    },

    //重置画布
    resetCanvas() {
      // this.imgSrc = "";
      this.clearCanvas('canvasCamera')
    },

    //关闭摄像头
    stopNavigator() {
      if (this.thisVideo && this.thisVideo !== null) {
        this.thisVideo.srcObject.getTracks()[0].stop()
        this.os = true //切换成打开摄像头
      }
    },
    /*调用摄像头拍照结束*/

    /*完成拍照并对其照片进行上传*/
    onCancel() {
      this.visible = false
      /* this.resetCanvas();*/
      // console.log(this.imgSrc);
      this.imgFile = this.dataURLtoFile(this.imgSrc, new Date() + '.png')
      console.log(this.imgFile)
      this.stopNavigator()
      // let par = {
      //   photo: this.imgFile,
      // };
      let data = new FormData()
      data.append('photo', this.imgFile) //1是图片，2是视频
      // data.append("code", this.addForm.code);
      console.log(data)
      // checkbeforepersonalphoto上传图片的接口
      checkbeforepersonalphoto(data).then((res) => {
        if (res.code == '1') {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.url = res.data
        }
      })
    },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },


    down() {
      var date = new Date()
      if (!this.imgSrc) {
        return
      }
      var aLink = document.createElement('a') // 创建一个a标签
      var blob = this.base64ToBlob(this.imgSrc)
      var event = document.createEvent('HTMLEvents')
      event.initEvent('click', true, true)
      aLink.download = date.getTime() + '.' + blob.type.split('/')[1] // 使用时间戳给文件命名
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
    },
    // base64转Blob对象
    base64ToBlob(code) {
      var parts = code.split(';base64,')
      var contentType = parts[0].split(':')[1]
      var raw = window.atob(parts[1])
      var rawLength = raw.length
      var uint8Array = new Uint8Array(rawLength)
      for (var i = 0; i < rawLength; i++) {
        uint8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uint8Array], { type: contentType })
    }
  }
}
</script>
<style lang="less">
// .info2 {
//   width: 10%;
//   height: 100px;
// }
// .box {
//   display: flex;
// }
</style>

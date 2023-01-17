<template>
  <div id="img-area" ref="imgRef">
    <li v-for="(item, index) in imgList" :key="index">
      <button @click="previewImage(index)">
        <img :src="item" alt="" style="width: 100px" />
      </button>
    </li>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
// import Viewer from '@/lib/viewerjs-main'
// import '@/lib/viewerjs-main/dist/viewer.css'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
const imgList = ref([
  'https://img1.baidu.com/it/u=1589914872,3919858087&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
  'https://img1.baidu.com/it/u=2580640161,663510376&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889'
])
const imgRef = ref()
const previewImage = (index) => {
  // const box = document.querySelector('#img-area')
  const box = imgRef.value
  if (box) {
    const photoViewer = new Viewer(box, {
      inline: false, // 是否启用 inline 模式
      fullscreen: true, // 播放时是否全屏
      title: false, // 是否显示当前图片的标题
      toolbar: {
        // 显示工具栏
        // 下面各种按钮1显示，0隐藏，可自定义按钮大小和点击事件
        zoomIn: 1, // 放大图片
        zoomOut: 1, //缩小图片
        oneToOne: 1, // 图片比例100%
        reset: 1, // 重置图片大小
        prev: 1, // 查看上一张图片
        play: 0, // 播放图片
        next: 1, // 查看下一张图片
        rotateLeft: 1, // 向左旋转图片
        rotateRight: 1, // 向右旋转图片
        flipHorizontal: 1, // 图片左右翻转
        flipVertical: 1 // 图片上下翻转photo
      },
      // url:'https://img.tukuppt.com/-big/00/00/94/6152bc0ce6e5d805.jpg',
      // 定义用于查看的图像的初始索引
      initialViewIndex: index,
      ready() {
        console.log('ready')
      },
      show() {
        console.log('show')
      },
      shown() {
        console.log('shown')
      },
      view() {
        console.log('view')
      },
      viewed() {
        console.log('viewed')
      },
      move() {
        console.log('move')
      },
      moved() {
        console.log('moved')
      },
      rotate() {
        console.log('rotate')
      },
      rotated() {
        console.log('rotated')
      },
      scale() {
        console.log('scale')
      },
      scaled() {
        console.log('scaled')
      },
      zoom() {
        console.log('zoom')
      },
      zoomed() {
        console.log('zoomed')
      },
      play() {
        console.log('play')
      },
      stop() {
        console.log('stop')
      },
      // 每次关闭查看时触发
      hide() {
        console.log(1)
        photoViewer.destroy()
      },
      // 每次关闭查看时触发，在hide之后
      hidden() {
        console.log(2)
        photoViewer.destroy()
      },
      // 每次查看时触发
      show() {
        console.log(3)
        photoViewer.full()
      }
    })
    photoViewer.show()
  }
}
</script>

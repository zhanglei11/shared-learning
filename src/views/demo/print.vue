<template>
  <div ref="divRef1">
    <a-card :bordered="false">
      <BzPrintImage
        :ptintValue="id"
        ptintMold="tagsDirect"
        ptintTitle="直接打印"
        ptintType="text"
        ptintSize="large"
        ptintClass="mr20"
      />
      <BzPrintImage
        :ptintValue="123"
        ptintMold="tagsPreview"
        :ptintDanger="true"
        ptintTitle="打印预览"
        :ptintGhost="true"
        ptintIcon="PrinterOutlined"
      />
    </a-card>
  </div>
  <a-card :bordered="false">
    <BzPrintImage :ptintValue="divRef" ptintClass="mr20" />
    <BzPrintImage :ptintValue="divRef1" />
  </a-card>
  <a-card :bordered="false">
    <BzPrintImage :ptintButtonShow="false" ref="allPrintRef" />
    <a-button type="primary" @click="clickAll">批量打印</a-button>
  </a-card>
  <div ref="divRef">
    <div id="mainBar" ref="mainBar" style="width: 100%; height: 500px"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { init } from "echarts";
const divRef = ref();
const divRef1 = ref();
const mainBar = ref();
const id = ref(11111);
const ptintStyle = ref({ display: "none" });
const myChart = () => {
  let barChart = init(document.getElementById("mainBar"));
  const option = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  barChart.setOption(option);
  const chartObserver = new ResizeObserver(() => {
    barChart.resize();
  });
  chartObserver.observe(mainBar.value);
  window.onresize = barChart.resize;
};

const allPrintRef = ref()
const clickAll = () => {
  let a = ['11','22',"33",'55','99']
  allPrintRef.value.printBatch(a)
}
onMounted(() => {
  myChart();
});
</script>

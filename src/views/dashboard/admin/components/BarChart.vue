<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
//柱状图
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      var day7=this.getDay(0).substring(5)
      var day6=this.getDay(-1).substring(5)
      var day5=this.getDay(-2).substring(5)
      var day4=this.getDay(-3).substring(5)
      var day3=this.getDay(-4).substring(5)
      var day2=this.getDay(-5).substring(5)
      var day1=this.getDay(-6).substring(5)

      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: [day1, day2, day3, day4, day5, day6, day7],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration
        }]
      })
    },
    getDay(day){
  
 　　var today = new Date();
  
  
  
 　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
  
  
  
 　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
  
  
  
 　　var tYear = today.getFullYear();
  
 　　var tMonth = today.getMonth();
  
 　　var tDate = today.getDate();
  
 　　tMonth = this.doHandleMonth(tMonth + 1);
  
 　　tDate =this.doHandleMonth(tDate);
  
 　　return tYear+"-"+tMonth+"-"+tDate;
  
 },
  doHandleMonth(month){
  
 　　var m = month;
  
 　　if(month.toString().length == 1){
  
 　　　　m = "0" + month;
  
 　　}
  
 　　return m;
  
 }





  }
}
</script>

<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
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
,
    setOptions({ expectedData, actualData } = {}) {

      var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
      var week7 = weekArray[new Date(this.getDay(0)).getDay()];//注意此处必须是先new一个Date
      var week6 = weekArray[new Date(this.getDay(-1)).getDay()];//注意此处必须是先new一个Date
      var week5 = weekArray[new Date(this.getDay(-2)).getDay()];//注意此处必须是先new一个Date
      var week4 = weekArray[new Date(this.getDay(-3)).getDay()];//注意此处必须是先new一个Date
      var week3 = weekArray[new Date(this.getDay(-4)).getDay()];//注意此处必须是先new一个Date
      var week2 = weekArray[new Date(this.getDay(-5)).getDay()];//注意此处必须是先new一个Date
      var week1 = weekArray[new Date(this.getDay(-6)).getDay()];//注意此处必须是先new一个Date
      var day7=this.getDay(0).substring(5)+"("+"周"+week7+")";
      var day6=this.getDay(-1).substring(5)+"("+"周"+week6+")";
      var day5=this.getDay(-2).substring(5)+"("+"周"+week5+")";
      var day4=this.getDay(-3).substring(5)+"("+"周"+week4+")";
      var day3=this.getDay(-4).substring(5)+"("+"周"+week3+")";
      var day2=this.getDay(-5).substring(5)+"("+"周"+week2+")";
      var day1=this.getDay(-6).substring(5)+"("+"周"+week1+")";

      this.chart.setOption({
        xAxis: {
          data: [day1,day2,day3,day4,day5,day6,day7],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['上周', '本周']
        },
        series: [{
          name: '上周', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '本周',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}




  




</script>

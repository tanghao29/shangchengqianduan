<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
//中间的蝴蝶图
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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      jymq:[],
      countliebie:[]

    }
  },
  mounted() {

    this.jymqs();
    this.countliebies();

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    jymqs(){
        var a=this;
		this.$axios.get('/shopping_mall/commodityclassification/jymq')
		.then(function (response) {
     a.jymq=response;
     a.initChart()
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});
    },
    countliebies(){

        var a=this;
		this.$axios.get('/shopping_mall/commodityclassification/countliebie')
		.then(function (response) {
      a.countliebie=response;
      a.initChart();
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});
    },
    initChart() {
      var a=this;
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: a.jymq
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: a.countliebie,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>

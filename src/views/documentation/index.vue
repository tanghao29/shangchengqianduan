<template>
  <div class="dashboard-editor-container">
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">
    <el-button-group>
  <el-button type="primary" @click="yesterday">昨天</el-button>
  <el-button type="primary" @click="lastweek">最近7天</el-button>
  <el-button type="primary" @click="recentmonth">最近30天</el-button>
 </el-button-group>
    <el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
     <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div></el-col>
</el-row>
  <el-row>
  <el-col :span="12.1"><div class="grid-content bg-purple">
     <br><br><br>
     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="browsecount"
      label="浏览人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ordersCount"
      label="下单人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ordersCounts"
      label="订单数"
       width="180">
    </el-table-column>
      <el-table-column
      prop="sumofnumber"
      label="下单件数"
        width="180">
    </el-table-column>
      <el-table-column
      prop="yxordersCounts"
      label="有效订单数"
        width="180">
    </el-table-column>
      <el-table-column
      prop="ordersMontey"
      label="下单金额"
      width="180">
    </el-table-column>
  </el-table>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="refundMoney"
      label="退款金额"
      width="180">
    </el-table-column>
    <el-table-column
      prop="paymentCount"
      label="付款人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="paymentOrderCount"
      label="付款订单数"
       width="180">
    </el-table-column>
      <el-table-column
      prop="paymentOfnumber"
      label="付款件数"
        width="180">
    </el-table-column>
      <el-table-column
      prop="paymentOfmoney"
      label="付款金额"
        width="180">
    </el-table-column>
      <el-table-column
      prop="kdj"
      label="客单价"
      width="180">
    </el-table-column>
  </el-table>
    </div></el-col>
  <el-col :span="11.9"><div class="grid-content bg-purple-light">
     <div id="chartColumn" style="width:600%; height: 300px;"></div>
    </div></el-col>
</el-row>
  </div>
</template>

<script>
   import echarts from 'echarts'


export default {
      data() {
      return {
        tableData: [
          {browsecount:"",ordersCount:"",ordersCounts:"",sumofnumber:"",yxordersCounts:"",ordersMontey:"",refundMoney:"",paymentCount:"",paymentOrderCount:""
          ,paymentOfnumber:"",
          paymentOfmoney:"",
          kdj:""
          }
        ],
        chartColumn: null,
          pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
        
      }
    },
    mounted() {
      this.searchbrowse();
      this.ordersCount();
      this.ordersCounts();
      this.sumofnumber();
      this.yxordersCounts();
      this.ordersMontey();
      this.refundMoney();
      this.paymentCount();
      this.paymentOrderCount();
      this.paymentOfnumber();
      this.paymentOfmoney();

        this.drawLine();
  },
   methods: {
     search(){
       var time=this.value7;
      this.searchbrowse(4,time);
    
     },
     yesterday(){
      this.searchbrowse(1);
      this.ordersCount(1);
      this.ordersCounts(1);
      this.sumofnumber(1);
      this.yxordersCounts(1);
      this.ordersMontey(1);
      this.refundMoney(1);
      this.paymentCount(1);
      this.paymentOrderCount(1);
      this.paymentOfnumber(1);
      this.paymentOfmoney(1);
     },
     lastweek(){
      this.searchbrowse(2);
      this.ordersCount(2);
      this.ordersCounts(2);
      this.sumofnumber(2);
      this.yxordersCounts(2);
      this.ordersMontey(2);
      this.refundMoney(2);
      this.paymentCount(2);
      this.paymentOrderCount(2);
      this.paymentOfnumber(2);
      this.paymentOfmoney(2);
     },
     recentmonth(){
      this.searchbrowse(3);
      this.ordersCount(3);
      this.ordersCounts(3);
      this.sumofnumber(3);
      this.yxordersCounts(3);
      this.ordersMontey(3);
      this.refundMoney(3);
      this.paymentCount(3);
      this.paymentOrderCount(3);
      this.paymentOfnumber(3);
      this.paymentOfmoney(3);
     },
     searchbrowse(e,time){
       
       	 this.$axios
				.get('/abc/browse/searchbrowse',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].browsecount=res   
				})
				.catch((err) => {
				console.log(err);
        });
      
     },
     ordersCount(e,time){
           	  this.$axios
				.get('/abc/browse/ordersCount',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].ordersCount=res
				})
				.catch((err) => {
				console.log(err);
        });
     },
     ordersCounts(e,time){
        	  this.$axios
				.get('/abc/browse/ordersCounts',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].ordersCounts=res
				})
				.catch((err) => {
				console.log(err);
        });
       
     },
     sumofnumber(e,time){

     	  this.$axios
				.get('/abc/browse/sumofnumber',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].sumofnumber=res
				})
				.catch((err) => {
				console.log(err);
        });

     },
     yxordersCounts(e,time){
  this.$axios
				.get('/abc/browse/yxordersCounts',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].yxordersCounts=res
				})
				.catch((err) => {
				console.log(err);
        });
       
     },
     ordersMontey(e,time){

  this.$axios
				.get('/abc/browse/ordersMontey',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].ordersMontey=res
				})
				.catch((err) => {
				console.log(err);
        });

     },
     refundMoney(e,time){

 this.$axios
				.get('/abc/browse/refundMoney',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].refundMoney=res
				})
				.catch((err) => {
				console.log(err);
        });

     },
    paymentCount(e,time){
      this.$axios
      			.get('/abc/browse/paymentCount',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].paymentCount=res
				})
				.catch((err) => {
				console.log(err);
        });

    },
    paymentOrderCount(e,time){
      this.$axios
      			.get('/abc/browse/paymentOrderCount',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].paymentOrderCount=res
				})
				.catch((err) => {
				console.log(err);
        });
    },
    paymentOfnumber(e,time){
           this.$axios
      			.get('/abc/browse/paymentOfnumber',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].paymentOfnumber=res
				})
				.catch((err) => {
				console.log(err);
        });
    },
    paymentOfmoney(e,time){
         this.$axios
      			.get('/abc/browse/paymentOfmoney',{
              params:{
                  nb:e,
                  time:time
             }
        })
				.then((res) => {
                  this.tableData[0].paymentOfmoney=res
                  this.tableData[0].kdj= this.tableData[0].paymentOfmoney/this.tableData[0].paymentCount
				})
				.catch((err) => {
				console.log(err);
        });

    },

    drawLine(){

         this.chartColumn = echarts.init(document.getElementById('chartColumn'));

         this.chartColumn.setOption({
              title: {
        text: '漏斗图',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data: ['浏览','下单','付款']
    },

    series: [
        {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: [
                {value: 60, name: '浏览'},
                {value: 40, name: '下单'},
                {value: 20, name: '付款'}
               
            ]
        }
    ]

        })
    }


   }
}
</script>

<style>

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

</style>
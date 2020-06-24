<template>
  <div class="dashboard-editor-container">
<el-row  >
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
  <el-row style="background:#fff" class="panel-group">
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
<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:50px" >
  <el-col :span="24"><div class="grid-content bg-purple-dark">
      <el-date-picker
      v-model="value6"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
     </el-date-picker>
     <el-button type="primary" icon="el-icon-search" @click="search2">搜索</el-button>
     <el-tooltip placement="top">
     <div slot="content"><h3>说明</h3>
下单转化率：下单人数/浏览人数*100%<br>

付款转化率：付款人数/下单人数*100%<br>

成交转化率：付款人数/浏览人数*100%<br>

客单价：付款总金额/付款订单数</div>
   <span class="el-icon-message-solid" id="yd"></span>
     
</el-tooltip>
      <div id="zxcolumn" style="width:100%; height: 350px;"></div>
    </div></el-col>
</el-row>

<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:50px">
  <el-col :span="24"><div class="grid-content bg-purple-dark">
     <el-date-picker
      v-model="value8"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
     </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="search3">搜索</el-button>
     <div id="histogramcolumn" style="width:100%; height: 350px;"></div>
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
        value8:'',
        zxPaymentOfnumber:[],
        zxRefundMoney:[],
        zxPaymentCount:[],
        zxPaymentOfnumberUser:[],
        zxOrderPercentConversion:[],
        zxPaymentPercentConversion:[],
        zxMakePercentConversion:[],
        zxsearch2date:[],
        mqHistogramcolumnsss:[]
        
      }
    },
    mounted() {


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

          this.zxsearch2date=[day1,day2,day3,day4,day5,day6,day7];

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

    
      //折线统计图
      this.zxPaymentOfnumbers(6,-1);
      this.zxRefundMoneys(6,-1);
      this.zxPaymentCounts(6,-1);
      this.zxPaymentOfnumberUsers(6,-1);
      this.zxOrderPercentConversions(6,-1)
      this.zxPaymentPercentConversions(6,-1)
      this.zxMakePercentConversions(6,-1)

      //柱状图
      this.initmqHistogramcolumn();
  },
   methods: {
     search3(){
           var time=this.value8;
              if(time=="" ||time==null ){
                   //柱状图
                this.initmqHistogramcolumn();
              }else{
              var d = new Date(time[0]);
              var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              var d2 = new Date(time[1]);
              var date2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();

              this.initmqHistogramcolumn(date,date2);

              }
     },
     search2(){
         var time=this.value6;

         if(time=="" ||time==null ){
         
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
          this.zxsearch2date=[day1,day2,day3,day4,day5,day6,day7];
          
          //折线统计图
          this.zxPaymentOfnumbers(6,-1);
          this.zxRefundMoneys(6,-1);
          this.zxPaymentCounts(6,-1);
          this.zxPaymentOfnumberUsers(6,-1);
          this.zxOrderPercentConversions(6,-1)
          this.zxPaymentPercentConversions(6,-1)
          this.zxMakePercentConversions(6,-1)


         }else{
           
         var d = new Date(time[0]);
         var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
         var d2 = new Date(time[1]);
         var date2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();

        
         var time1 = new Date();
         var now = time1.valueOf();
         var time2 = new Date(date).valueOf();
         var time3 = new Date(date2).valueOf();
         if(time2>now || time3>now){
           this.$message({
                message:"时间段大于当前时间呦，亲！",
                type: 'warning'
          });

         }
       else if(date==date2){
           this.$message({
                message:"请选择时间段呦，亲！",
                type: 'warning'
        });
           
        }else{
         this.zxsearch2date=getDiffDate(date, date2);
      
         var t=tab(date);
         var e=tab(date2);
        
                //折线统计图
         this.zxPaymentOfnumbers(t,e);
         this.zxRefundMoneys(t,e);
         this.zxPaymentCounts(t,e);
         this.zxPaymentOfnumberUsers(t,e);
         this.zxOrderPercentConversions(t,e);
         this.zxPaymentPercentConversions(t,e);
         this.zxMakePercentConversions(t,e);
         }
         }
     
        

     },
     search(){
         var time=this.value7;
         if(time==null || time==""){

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

         }else{
         var d = new Date(time[0]);
         var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ',' ;
         var d2 = new Date(time[1]);
         var date2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
         var tt=date+date2;
         this.searchbrowse(4,tt);
         this.ordersCount(4,tt);
         this.ordersCounts(4,tt);
         this.sumofnumber(4,tt);
         this.yxordersCounts(4,tt);
         this.ordersMontey(4,tt);
         this.refundMoney(4,tt);
         this.paymentCount(4,tt);
         this.paymentOrderCount(4,tt);
         this.paymentOfnumber(4,tt);
         this.paymentOfmoney(4,tt);
         }
    
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
                  this.drawLine();
				})
				.catch((err) => {
				console.log(err);
        });

    },

    drawLine(){
         var a=this;
         this.chartColumn = echarts.init(document.getElementById('chartColumn'));

         this.chartColumn.setOption({
              title: {
        text: '漏斗图',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}"
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
                {value: a.tableData[0].browsecount, name: '浏览'},
                {value: a.tableData[0].ordersCounts, name: '下单'},
                {value: a.tableData[0].paymentOrderCount, name: '付款'}
               
            ]
        }
    ]

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
  
 },
  //折线统计图
  zxPaymentOfnumbers(t,e){
        var a=this;
        this.$axios
				.get('/abc/browse/zxPaymentOfnumber',{
              params:{
                  start:t,
                  flag:e
             }
        })
				.then((res) => {
                 a.zxPaymentOfnumber=res;
                
				})
				.catch((err) => {
				console.log(err);
        });

      

  },
  zxRefundMoneys(t,e){
        var a=this;
        this.$axios
				.get('/abc/browse/zxRefundMoney',{
              params:{
                  start:t,
                  flag:e
             }
        })
				.then((res) => {
                 a.zxRefundMoney=res;
               
				})
				.catch((err) => {
				console.log(err);
        });
  },zxPaymentCounts(t,e){

    var a=this;
        this.$axios
				.get('/abc/browse/zxPaymentCount',{
              params:{
                  start:t,
                  flag:e
             }
        })
				.then((res) => {
                 a.zxPaymentCount=res;
				})
				.catch((err) => {
				console.log(err);
        });



  },
  zxPaymentOfnumberUsers(t,e){
    var a=this;
        this.$axios
				.get('/abc/browse/zxPaymentOfnumberUser',{
              params:{
                  start:t,
                  flag:e
             }
        })
				.then((res) => {
                 a.zxPaymentOfnumberUser=res;
                
				})
				.catch((err) => {
				console.log(err);
        });

  },
  zxOrderPercentConversions(t,e){
      var a=this;
        this.$axios
				.get('/abc/browse/zxOrderPercentConversion',{
              params:{
                  start:t,
                  flag:e
             }
        })
				.then((res) => {
                 a.zxOrderPercentConversion=res;
                
				})
				.catch((err) => {
				console.log(err);
        });
  },
  zxPaymentPercentConversions(t,e){

        var a=this;
        this.$axios
				.get('/abc/browse/zxPaymentPercentConversion',{
              params:{
                  start:t,
                  flag:e
             }
        })
				.then((res) => {
                 a.zxPaymentPercentConversion=res;
               
				})
				.catch((err) => {
				console.log(err);
        });


  },
  mqq(){
    alert("Xx")
  }
  ,
  zxMakePercentConversions(t,e){
        var a=this;
        this.$axios
				.get('/abc/browse/zxMakePercentConversion',{
              params:{
                  start:t,
                  flag:e
             }
        })
				.then((res) => {
                 a.zxMakePercentConversion=res
                 a.mqZxcolumns()
				})
				.catch((err) => {
				console.log(err);
        });


  },
    mqZxcolumns(){
    
         var a=this;
         this.zxcolumns = echarts.init(document.getElementById('zxcolumn'));
         this.zxcolumns.setOption({


             title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['付款金额', '退款金额', '付款人数', '付款件数', '下单转化率(%)','付款转化率(%)','成交转化率(%)']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: a.zxsearch2date,
            axisLine: {
            lineStyle: {
                color: '#58afed', // X轴及其文字颜色
            }
        } 

        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
            lineStyle: {
                color: '#58afed', // y轴及其文字颜色
            }
        } 

        }
    ],
    series: [
      
        {
            name: '付款金额',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: a.zxPaymentOfnumber
        },
        {
            name: '退款金额',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: a.zxRefundMoney
        },
        {
            name: '付款人数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: a.zxPaymentCount
        },
        {
            name: '付款件数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data:  a.zxPaymentOfnumberUser
        },
        {
            name: '下单转化率(%)',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data:a.zxOrderPercentConversion
        },
        {
            name: '付款转化率(%)',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data:a.zxPaymentPercentConversion
        },
        {
            name: '成交转化率(%)',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: a.zxMakePercentConversion
        }
    ]


         })
    },
    initmqHistogramcolumn(t,e){

        var a=this;
        this.$axios
				.get('/abc/browse/mqHistogramcolumn',{
              params:{
                  starttime:t,
                  endtime:e
             }
        })
				.then((res) => {
                 a.mqHistogramcolumnsss=res
                 a.mqHistogramcolumn()
				})
				.catch((err) => {
				console.log(err);
        });


    },
    //柱状图
     mqHistogramcolumn(){
    
         var a=this;
         this.histogramcolumns = echarts.init(document.getElementById('histogramcolumn'));
         this.histogramcolumns.setOption({


          color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['0-50元', '51-100元', '101-200元', '201-500元', '501-1000元', '1001-5000元', '5001-10000元','10000元以上'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '订单数量',
            type: 'bar',
            barWidth: '60%',
            data:a.mqHistogramcolumnsss
        }
    ]




         })
    }
    


    











   }
}


function getDiffDate(start, end) {

    var startTime = getDate(start);

    var endTime = getDate(end);

    var dateArr = [];

    while ((endTime.getTime() - startTime.getTime()) > 0) {

        var year = startTime.getFullYear();

        var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(),10) + 1) : (startTime.getMonth() + 1);

        var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();

        dateArr.push(year + "-" + month + "-" + day);

        startTime.setDate(startTime.getDate() + 1);

    }


    return dateArr;
    
}

 

function getDate (datestr) {

    var temp = datestr.split("-");

    if (temp[1] === '01') {

        temp[0] = parseInt(temp[0],10) - 1;

        temp[1] = '12';

    } else {

        temp[1] = parseInt(temp[1],10) - 1;

    }

    //new Date()的月份入参实际都是当前值-1

    var date = new Date(temp[0], temp[1], temp[2]);

    return date;

}

     function tab(date){
            var oDate = new Date();
            var nY = oDate.getFullYear();
            var nM = oDate.getMonth();
            var nD = oDate.getDate();
            var newDate = new Date(nY,nM,nD,0,0,0);
            var date = date.split('-');
            var lastDate = new Date(date[0],(date[1]-1),date[2],0,0,0);
            var result = '';
            if(newDate.getTime() >= lastDate.getTime()){
                result =(newDate.getTime()-lastDate.getTime())/86400000;
            }

//             else{
//                 result = date[0]+'年'+date[1]+'月'+date[2]+'日到今天还有（'+ Math.abs(newDate.getTime()-lastDate.getTime())/86400000 +'）天了';
//             }
            return result;
        }

</script>

<style>

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

.panel-group {
  margin-top: 18px;
}

#yd{
  position: absolute;
  right: 100px;
}

</style>
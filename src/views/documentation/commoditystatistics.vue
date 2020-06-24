<template>
    <div class="dashboard-editor-container">
<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px">

   <el-col :span="24" style="background:#DCDFE6;"><div class="grid-content bg-purple-dark">
     <br>
    <h3 style="display: inline;">商品类目销售分析</h3>
    <el-date-picker
      v-model="value"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
     </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
     
    </div><br></el-col>

  <el-col :span="24"><div class="grid-content bg-purple-dark">
 
     <div id="commoditystatistics" style="width:100%; height: 350px;"></div>


      <el-table
    :data="commodityClassificationtable.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
    border
    style="width: 100%">
    <el-table-column
      prop="classname"
      label="分类名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sellcount"
      label="销售数量"
      align="center">
    </el-table-column>
    <el-table-column
      prop="countproportion"
      label="数量比例"
      align="center"  >
    </el-table-column>
      <el-table-column
      prop="sellmoney"
      label="销售金额"
      align="center"  >
    </el-table-column>
      <el-table-column
      prop="moneyproportion"
      label="金额比例"
      align="center" >
    </el-table-column>
  </el-table>
   <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"   
          :page-size="pagesize"       
          layout="total, sizes, prev, pager, next, jumper"
          :total="commodityClassificationtable.length">   
        </el-pagination>
    </div></el-col>
</el-row>



<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px" >
   <el-col :span="24" style="background:#DCDFE6;"><div class="grid-content bg-purple-dark">
     <br>
    <h3 style="display: inline;">商品销售情况</h3>
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
     <el-button type="primary" icon="el-icon-search" @click="search2">搜索</el-button>
     
    </div><br></el-col>

  <el-col :span="24"><div class="grid-content bg-purple-dark">
      <el-table
    :data="commoditystatistics.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)"
    border
    style="width: 100%">
    <el-table-column
      prop="cname"
      label="商品名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="pageview"
      label="浏览量"
      align="center">
    </el-table-column>
    <el-table-column
      prop="pageviewcount"
      label="浏览人数"
      align="center"  >
    </el-table-column>
      <el-table-column
      prop="paymentcount"
      label="付款人数"
      align="center"  >
    </el-table-column>
      <el-table-column
      prop="percentconversion"
      label="单品转化率(%)"
      align="center" >
         <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.percentconversion }}%</span>
         </template> 
    </el-table-column>
        <el-table-column
      prop="salesquantity"
      label="销售数量"
      align="center" >
    </el-table-column>
        <el-table-column
      prop="salesamount"
      label="销售金额"
      align="center" >
    </el-table-column>
  </el-table>
     <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[5, 10, 20, 40]"   
          :page-size="pagesize2"       
          layout="total, sizes, prev, pager, next, jumper"
          :total="commoditystatistics.length">   
        </el-pagination>
    </div></el-col>
</el-row>

    </div>
</template>

<script>
  import echarts from 'echarts'
import data from '../pdf/content';
export default {
         data() {
      return {
          value:"",
          value2:"",
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
        commodityClassifications:[],
        commodityClassificationData:{},
        commodityClassificationmoney:{},
        commodityClassificationtable:[],
        commoditystatistics:[],
        currentPage:1, //初始页
        currentPage2:1,
        pagesize:10,   //    每页的数据
        pagesize2:10   //    每页的数据
        
      }
    },
    mounted() {
        this.commodityClassification();
        this.commodityClassificationDatas();
        this.commodityClassificationmoneys();
        this.commodityClassificationtables();
        this.commoditystatisticsss();

    },
    methods: {
        search2(){
              var a=this;
              var time=this.value2;
              if(time!="" && time!=null ){
              var d = new Date(time[0]);
              var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+",";
              var d2 = new Date(time[1]);
              var date2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
              var tt=date+date2;
              
              a.commoditystatisticsss(tt);

               }
        },
        search(){
              var time=this.value;



               if(time!="" && time!=null ){
              var d = new Date(time[0]);
              var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+",";
              var d2 = new Date(time[1]);
              var date2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
              var tt=date+date2;

              this.commodityClassification(tt);
              this.commodityClassificationDatas(tt);
              this.commodityClassificationmoneys(tt);
              this.commodityClassificationtables(tt);
               }else{

             this.commodityClassification();
             this.commodityClassificationDatas();
             this.commodityClassificationmoneys();
             this.commodityClassificationtables();


               }
            



        },
    
         //饼状玫瑰图
     mqCommoditystatistics(){
         var a=this;
         this.commoditystatisticss = echarts.init(document.getElementById('commoditystatistics'));
         this.commoditystatisticss.setOption({

                title: {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: a.commodityClassifications
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '半径模式',
            type: 'pie',
            radius: [20, 110],
            center: ['25%', '50%'],
            roseType: 'radius',
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true
                }
            },
            data:a.commodityClassificationData
        },
        {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            center: ['75%', '50%'],
            roseType: 'area',
            data:a.commodityClassificationmoney 
        }
    ]


         })
    },
    commodityClassification(e){

        var a=this;
        this.$axios
				.get('/shopping_mall/commodityclassification/commodityClassification',{
              params:{
                  time:e
             }
        })
				.then((res) => {
                  a.commodityClassifications=res;
				})
				.catch((err) => {
				console.log(err);
        });


    },
    commodityClassificationDatas(e){

        var a=this;
        this.$axios
				.get('/shopping_mall/commodityclassification/commodityClassificationData',{
              params:{
                  time:e
             }
        })
				.then((res) => {
                  a.commodityClassificationData=res;
				})
				.catch((err) => {
				console.log(err);
        });


    },
    commodityClassificationmoneys(e){

        var a=this;
        this.$axios
				.get('/shopping_mall/commodityclassification/commodityClassificationmoney',{
              params:{
                  time:e
             }
        })
				.then((res) => {
                  a.commodityClassificationmoney=res;
                  a.mqCommoditystatistics()
				})
				.catch((err) => {
				console.log(err);
        });




    },
    commodityClassificationtables(e){

        var a=this;
        this.$axios
				.get('/shopping_mall/commodityclassification/commodityClassificationtable',{
              params:{
                  time:e
             }
        })
				.then((res) => {
                a.commodityClassificationtable=res
				})
				.catch((err) => {
				console.log(err);
        });




    },
    commoditystatisticsss(e){
        var a=this;
        this.$axios
				.get('/shopping_mall/commodityclassification/commoditystatistics',{
              params:{
                  time:e
             }
        })
				.then((res) => {
                a.commoditystatistics=res
				})
				.catch((err) => {
				console.log(err);
        });

    },
      // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        }
,
      // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange2: function (size) {
                this.pagesize2 = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange2: function(currentPage){
                this.currentPage2 = currentPage;
                console.log(this.currentPage)  //点击第几页
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
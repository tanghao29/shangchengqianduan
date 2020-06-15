<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>



   <el-row :gutter="40" class="panel-group">
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              <h2>商品总览</h2>
              <hr style="width:1200px;height:3px;" class="hh">
              <pre>

 
                      {{sold}}                   {{putaway}}                   {{inventory}}                   {{countCommodityentry}}

                  
                    已下架             已上架             库存紧张             全部商品

              </pre>
            </div>
            <count-to :start-val="0" :end-val="orderformcount" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>

       <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              <h2>用户总览</h2>
              <hr style="width:1200px;height:3px;" class="hh">
              <pre>

 
                       {{sold}}                    {{putaway}}                    {{inventory}}                    {{countCommodityentry}}

                  
                    今日新增             昨日新增             本月新增             会员总数

              </pre>
            </div>
            <count-to :start-val="0" :end-val="orderformcount" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
   </el-row>





    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      sold:0,   //已下架
      putaway:0,//已上架
      inventory:0,//库存紧张
      countCommodityentry:0 //全部商品

    }
  },
    mounted() {
      //lineChartData.newVisitis.expectedData=[1300, 140, 141, 142, 145, 150, 160]
      this.initnewVisitis();
      this.initactualData();
      this.initshoppingsactualData();
      this.initshoppingsexpectedData();
      this.initsold();
      this.initputaway();
      this.initinventory();
      this.initcountCommodityentry();
  },
  methods: {
    initsold(){
         var a=this;         
         this.$axios.get('/shopping_mall/commodity/sold')
        .then(function (response) {
        a.sold=response
        })
        .catch(function (error) {
        console.log(error);
        });

    },
    initputaway(){
         var a=this;  
         this.$axios.get('/shopping_mall/commodity/putaway')
        .then(function (response) {
        a.putaway=response
        })
        .catch(function (error) {
        console.log(error);
        });
      
    },
    initinventory(){
          var a=this;  
         this.$axios.get('/shopping_mall/commodity/inventory')
        .then(function (response) {
        a.inventory=response
        })
        .catch(function (error) {
        console.log(error);
        });
    },
    initcountCommodityentry(){
    var a=this;  
    this.$axios.get('/shopping_mall/commodity/countCommodityentry')
        .then(function (response) {
        a.countCommodityentry=response
        })
        .catch(function (error) {
        console.log(error);
        });
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    initnewVisitis(){

     this.$axios.get('/shopping_mall/orderform/yesterWeek')
		.then(function (response) {
		// handle success
	  lineChartData.newVisitis.expectedData=response;
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});
    },
    initactualData(){

    this.$axios.get('/shopping_mall/orderform/selectWeek')
		.then(function (response) {
		// handle success
	  lineChartData.newVisitis.actualData=response;
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});

    },
    initshoppingsactualData(){

    this.$axios.get('/shopping_mall/orderform/selectWeekMoney')
		.then(function (response) {
		// handle success
	  lineChartData.shoppings.actualData=response;
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});
    },
    initshoppingsexpectedData(){

     this.$axios.get('/shopping_mall/orderform/yesterWeekMoney')
		.then(function (response) {
		// handle success
	  lineChartData.shoppings.expectedData=response;
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});


    }



  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}








.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 216px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #e2b900;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #e2b900;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float:left;
      font-weight: bold;
      margin: 26px;
      margin-left: 20px;

      .card-panel-text {
        line-height:18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}


.hh{
  background-color:red;
  border: 0px;
}


</style>

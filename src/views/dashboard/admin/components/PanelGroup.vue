<template>
  <div>表头
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="documentation" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
           今日订单总数
          </div>
          <count-to :start-val="0" :end-val="orderformcount" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="q" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
           今日销售总额
          </div>
          <count-to :start-val="0" :end-val="totalsalescount" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            昨日销售总额
          </div>
          <count-to :start-val="0" :end-val="yesterdaytotalsalescount" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="q2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            近7天销售总额
          </div>
          <count-to :start-val="0" :end-val="weekcount" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
  <div style="background:#fff;height:50px;">



  </div>
   表尾
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  data(){
    return{
       orderformcount:"",             //今日订单总额
       totalsalescount:"",            //今日销售总额
       yesterdaytotalsalescount:"",    //昨日销售总额
       weekcount:""


    
    }
  },
  	mounted() {
    this.orderformcountff();
    this.totalsalescountff();
    this.yesterdaytotalsalescountff();
    this.weekcountff();
	},
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    //今日订单总数
    orderformcountff(){
         var a=this;
         this.$axios.get('/shopping_mall/orderform/orderformcount')
        .then(function (response) {
        // handle success
        
        a.orderformcount=response
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        });
    },
    //今日销售总额
    totalsalescountff(){
         var a=this;
         this.$axios.get('/shopping_mall/orderform/totalsalescount')
        .then(function (response) {
        a.totalsalescount=response
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        });
    },
    //昨天销售总额
    yesterdaytotalsalescountff(){

         var a=this;
         this.$axios.get('/shopping_mall/orderform/yesterdaytotalsalescount')
        .then(function (response) {
        a.yesterdaytotalsalescount=response
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        });

    },
    //近7天的销售额
    weekcountff(){

         var a=this;
         this.$axios.get('/shopping_mall/orderform/weekcount')
        .then(function (response) {
        a.weekcount=response
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
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
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
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
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





</style>

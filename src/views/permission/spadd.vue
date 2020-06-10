<template>
<div>
 <!-- 条件查询 -->
    <el-form :model="activities" ref="ruleForm" label-width="100px">
     <el-form-item label="商品秒杀数量">
        <el-input v-model="activities.adnumber"></el-input>
      </el-form-item>
      <el-form-item label="商品秒杀价格">
         <el-input v-model="activities.adprice"></el-input>
       </el-form-item>
       <el-form-item label="秒杀商品限购">
          <el-input v-model="activities.adxgnumber"></el-input>
        </el-form-item>
        <el-form-item label="商品">
          <el-select
              v-model="activities.cid"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              @change="change2(activities.cid)">
              <el-option
                v-for="item in options"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select
              v-model="activities.ceid"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod2"
              :loading="loading">
              <el-option
                v-for="item1 in options1"
                :key="item1.ceid"
                :label="item1.cename"
                :value="item1.ceid">
              </el-option>
            </el-select>
        </el-form-item>
      <el-form-item label="活动时间区间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="activities.asksdatetime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="activities.asjsdatetime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="是否上架">
       <el-radio-group v-model="activities.asstate">
         <el-radio label="1" >上架</el-radio>
         <el-radio label="2" >下架</el-radio>
       </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="onSubmit">联合查询</el-button> -->
        <el-button @click="resetForm('ruleForm')">重置</el-button>
       <el-button  type="primary" @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>

</div>
</template>

<script>

  export default {
    props:["ids"],
    data() {
      return {
        activities:{
          cid:'',
          ceid:'',
          asid:'',
          cname:'',
          skid:'',
          adnumber:'',
          adprice:'',
          adxgnumber:'',
          asksdatetime:'',
          asjsdatetime:'',
          asstate:''
        },
        tableData: [],
        options:[],
        options1:[],
        list:[],
        pagesize: 5,
        currpage: 1,
        formstate:0,
         loading: false,

      };
    },
   mounted: function () {
     // this.activities.skid = this.userid
console.log(this.ids+'///////////')
this.loadData();

    },
    methods:{

       loadData:function() {
           var th=this;
           this.getRequest('/shopping_mall/commodity/queryListCommodtiy')
           .then(function (response) {
              th.options=response;
               console.log(response);
           })
            .catch(function (error) {
               console.log(error);
           });
       },
       change2:function(vals){
         console.log(vals+'*************')
         var th=this;
         this.getRequest('/shopping_mall/commodityentry/queryCommodityentryList?ceid='+vals)
         .then(function (response) {
            th.options1=response;
             console.log(response);
         })
          .catch(function (error) {
             console.log(error);
         });
       },
       remoteMethod(query) {
               if (query !== '') {
                 this.loading = true;
                 setTimeout(() => {
                   this.loading = false;
                   this.options = this.list.filter(item => {
                     return item.label.toLowerCase()
                       .indexOf(query.toLowerCase()) > -1;
                   });
                 }, 200);
               } else {
                 this.options = [];
               }
             },
             remoteMethod2(query) {
                     if (query !== '') {
                       this.loading = true;
                       setTimeout(() => {
                         this.loading = false;
                         this.options = this.list.filter(item => {
                           return item.label.toLowerCase()
                             .indexOf(query.toLowerCase()) > -1;
                         });
                       }, 200);
                     } else {
                       this.options = [];
                     }
                   },



   }

}

</script>

<style>
</style>

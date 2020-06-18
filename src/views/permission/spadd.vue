<template>
<div>
 <!-- 条件查询 -->
    <el-form :model="activities" ref="ruleForm" label-width="100px">
     <el-form-item label="商品秒杀数量">
        <el-input v-model="activities.adnumber" @focus="open"></el-input>

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

              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod2"
              :loading="loading"
              @change="change3(activities.ceid)">
              <el-option
                v-for="item1 in options1"
                :key="item1.ceid"
                :label="item1.sname"
                :value="item1.ceid">
              </el-option>
            </el-select>
        </el-form-item>
      <el-form-item label="活动时间区间">
       <template>
         <el-time-picker
           v-model="activities.asksdatetime"
           value-format="HH:mm:ss"
           placeholder="开始时间">
         </el-time-picker>
         <el-time-picker
       
           v-model="activities.asjsdatetime"
           value-format="HH:mm:ss"
           placeholder="结束时间">
         </el-time-picker>
       </template>
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
       <el-button  type="primary" @click="onsubmit">添加</el-button>
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
         senumber:'',

      };
    },
   mounted: function () {
     this.activities.skid = this.ids
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
         var th=this;
         this.getRequest('/shopping_mall/commodityentry/queryCommodityentryList?cid='+vals)
         .then(function (response) {
            th.options1=response;
             console.log(response)
         })
          .catch(function (error) {
             console.log(error);
         });
       },

       change3:function(vals){
         var th=this;
         this.getRequest('/shopping_mall/commodityentry/queryById?ceid='+vals)
         .then(function (response) {
            th.senumber=response.cenumber;
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
             open() {
                     this.$message('此类商品现有'+this.senumber);
                   },
         onsubmit:function(){
           var th=this;
          this.$axios.get('/shopping_mall/activities/add',{
            params: {
                    cid:th.activities.cid,
                    ceid:th.activities.ceid,
                    skid:th.activities.skid,
                    adnumber:th.activities.adnumber,
                    adprice:th.activities.adprice,
                    adxgnumber:th.activities.adxgnumber,
                    asksdatetime:th.activities.asksdatetime,
                    asjsdatetime:th.activities.asjsdatetime,
                    asstate:th.activities.asstate
}
          })
          .then(function (response) {

              console.log(response)
              var falg=false;
              th.$emit("isfromadd",falg);
          })
           .catch(function (error) {
              console.log(error);
          });
         },



   }

}

</script>

<style>
</style>

<template>
  <div>
    <el-form ref="form" :model="Commodity" label-width="80px">
      <input type="hidden" v-model="Commodity.cid"/>
      <el-form-item label="商品名称">
        <el-input v-model="Commodity.cname"></el-input>
      </el-form-item>
  <el-form-item label="是否上架">
    <el-switch v-model="Commodity.cstate" active-text="上架" active-value="1" inactive-text="下架" inactive-value="2"></el-switch>
  </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>




  </div>
</template>

<script>

  export default {
    props:["cids"],
    data() {
      return {
        Commodity:{
          cid:'',
          cname:'',
          cstate:''

        },

      };
    },
    mounted(){

        this.loadData(this.cids);
    },
    methods:{

        loadData:function(cids) {
                  var th=this;
            this.getRequest('/shopping_mall/commodity/queryById?cid='+cids)
            .then(function (response) {
               th.Commodity=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },

        onsubmit(){
          var th=this;
          this.getRequest('/shopping_mall/commodity/updatestate?cid='+th.Commodity.cid+'&cname='+th.Commodity.cname+'&cstate='+th.Commodity.cstate)
          .then(function (response) {

              console.log(response);
var falg=false;
    			th.$emit("isfrom",falg);
          })
           .catch(function (error) {
              console.log(error);
          });

        }

  }
}

</script>

<style>
</style>

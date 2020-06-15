<template>
  <div>
    <el-form ref="form" :model="specification" label-width="80px">
      <el-form-item label="规格名称">
        <input type="hidden" v-model="specification.sid" />
        <el-input v-model="specification.sname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>



export default {
props:["ids"],
  data() {
    return {
        specification:{
          sid:'',
          ccid:'',
          sname:'',
          ccname:''
        },
      }

  },
  mounted(){
      this.loadData(this.ids);
  },
  methods: {

    loadData:function(val) {
        var th=this;
        this.getRequest('/shopping_mall/specification/queryById?sid='+val)
        .then(function (response) {
          th.specification=response;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onSubmit(){
      var th=this;
      this.getRequest('/shopping_mall/specification/update?sid='+this.specification.sid+'&sname='+this.specification.sname)
      .then(function (response) {

        console.log(response);
        var falg=false;
        th.$emit("isfrom",falg);
      })
      .catch(function (error) {
        console.log(error);
      });
    },



  },

}


</script>

<style>
</style>

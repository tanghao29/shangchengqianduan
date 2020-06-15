<template>
  <div>
    <el-form ref="form" :model="specification" label-width="80px">

      <el-form-item label="规格名称">
        <el-input v-model="specification.sname"></el-input>
      </el-form-item>
      <el-form-item label="参数">
    <template>
      <el-select v-model="specification.ccid" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.ccid"
          :label="item.ccname"
          :value="item.ccid">
        </el-option>
      </el-select>
    </template>
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

  data() {
    return {
        specification:{

          ccid:'',
          sname:'',
          ccname:''
        },
       options:[],


      }

  },
  mounted(){
      this.loadData();
  },
  methods: {

    loadData:function() {
        var th=this;
        this.getRequest('/shopping_mall/commodityclassification/queryCcList')
        .then(function (response) {
          th.options=response;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onSubmit(){
      var th=this;
      this.getRequest('/shopping_mall/specification/addspec?sname='+this.specification.sname+'&ccid='+this.specification.ccid)
      .then(function (response) {
        console.log(response);
        var falg=false;
        th.$emit("isfromadd",falg);
      })
      .catch(function (error) {
        console.log(error);
      });
    },



  },

}

</script>

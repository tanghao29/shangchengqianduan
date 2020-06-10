<template>

<el-form :model="commodityclassification" ref="ruleForm" label-width="100px" >
    <input type="hidden"  v-model="commodityclassification.ccid"/>
   <el-form-item label="活动名称">
      <el-input v-model="commodityclassification.ccname"></el-input>
    </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
</template>

<script>
export default {
       props :["test"],
      data() {
        return {
          commodityclassification:{
            ccname:'',
            ccid:''
          }
        }
      },
      mounted() {
        console.log(this.test);
       this.queryss(this.test)
      },
      methods: {

    	  queryss(ids){
    		  var a=this;
    		  this.$axios.get('/shopping_mall/commodityclassification/queryCommodityById',{
    			  params:{
    				  ccid:ids
    			  }
    		  })
    		  .then(function (response) {
    		    console.log(response);
    			a.commodityclassification=response;
    		  })
    		  .catch(function (error) {
    		    console.log(error);
    		  });
    	  },

        onSubmit:function() {

    		var th=this;
    		this.$axios.get('/shopping_mall/commodityclassification/updatecommodtiy', {
    		    params: {
                   ccid:th.commodityclassification.ccid,
                   ccname:th.commodityclassification.ccname
    		    }
    		  })
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

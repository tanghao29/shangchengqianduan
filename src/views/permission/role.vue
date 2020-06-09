<template>
<el-form ref="form" :model="seckill" label-width="80px">
    <input type="hidden" name="skid" v-model="seckill.skid"/>
   <el-form-item label="活动名称">
      <el-input v-model="seckill.sktitle"></el-input>
    </el-form-item>
    <el-form-item label="活动时间区间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="seckill.skstarttime" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="1">   -</el-col>
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="seckill.skendtime" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="是否上架">
      <el-switch v-model="seckill.skstate" active-text="上架" active-value="1" inactive-text="下架" inactive-value="2"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit()">修改</el-button>
      <el-button @click="this.resetFields();">取消</el-button>
     <el-button type="primary" @click="dialogFormVisibleupdate = false">确关闭窗口</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
       props :["ids"],
      data() {
        return {
        seckill:{
          skid:'',
          sktitle:'',
          skstarttime:'',
          skstarttimeover:'',
          skendtime:'',
          skendtimeover:'',
          skstate:''
        },
        }
      },
      mounted() {
        console.log(this.ids);
       this.queryss(this.ids)
      },
      methods: {
    	  queryss(ids){
    		  var a=this;
    		  this.$axios.get('/shopping_mall/seckill/selectSeckillById',{
    			  params:{
    				  skid:ids
    			  }
    		  })
    		  .then(function (response) {
    		    console.log(response);
    			a.seckill=response;
    		  })
    		  .catch(function (error) {
    		    console.log(error);
    		  });
    	  },
        onSubmit:function() {

          if(this.seckill.skstarttime!=null&&this.seckill.skstarttime!=""){

              var d = new Date(this.seckill.skstarttime);
                  this.seckill.skstarttime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();


          }

          if(this.seckill.skendtime!=null&&this.seckill.skendtime!=""){


                var d2 = new Date(this.seckill.skendtime);
                this.seckill.skendtime=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();

          }

    		var th=this;
    		this.$axios.get('/shopping_mall/seckill/updateSeckill', {
    		    params: {
                    skid:th.seckill.skid,
                sktitle:th.seckill.sktitle,
                skstarttime:th.seckill.skstarttime,
                skstarttimeover:th.seckill.skstarttimeover,
                skendtime:th.seckill.skendtime,
                skendtimeover:th.seckill.skendtimeover,
                skstate:th.seckill.skstate
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

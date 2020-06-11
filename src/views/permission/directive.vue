<template>
  <el-form ref="formadd" :model="seckill" label-width="80px">
   <el-form-item label="活动名称">
      <el-input v-model="seckill.sktitle"></el-input>
    </el-form-item>
    <el-form-item label="活动时间区间">
      <el-col :span="11">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="seckill.skstarttime" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="1">   -</el-col>
      <el-col :span="11">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="seckill.skendtime" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="是否上架">
      <el-switch v-model="seckill.skstate" active-text="上架" active-value="1" inactive-text="下架" inactive-value="2" @change="change"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onadd()">新增</el-button>
      <el-button @click="resetForm('formadd')">重置</el-button>
     <el-button type="primary" @click="dialogFormVisible = false">确关闭窗口</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

 export default {

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
        }
      };
    },

   methods:{

      onadd(){


          // if(this.seckill.skstarttime!=null&&this.seckill.skstarttime!=""){

          //     var d = new Date(this.seckill.skstarttime);
          //         this.seckill.skstarttime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();


          // }

          // if(this.seckill.skendtime!=null&&this.seckill.skendtime!=""){


          //       var d2 = new Date(this.seckill.skendtime);
          //       this.seckill.skendtime=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();

          // }

        var th=this;
        this.getRequest('/shopping_mall/seckill/seckillAdd?sktitle='+th.seckill.sktitle+"&skstarttime="+th.seckill.skstarttime+"&skendtime="+th.seckill.skendtime+"&skstate="+th.seckill.skstate)
        .then(function (response) {
              console.log(response)
               var falg=false;
               th.$emit("isfromadd",falg);
        })
        .catch(function (error) {
          console.log(error);

        });
      },
      change (){

         var th=this;
         var date=new Date();
         if(date>this.seckill.skstarttime&&data<this.seckill.skendtime){

         }else{
           this.seckill.skstate="2";
           alert("此活动已结束无法上架");
         }



      },

  }
}
</script>

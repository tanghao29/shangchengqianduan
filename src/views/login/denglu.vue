<template>

   <div>
       <el-form ref="form" :model="user" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="user.uname"></el-input>
  </el-form-item>
    <el-form-item label="账号/手机号">
    <el-input v-model="user.uaccount"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input type="password" v-model="user.upass"  />
  </el-form-item>
  <el-form-item>
    <!-- {{imageUrl}} -->


<el-upload
  class="avatar-uploader"
  action="srcimages"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>




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
        user:{
          uname:'',
          uaccount:'',
          upass:'',
          uimg:'',
        },
        imageUrl: ''
       
      };
    },
    methods:{
         onSubmit() {

              var th=this;
              this.$axios.get('/shopping_mall/user/insertuser',{
                params:{
                  uname:th.user.uname,
                  uaccount:th.user.uaccount,
                  upass:th.user.upass,

      
                }
              })
              .then(function (response) {
                alert(response);
                  console.log(response);
              })
               .catch(function (error) {
                  console.log(error);
              });


        },
         handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }


   
   

    
}
</script>

<style >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
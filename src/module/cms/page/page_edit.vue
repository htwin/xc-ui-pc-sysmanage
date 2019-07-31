<template>
  <div>
    <el-form   :model="pageForm" :rules="pageFormRules" label-width="80px"  ref="pageForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editSubmit" >提交</el-button>
      <el-button type="primary" @click="go_back" >返回</el-button>
    </div>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'
    export default {
      data(){
        return{
          siteList:[],
          templateList:[],
          pageId:'',
          pageForm:{
            siteId:'',
            templateId:'',
            pageName: '',
            pageAliase: '',
            pageWebPath: '',
            pageParameter:'',
            pagePhysicalPath:'',
            pageType:'',
            pageCreateTime: new Date()
          }
        }
      },
      methods:{
        editSubmit(){
          cmsApi.page_edit(this.pageId,this.pageForm).then((res)=>{

              if(res.success){
               this.$message.success("编辑成功");
               this.go_back();
              }else if(res.message){
                  this.$message.error(res.message);
              }else{
                this.$message.error("编辑失败");
              }
          })
        },
        go_back(){
          this.$router.push({
            path: '/cms/page/list', query: {
              page: this.$route.query.page,
              siteId: this.$route.query.siteId
            }
          })
        }
      },
      created() {
        //页面参数通过路由传入，这里通过this.$route.params来获取
        this.pageId=this.$route.query.pageId;
        //根据主键查询页面信息
        cmsApi.page_get(this.pageId).then((res)=>{

          if(res!=null){
            this.pageForm = res
          }

        })
      }
    }
</script>

<style scoped>

</style>

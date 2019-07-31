<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：<el-input v-model="params.pageAliase" style="width:100px"></el-input>
        页面名称:<el-input v-model="params.pageName" style="width:100px"></el-input>
        页面类型:<el-input v-model="params.pageType" style="width:100px"></el-input>
      <el-button type="primary" v-on:click="query"  size="small">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',query:{
      page:this.params.page,
      siteId:this.params.siteId
      }}">
          <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>

    <el-table
      :data="list"
      style="width: 100%">
       <el-table-column type="index" width="60">
    </el-table-column>
    <el-table-column prop="pageName" label="页面名称" width="120">
    </el-table-column>
    <el-table-column prop="pageAliase" label="别名" width="120">
    </el-table-column>
    <el-table-column prop="pageType" label="页面类型" width="150">
    </el-table-column>
    <el-table-column prop="pageWebPath" label="访问路径" width="250">
    </el-table-column>
    <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
    </el-table-column>
    <el-table-column prop="pageCreateTime" label="创建时间" width="180" >
    </el-table-column>
      <el-table-column label="操作" width="100">
          <template slot-scope="page">
            <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
            <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
      style="float: right"
    >
    </el-pagination>
  </div>
</template>
<script>

  import * as cmsApi from '../api/cms'
  //填写js代码，实现VM的功能，创建vue实例
  export default {
    data() {
      return {
        siteList:[],
        list: [],
        total:50,
        params:{
          page:1,
          size:5,
          siteId:"",
          pageAliase:"",
          pageName:"",
          pageType:""
        }
      }
    },
    methods:{
      query : function () {
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;
        })
      },
      edit:function(pageId){
        this.$router.push({path:'/cms/page/edit/',query:{
              pageId:pageId,
              page:this.params.page,
              siteId:this.params.siteId
          }})
      },
      del:function(pageId){
        this.$confirm("确认删除页面？","提示",{}).then(()=>{
          cmsApi.page_del(pageId).then((res)=>{
            if(res.success){
              this.$message({
                type:"success",
                message:"删除成功"
              });
              this.query();
            }else{
              this.$message({
                type:"error",
                message:"删除失败"
              });
            }
          })

        })

      },
      changePage:function (page) {
        this.params.page = page;
        this.query();
      }
    },
    mounted() {
      this.query();
      this.siteList = [
        {
          siteName:"首页",
          siteId:"5a751fab6abb5044e0d19ea1"
        },
        {
          siteName:"测试站点",
          siteId:"2"
        }
      ]
    },
    created() {
      this.params.page = Number.parseInt(this.$route.query.page||1);
      this.params.siteId = this.$route.query.siteId||'';
    }
  }
</script>



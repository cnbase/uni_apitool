<template>
<el-row>
  <el-col style="padding:5px;">
    <h3 style="text-align:center;">模拟Api请求</h3>
    <el-alert
      title="使用说明"
      type="warning"
    >
      <p>1. 使用纯JS AJAX模拟提交</p>
      <p>2. 因浏览器会报跨域错误，所以必须将静态页面放置在同一个域名下使用</p>
      <p>3. 如果确认服务端不存在跨域限制，无需放置同一域名下</p>
    </el-alert>
  </el-col>
  <el-col style="padding:5px;">
    <el-card shadow="never">
      <el-form label-width="80px">
        <el-form-item label="URL">
          <div style="display:flex;justify-content:space-between;">
            <el-select v-model="protocol" placeholder="请选择协议" style="min-width:90px;width:90px;">
              <el-option label="http://" value="http://"></el-option>
              <el-option label="https://" value="https://"></el-option>
            </el-select>
            <el-input v-model="url" placeholder="请输入Api地址" style="width:100%;margin:0 3px;"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-select v-model="method" placeholder="请选择请求方式">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Headers">
          <el-button @click="addHeader">增加Header</el-button>
        </el-form-item>
        <el-form-item v-for="(item,index) in header" :key="'header'+index">
          <div style="display:flex;justify-content:space-between;">
              <el-input v-model="item.name" style="min-width:180px;width:200px;"></el-input>
              <el-input v-model="item.value" style="width:100%;margin:0 3px;"></el-input>
              <el-button @click="delHeader(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="参数">
          <el-button @click="addParam">增加参数</el-button>
        </el-form-item>
        <el-form-item v-for="(item,index) in params" :key="'param'+index">
          <div style="display:flex;justify-content:space-between;">
              <el-input v-model="item.name" style="min-width:180px;width:200px;"></el-input>
              <el-input v-model="item.value" style="width:100%;margin:0 3px;"></el-input>
              <el-button @click="delParam(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发起请求</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-col>
  <el-col style="padding:5px;">
    <el-tabs type="border-card">
      <el-tab-pane label="响应内容">
        <el-input type="textarea" :rows="6" v-model="result.data" readonly placeholder="显示请求结果..."></el-input>
      </el-tab-pane>
      <el-tab-pane label="Header">
        <el-input type="textarea" :rows="6" v-model="result.headers" readonly placeholder="显示响应headers..."></el-input>
      </el-tab-pane>
    </el-tabs>
  </el-col>
</el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
      return {
        protocol:'http://',
        url: window.location.host,
        method:'get',
        header:[
          {name:'X-Requested-With',value:'XMLHttpRequest'},
          {name:'Content-Type',value:'application/x-www-form-urlencoded'},
        ],
        params:[
          {name:'',value:''},
        ],
        result: {
          data:'',
          headers: ''
        },
        instruction: "1. 使用纯JS AJAX模拟提交\n 2. 因浏览器会报跨域错误，所以必须将静态页面放置在同一个域名下使用\n 3. 如果确认服务端不存在跨域限制，无需放置同一域名下",
      }
  },
  methods: {
    onSubmit() {
      let self = this;
      let config = {},headers = {},params = {};
      for (let i = 0;i<self.header.length;i++) {
        headers[self.header[i].name] = self.header[i].value;
      }
      for (let i = 0;i<self.params.length;i++) {
        params[self.params[i].name] = self.params.value;
      }
      self.result.data = '';
      self.result.headers = '';
      if (self.method == 'get') {
        config = {
            headers: headers,
            params:params,
        }
        axios.get(self.protocol+self.url,config).then(function (response){
          console.log(response.data)
          if (typeof response.data === "object") {
            if (self.isJson(response.data)) {
              self.result.data = JSON.stringify(response.data);
            } else {
              self.result.data = response.data.toString();
            }
          } else {
            self.result.data = response.data;
          }
          for (let i in response.headers) {
            self.result.headers += (i + ":" + response.headers[i] + "\n");
          }
        }).catch(function (error){
            console.log(error);
            self.result.data = error.toString();
            self.$message.error("请求失败");
        });
      } else if (self.method == 'post') {
        config = {
            headers: headers,
            transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            let searchParams = new URLSearchParams();
            for (let i in data){
                if (Object.prototype.hasOwnProperty.call(data,i)){
                    searchParams.append(i,data[i]);
                }
            }
            return searchParams;
        }],
        }
        axios.post(self.protocol+self.url,params,config).then(function (response){
          console.log(response.data)
          if (typeof response.data === "object") {
            if (self.isJson(response.data)) {
              self.result.data = JSON.stringify(response.data);
            } else {
              self.result.data = response.data.toString();
            }
          } else {
            self.result.data = response.data;
          }
          for (let i in response.headers) {
            self.result.headers += (i + ":" + response.headers[i]);
          }
        }).catch(function (error){
            console.log(error);
            self.result.data = error.toString();
            self.$message.error("请求失败");
        });
      } else {
        self.$message.error('数据错了哦');
      }
    },
    delHeader(index) {
      this.header.splice(index,1);
    },
    addHeader() {
      this.header.push({name:'',value:''});
    },
    delParam(index) {
      this.params.splice(index,1);
    },
    addParam() {
      this.params.push({name:'',value:''});
    },
    resetForm() {
      this.protocol = 'http://';
      this.url = window.location.host;
      this.method = 'get';
      this.header = [
        {name:'X-Requested-With',value:'XMLHttpRequest'},
        {name:'Content-Type',value:'application/x-www-form-urlencoded'},
      ];
      this.params = [
        {name:'',value:''},
      ];
      this.result.data = '';
      this.result.headers = '';
    },
    //判断返回值是json
    isJson(obj) {
      return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    },
  }
}
</script>

<style>

</style>

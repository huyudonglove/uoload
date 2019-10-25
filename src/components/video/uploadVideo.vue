<template>
  <div>
    <input type="file" ref="video" @change="add">
    <video  :src="url" controls></video>
    <div class="bg">
      <div class="jindu"><progress :value='(100/total)*len' max='100'></progress></div>
      <div v-if="upError">上传失败</div>
      <div @click="up"> 重新上传</div>
      <div>{{msg}}</div>
      <div>
        888
        <video src="http://192.168.239.60:22122/group1/M00/01/6E/wKjvPF2b986EPPfSAAAAAAm21BE285.mp4"></video>
      </div>
    </div>

  </div>
</template>

<script>
  import {upVideo,checkFile} from "../../http/request";
  import SparkMD5 from 'spark-md5'
  import axios from 'axios';
  export default {
    name: "uploadVideo",
    data(){
      return {
        url:'',
        arr:[],
        upError:false,
        len:'',
        total:'',
        mdCode:'',
        name:'',
        sizeF:'',
        msg:''
      }
    },
    methods:{
      up(){
        var self=this;
        console.log(this.mdCode,88)
        checkFile('type',this.name,this.mdCode,this.sizeF).then(
          v=>{
              //console.log(v);
              var index=v.data.chunkCurr;
              de(index);
          }
        )
        //var index=0;
        var de=function (index) {
          let v=self.$refs.video.files[0];
          //console.log(v,566)
          if(index<self.total){
            let v=self.$refs.video.files[0];
            let sing=v.slice(index*1024*1024,((index+1)*1024*1024));
            //console.log(sing.size,785);
            let formData = new FormData();
              formData.append('chunk',index);
              formData.append('chunks',self.total);
              formData.append('name',self.name);
              formData.append('size',self.sizeF);
              formData.append('fileMd5',self.mdCode);
              formData.append('file',sing);
              formData.append('chunkSize',sing.size)
            upVideo(formData).then(res=>{
              res.code?(()=>{
                self.msg=res.msg;
                })():(()=>{
                index++;
                self.arr.push('1');
                return de();
              })();

                }).catch(err=>{
                  self.upError=true;
                  //self.arr.push('1')
                });
          }
        }
        //de();
      },
      add(){
        var v=this.$refs.video;
        //console.log(v.files)
        var reader = new FileReader();
        //reader.readAsDataURL(v.files[0]);
        reader.readAsArrayBuffer(v.files[0]);
        var size=v.files[0].size;
        this.sizeF=size;
        this.name=v.files[0].name;
        //console.log((size/(1024*1024)),9999)
        var totalChuck=Math.ceil((size/(1024*1024)));
        this.total=totalChuck;
        //console.log(totalChuck,8888)
        var self=this;
        reader.onloadend = function (e) {
          self.url=reader.result;//图片读取完成之后把base64的赋值给img的src
          //console.log(self.url)
          var spark = new SparkMD5.ArrayBuffer();
          spark.append(self.url);
          //console.log(spark.end(),1)
          //console.log(spark.end(),2)
          self.mdCode=spark.end();
          console.log(self.mdCode,66)
          self.up();
        }

      },

      md(){

      }
    },
    mounted() {

    },
    watch:{
      arr(){
        //console.log(this.arr)
        this.len=this.arr.length;
      }
    }
  }
</script>

<style scoped>
 .bg{
   background: #1FA9E8;
   background-size:10%;
   display: flex;
   justify-content: space-between;
 }
 .jindu{
   float: left;
   width:100px;
   line-height: 50px;
 }
</style>

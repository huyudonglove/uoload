<template>
    <div>
      <ul>
        <li class="list">
          <div class="img"><img style="width:100%;height:100%" src="../../assets/video.jpg"/></div>
          <div class="file">
            <p class="fileName">123.mp4</p>
            <span class="">0M/100M</span>
          </div>
          <div class="time">{{new Date().toUTCString().slice(16,25)}}</div>
          <div class="jindu"><progress value='70' max='100'></progress></div>
          <div class="close"><i @click="stop" :class="{'el-icon-video-pause':!isStop,'el-icon-video-play':isStop}"></i><i @click="close($event)" class="el-icon-close" style="margin-left:10px;"></i></div>
        </li>
        <li class="list">
          <div class="img"><img style="width:100%;height:100%" src="../../assets/video.jpg"/></div>
          <div class="file">
            <p class="fileName">123.mp4</p>
            <span class="">0M/100M</span>
          </div>
          <div class="time">{{new Date().toUTCString().slice(16,25)}}</div>
          <div class="jindu"><progress value='70' max='100'></progress></div>
          <div class="close"><i @click="stop" :class="{'el-icon-video-pause':!isStop,'el-icon-video-play':isStop}"></i><i @click="close($event)" class="el-icon-close" style="margin-left:10px;"></i></div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "videoList",
        data(){
          return{
            isStop:false
          }
        },
        methods:{
          stop(){
            this.isStop=!this.isStop;
          },
          close(e){
            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
          }
        }
    }
</script>

<style scoped>
.list{
  overflow: hidden;
  height:50px;
  padding: 5px 0;
  border-bottom: 1px dashed grey;
}
.img{
  float: left;
  width: 50px;
  height:50px;
}
.file{
  float: left;
  width:500px;
  margin-left: 10px;
}
.fileName{
  line-height: 0px;
}
.time{
  float: left;
  width:100px;
  line-height: 50px;
}
.jindu{
  float: left;
  width:100px;
  line-height: 50px;
}
.close{
  float: right;
  font-size:22px;
  line-height: 50px;
}
</style>
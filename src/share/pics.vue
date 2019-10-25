<template>
  <div class="big" >
    <ul ref="ul">
      <li v-for="(item, index) in similarImages">
        <img width="100" height="100" :src="`/download/file/get/${item.fileId}`">
      </li>
    </ul>
    <img class="input1"  src="../assets/left.png" @click="pre()" />
    <img class="input2"  src="../assets/right.png" @click="next()" />
  </div>
</template>

<script>
export default {
  name: "pics",
  props: ["similarImages"],
  data(){
    return {
      total:0,
      n:0
    }
  },
  created(){
    
  },
  mounted(){
    this.total=this.similarImages.length;
    this.n=Math.ceil((parseInt(this.$refs['ul'].clientWidth)-130)/120)
  },
  methods:{
    pre(){
      this.$nextTick(()=>{
      let ul=this.$refs['ul']
      if(this.total<=this.n){
        return;
      }else{
        this.similarImages.push(this.similarImages[0]);  // 将数组的第一个元素添加到数组的
        this.similarImages.shift();  //删除数组的第一个元素  
       ul.style.left ="0px"
      }
        })
    },
    next(){
     this.$nextTick(()=>{
      let ul=this.$refs['ul']
      if(this.total<=this.n){
        return;
      }else{
       this.similarImages.unshift(this.similarImages[this.total-1]);  // 将数组的最后一个元素添加到数组的头部
       this.similarImages.pop();  //删除数组的最后一个元素  
        ul.style.left ="0px"
      }
     })
    }
  }
  }

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.big {
  padding:20px 40px;
  height:100px;
}
ul {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
  left:0px;
}
li {
  width: 120px;
  height: 120px;
  float: left;
}
.input1 {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0px;
  top:70px;
  cursor: pointer;
}
.input2 {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  top:70px;
  cursor: pointer;
}

</style>

<template>
  <module-wrap title="各子公司全国分布" :icon="icon3" class="category">
    <template #content>
      <div class="catergory-content">
        <div class="site-logo">
          <div class="shine-box shanghai">
            <span class="shine-span">上海市</span>
          </div>
          <div class="shine-box wuhan">
            <span class="shine-span">武汉市</span>
          </div>
          <div class="shine-box beijing">
            <span class="shine-span">北京市</span>
          </div>
          <div class="title">
            <span class="">数传集团</span>
          </div>
          <img src="@/assets/image/animationPic.svg" itemprop="logo" alt="">
        </div>
      </div>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import icon3 from "@/assets/image/company.svg";

onMounted(() => {});
</script>
<style lang="scss" scoped>

.catergory-content {
  height: 184px;
  .chart {
    height: 436px;
    width: 100%;
  }
}
@keyframes animation {
  100% {
       transform: rotateY(180deg);
   }
}
.shine-box {
    text-align: center;
    font-weight: 700;
    font-size: 16px;
}
.shine-span {
    background: #656565 linear-gradient(to left, transparent, #fff, transparent) no-repeat 0 0;
    background-size: 20% 100%;
    background-position: 0 0;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: shine 2s infinite;
}
@keyframes shine {
    from {
        background-position: 0% 0%;
    }
    to {
        background-position: 100% 100%;
    }
}

.site-logo{
  position: relative;
  overflow: hidden;
  div {
    position: absolute;
  }
  .title {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
  }
  .shanghai {
    left: 0;
    top: 20px;
  }
  .wuhan {
    top: 100px;
  }
  .beijing {
    right: 0;
    top: 20px;
  }
  img {
    width: 240px;
    margin: 0 auto;
  }
}
.site-logo:before {
    content: "";
    position: absolute;
    width: 600px;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: blink 2s ease-in 2s infinite;
    animation: blink 2s ease-in 2s infinite;
}
 
@-webkit-keyframes blink {
    from {left: -300px;top: 0;}
    to {left: 320px;top: 0;}
}
@-o-keyframes blink {
    from {left: -300px;top: 0;}
    to {left: 320px;top: 0;}
}
@-moz-keyframes blink {
    from {left: -300px;top: 0;}
    to {left: 320px;top: 0;}
}
@keyframes blink {
    from {left: -300px;top: 0;}
    to {left: 320px;top: 0;}
}
</style>

<template>
  <a-config-provider :theme="theme">
    <router-view />
  </a-config-provider>
</template>
<script setup>
import { useStore } from 'vuex';
import { watch, ref, onMounted } from "vue";
import { theme1Color, themeStyle } from "@/style/theme.js";


// 处理主题
const store = useStore();
const theme = ref({});
onMounted(() => {
  handleTheme(localStorage.getItem("THEME_TYPE") || "1");
});
const handleTheme = (val) => {
  localStorage.setItem("THEME_TYPE", val || 1);
  let colorStr = {};
  switch (String(val)) {
    case "1":
      theme.value = themeStyle(theme1Color);
      colorStr = theme1Color;
      break;
    default:
      theme.value = themeStyle(theme1Color);
      colorStr = theme1Color;
  }
  // 给css透露颜色
  let str = "";
  Object.keys(colorStr).forEach((val) => {
    str += "--" + val + ": " + colorStr[val] + ";";
  });
  let html = document.getElementsByTagName("html")[0];
  html.className = "theme" + (val || 1);
  html.style = str;
};
watch(
  () => store.getters["user/token"],
  (val) => {
    handleTheme(val);
  }
);

</script>

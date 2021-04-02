export default {
  data() {
    return {
      title: "二级页面",
    };
  },
  onLoad(options) {
    console.log("onload", options.title);
  },
};

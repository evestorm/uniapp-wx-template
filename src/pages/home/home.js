import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "我是首页",
    };
  },
  computed: {
    ...mapState(["tabBar"]),
  },
};

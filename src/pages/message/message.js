import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "消息",
    };
  },
  onLoad() {},
  computed: {
    ...mapState(["tabBar"]),
  },
  methods: {},
};

import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "工作台",
    };
  },
  onLoad() {},
  computed: {
    ...mapState(["tabBar"]),
  },
  methods: {},
};

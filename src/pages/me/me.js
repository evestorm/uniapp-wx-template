import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  mounted() {
    console.log(this.tabBar);
  },
  computed: {
    ...mapState(["tabBar"]),
  },
  methods: {
    bindClick() {
      console.log(this.title, this.tabBar);
    },
  },
};

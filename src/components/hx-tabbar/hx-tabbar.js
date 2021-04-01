export default {
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};

export default {
  data() {
    return {
      width: 0,
    };
  },
  mounted() {
    this.initSize();
  },
  methods: {
    initSize() {
      uni
        .createSelectorQuery()
        .in(this)
        .selectAll(".desc")
        .fields(
          {
            rect: true,
            dataset: true,
            size: true,
          },
          res => {
            console.log(res);
            this.width = res[0].width;
          },
        )
        .exec();
    },
  },
};

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/main.scss";
          @import "vue-select/src/scss/vue-select.scss";
        `
      }
    }
  }
};
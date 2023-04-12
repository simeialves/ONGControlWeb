const axios = require("axios");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async "db:reset"() {
          const { data } = await axios.delete(
            "http://localhost:5000/pessoas/deleteall"
          );
          return data;
        },
      });
    },
  },
});

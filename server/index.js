const app = require("./app");

const init = async () => {
  try {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();

const { connect } = require("./config/db");

beforeAll(async () => {
  global.connection = await connect();
});

afterAll(async () => {
  await global.connection.end();
});

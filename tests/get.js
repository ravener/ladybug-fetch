const ava = require("ava");
const ladybug = require("../src/");

ava("simple HTTP GET", async t => {
  const { body } = await ladybug.get("https://api.github.com/");
  if (body.current_user_url === "https://api.github.com/user") t.pass("passed HTTP GET");
  else t.fail("failed HTTP GET");
});

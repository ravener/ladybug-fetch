# Ladybug Fetch
A Promise based HTTP(S) client library for NodeJS

## Features
- Lightweight (no dependencies)
- Easy to use
- Full Promises support
- Chainable 
- Auto handle compressed responses (gzip, deflate)
- Auto parse response body (json)
- Auto detect and set content type
- Instances for reducing duplicate calls with options
- Easy plugin support
- Lot of function overloads making it possible to use your style
- Use a custom promise library

## Install
**Note** It is still in early development, examples in this README may or may not work or is not ready, unstable or untested and the code design may change overtime if you would like to contribute Pull Requests and/or Issues are welcome.
```sh
npm install ladybug-fetch
```
Or the development version from the github repository
```sh
npm install freetnt5852/ladybug-fetch
```
You will need `git` installed and added to `PATH` for github installs

## Examples

### Basic Get (json)
```sh
const ladybug = require("ladybug-fetch");

ladybug("https://someapi.com/json")
  .json() // Short way to set content type, not really needed often if the url is meant to return json always
  .then((res) => console.log(res.body))
  .catch((err) => console.error(err));
```

### Headers
```sh
ladybug("https://example.com")
  .set("Authorization", "Key")
  .set({
    "key": "value",
    "another": "foo"
  })
  .set("Authorization=foobar")
  .set(ladybug.bearer("foobar")) // helper function
  .then(console.log)
  .catch(console.error)
```

### Querystrings
```sh
ladybug("https://example.com")
  .query({ limit: 5 })
  .query("key=value")
  .query("key", "value")
  .then((r) => console.log(r.body))
  .catch((e) => console.error(e));
```

### Post Requests
```js
ladybug.post("https://post.com")
  .send({ some: "json" })
  .set(ladybug.bearer(process.env.API_KEY))
  .then(console.log)
  .catch(console.error);
```
Similar way is possible with other methods `ladybug.[get|post|put|patch|delete]` with get being default if no method specified

### Plugins
```js
const ladybug = require("ladybug-fetch");

function plugin(req) {
 // do anything with the request object
 req.set("some-header", "value");
}

ladybug("https://example.com")
  .use(plugin)
  .then(console.log)
  .catch(console.error);
```
If you want options for your plugin export a function that returns a function
```js
const ladybug = require("ladybug-fetch");

function plugin(options = {}) {
  return function(req) {
    if(options.something) req.doSomething();
  }
}

ladybug("https://example.com")
  .use(plugin({ ...options }))
  .then(console.log)
  .catch(console.error)
```

### Global plugins
Plugins are per request by `req.use` however you can apply it globally for every request
```js
const ladybug = require("ladybug-fetch");

function plugin(req) {
  req.set("key", "foobar");
}

ladybug.use(plugin);

ladybug("https://example.com")
  .then(console.log)
  .catch(console.error);
```

### Async/Await
```js
(async() => {

  const res = await ladybug("https://example.com")
    .set("key", "value")
    .query({ limit: 3 });

  console.log(res.body);

})();
```

### Instances
Instances are powerful way to do many requests with lot of options instead of duplicating code
```js
const ladybug = require("ladybug-fetch");

const api = ladybug.create({
  baseURL: "https://baseurl.com", // base url being used
  headers: { key: "value" }, // headers, can be overriden in the actual call
  method: "post", // default method to call if no method specified
  plugins: [plugin1, plugin2], // Array of plugins to be used by every request with tis instance
  query: { limit: 5 } // some default queries, can be overriden in the actual call
});

api("/endpoint") // POST -> https://baseurl.com/endpoint?limit=5
  .send({ json: "data" })
  .then(console.log)
  .catch(console.error);
```

### Using a custom promise library
You can plug in a custom promise library easily for one or more requests

The first method is incase you are overriding the global `Promise` then nothing else is needed
```js
global.Promise = require("bluebird");
// continue as normal
```
But if you want to use it without changing the global promise there are ways

For per requests use `.promise()`
```js
ladybug("https://example.com")
  .promise(require("bluebird"))
  .then((res) => console.log(res.body));

ladybug("https://example.com", { promise: require("bluebird") })
  .then((res) => console.log(res.body));
```
The second way is to use it on an instance this makes it apply for every request on that instance only
```js
const api = ladybug.create({ baseURL: "https://example.com" })
  .promise(require("bluebird"));
// or also pass it in the options object.

api("/route")
  .then((res) => console.log(res.body));
```
The third way is overriding the promise library for the global instance
```js
const ladybug = require("ladybug");
ladybug.promise(require("bluebird"));

ladybug("https://example.com")
  .then((res) => console.log(res.body));
// All requests using global instance now uses that promise library
// This doesn't affect any other instances.
```

### Status Codes
By default the library rejects the promise on `4xx` and `5xx` Errors but it is possible to override that behavior and validate status yourself using `req.status()`

```js
ladybug("https://example.com")
  .status((s) => s < 500) // Anything below 500 is a success
  .then((res) => console.log(res.body));
```
As always all chainable methods are also available on instances to reduce duplications or even override the global instance
```js
const ladybug = require("ladybug-fetch");

ladybug.status((s) => s < 500);

ladybug("https://example.com")
  .then((res) => console.log(res.body));

const api = ladybug.create({ baseURL: "https://example.com" })
  .status((s) => s < 500);

api("/route")
  .then((res) => console.log(res.body));
```

## TODO
This library is still under early development and is not complete, Pull Requests are welcome if you want to contribute.

- [x] ~~Add support for following redirect codes.~~ (kind of experimental though)
- [x] ~~Form Data support~~
- [ ] A good test suite.
- [x] ~~TypeScript typings~~ (Typings contributed by [@IceeMC](https://github.com/IceeMC) and fixed by me, may still have some issues.)
- [ ] Streams support? e.g `req.pipe(fs.createWriteStream("./out.txt"));`

See also comments in code with `TODO`

## License
[MIT](LICENSE)

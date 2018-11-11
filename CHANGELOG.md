# 0.1.0 (Huge changes, but backward compatible)
- Now includes mime types (see `src/mimes.json` and `src/mime.js`)
- Added `req.accept(ext)` for setting the Accept request header by an extension, i.e `req.accept("json")` will set the header `Accept: application/json`
- Sending form data is now supported (although kind of experimental)
- Utils are exported as a whole class with `utils` property rather than exporting each method, this is a breaking change for those who used the utils class.
- Improved url parsing by a lot, it can handle urls like (baseURL: "https://foobar.com:500/path?query=5", url: "/anotherpath?limit=5", query: { another: "bar" }) now it joins those urls properly carefully noting the query and stuff in them.
- Improved request data sending now you can send an array of chunks.
- Experimental redirect following, may need a few special handling cases to be better but should work for now.
- Added `res.get()` for getting a response header case insensitive

# 0.0.4
- Fixes the port problem, i.e urls like `http://localhost:3000` throws `Error: getaddrinfo ENOTFOUND localhost:3000 localhost:3000:3000`

# 0.0.1 Release
- 0.0.1 is now released on npm, it is still incomplete and missing some features but in my opinion it is enough to be useable
- Improved request unzipping, stopped using unzip.js file and actually implemented a faster and better solution in the same file.
- Experimental support for `application/x-www-form-urlencoded` data by setting Content-Type first then `req.send()` will stringify it properly.

# Bug Fix
- Fixes the bug where if you set options for a request it overrides the instance options by cloning the objects
- Can't clone a set for some reason so plugins is now an array and this allows duplicates but in my opinion this could be useful sometimes like run a plugin multiple times

# 0.0.1 (Development release)
- Initial Release
- Could be unstable
- Version won't be incremented until a stable npm release

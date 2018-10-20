# 0.0.4
- Fixes the port problem, i.e urls like `http://localhost:3000` throws `Error: getaddrinfo ENOTFOUND localhost:3000 localhost:3000:3000`

# 0.0.1 Release
- 0.0.1 is now released on npm, it is still incomplete and missing some features but in my opinion it is enough to be useable
- Improved request unzipping, stopped using unzip.js file and actually implemented a faster and better solution in the same file.
- Experimental support for `application/x-www-form-urlencoded` data by setting Content-Type first then `req.set()` will stringify it properly.

# Bug Fix
- Fixes the bug where if you set options for a request it overrides the instance options by cloning the objects
- Can't clone a set for some reason so plugins is now an array and this allows duplicates but in my opinion this could be useful sometimes like run a plugin multiple times

# 0.0.1 (Development release)
- Initial Release
- Could be unstable
- Version won't be incremented until a stable npm release

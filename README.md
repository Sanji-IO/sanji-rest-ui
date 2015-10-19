# sanji-rest-ui
> Sanji rest service is part of Sanji UI framework and also it is a angular
module. It is just a restful wrapper and can switch protocol like websocket or
others, default is http.

[sanji-rest-ui-icon]: https://nodei.co/npm/sanji-rest-ui.png?downloads=true
[sanji-rest-ui-url]: https://npmjs.org/package/sanji-rest-ui
[quality-badge]: http://npm.packagequality.com/badge/sanji-rest-ui.png
[quality-url]: http://packagequality.com/#?package=sanji-rest-ui
[travis-build-badge]: https://travis-ci.org/Sanji-IO/sanji-rest-ui.svg?branch=master
[travis-build-url]: https://travis-ci.org/Sanji-IO/sanji-rest-ui
[sanji-rest-ui-coverage-image]: http://codecov.io/github/Sanji-IO/sanji-rest-ui/coverage.svg?branch=master
[sanji-rest-ui-coverage-url]: http://codecov.io/github/Sanji-IO/sanji-rest-ui?branch=master
[sanji-rest-ui-codacy-image]: https://api.codacy.com/project/badge/13d7e2e9bf1b40a3bd9a3113c7cea587
[sanji-rest-ui-codacy-url]: https://www.codacy.com/public/zack9433/sanji-rest-ui.git
[dependencies-image]: https://david-dm.org/Sanji-IO/sanji-rest-ui.png
[dependencies-url]: https://david-dm.org/Sanji-IO/sanji-rest-ui
[devdependencies-image]: https://david-dm.org/Sanji-IO/sanji-rest-ui/dev-status.png
[devdependencies-url]: https://david-dm.org/Sanji-IO/sanji-rest-ui#info=devDependencies
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[![NPM][sanji-rest-ui-icon]][sanji-rest-ui-url]
[![Package Quality][quality-badge]][quality-url]
[![Build Status][travis-build-badge]][travis-build-url]
[![Coverage Status][sanji-rest-ui-coverage-image]][sanji-rest-ui-coverage-url]
[![Codacy Badge][sanji-rest-ui-codacy-image]][sanji-rest-ui-codacy-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][devdependencies-image]][devdependencies-url]
[![semantic-release][semantic-release-image]][semantic-release-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]

## Dependencies
- [angularjs](https://github.com/angular/angular.js)
- [ng-file-upload](https://github.com/danialfarid/ng-file-upload)

## Installation
Sanji rest service is based on es6 + webpack to development and embrace npm to install it.

```shell
npm install sanji-rest-ui --save
```

## How to use
You need to include module first.
```javascript
let app = angular.module('webapp', ['sanji.rest'])
```
and then use `rest` as DI service.
```javascript
class AppController {
  constructor(rest) {
    rest.get('/users/me')
    .then(data => {
      console.log(data);
    })
    .catch(data => {
      console.log(data);
    });

    rest.post('/login', { username: 'admin', password: 'xxxxx' })
    .then(data => {
      console.log(data);
    })
    .catch(data => {
      console.log(data);
    });
  }
}
AppController.$inject = ['rest'];
```

## Contact

Author: Zack Yang &copy; 2015

* [@zack9433](https://twitter.com/zack9433)

Support: if you find any problems with this library,
[open issue](https://github.com/Sanji-IO/sanji-rest-ui/issues) on Github


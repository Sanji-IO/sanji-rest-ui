!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("angular"),require("ng-file-upload")):"function"==typeof define&&define.amd?define(["angular","ng-file-upload"],e):"object"==typeof exports?exports.sjRest=e(require("angular"),require("ng-file-upload")):t.sjRest=e(t.angular,t.ngFileUpload)}(this,function(t,e){return function(t){function e(r){if(n[r])return n[r].exports;var u=n[r]={i:r,l:!1,exports:{}};return t[r].call(u.exports,u,u.exports,e),u.l=!0,u.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,e,n){Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=["$http"],a=function(){function t(){for(var e=this,n=arguments.length,u=Array(n),o=0;o<n;o++)u[o]=arguments[o];r(this,t),t.$inject.forEach(function(t,n){return e[t]=u[n]})}return u(t,[{key:"get",value:function(t){return this.$http.get.apply(null,t)}},{key:"post",value:function(t){return this.$http.post.apply(null,t)}},{key:"put",value:function(t){return this.$http.put.apply(null,t)}},{key:"delete",value:function(t){return this.$http.delete.apply(null,t)}}]),t}();a.$inject=o,e.a=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=[],a=function(){function t(){for(var e=this,n=arguments.length,u=Array(n),o=0;o<n;o++)u[o]=arguments[o];r(this,t),t.$inject.forEach(function(t,n){return e[t]=u[n]}),this.config={service:"http",basePath:""},this.configure=function(t){return Object.assign(e.config,t)}}return u(t,[{key:"$get",value:function(t,e,n,r){"ngInject";function u(e,n,r,u){var i=t.defer(),c=u||{},f=c.basePath||o.basePath,s=[f+n];return e=e.toLowerCase(),e.match(/post|put/)&&s.push(r),e.match(/delete/)&&(c.data=r,c.headers={"Content-Type":"application/json"}),s.push(c),a[e](s).then(function(t){i.resolve(t)}).catch(function(t){i.reject(t)}),i.promise}var o=this.config,a=n.get(o.service);return{configure:function(t){return Object.assign(o,t)},get:function(t,e){return u("get",t,null,e)},post:function(t,e,n,a){if("http"===o.service&&Array.isArray(n)){a=a||{};var i=a.basePath||o.basePath;return r.upload({url:i+t,method:"POST",data:{files:n,otherInfo:e}})}return u("post",t,e,a)},put:function(t,e,n,a){if("http"===o.service&&Array.isArray(n)){a=a||{};var i=a.basePath||o.basePath;return r.upload({url:i+t,method:"PUT",data:{files:n,otherInfo:e}})}return u("put",t,e,a)},"delete":function(t,e,n){return u("delete",t,e,n)}}}}]),t}();a.$inject=o,e.a=a},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){"use strict";var r=n(2),u=r&&r.__esModule?function(){return r.default}:function(){return r};n.d(u,"a",u);var o=n(3),a=o&&o.__esModule?function(){return o.default}:function(){return o};n.d(a,"a",a);var i=n(0),c=n(1);n.d(e,"sjRest",function(){return f});var f=u.a.module("sanji.rest",[a.a]).service("http",i.a).provider("rest",c.a).name}])});
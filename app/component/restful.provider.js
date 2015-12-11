const $inject = [];
class RestProvider {
  constructor(...injects) {
    RestProvider.$inject.forEach((item, index) => this[item] = injects[index]);

    this.config = {
      service: 'http',
      basePath: ''
    };

    this.configure = cfg => Object.assign(this.config, cfg);
  }

  $get($q, $log, $injector, Upload) {
    let config = this.config;
    let rest = $injector.get(config.service);

    return {
      configure: cfg => Object.assign(config, cfg),
      get: (uri, options) => {
        return makeRequest('get', uri, null, options);
      },
      post: (uri, data, files, options) => {
        if ('http' === config.service && Array.isArray(files)) {
          options = options || {};
          let base = options.basePath || config.basePath;
          return Upload.upload({
            url: base + uri,
            method: 'POST',
            data: {
              files: files,
              otherInfo: data
            }
          });
        }
        else {
          return makeRequest('post', uri, data, options);
        }
      },
      put: (uri, data, files, options) => {
        if ('http' === config.service && Array.isArray(files)) {
          options = options || {};
          let base = options.basePath || config.basePath;
          return Upload.upload({
            url: base + uri,
            method: 'PUT',
            data: {
              files: files,
              otherInfo: data
            }
          });
        }
        else {
          return makeRequest('put', uri, data, options);
        }
      },
      delete: (uri, options) => {
        return makeRequest('delete', uri, null, options);
      }
    };

    function makeRequest(verb, uri, data, options) {
      let defer = $q.defer();
      options = options || {};
      let base = options.basePath || config.basePath;
      let params = options.params || {};
      verb = verb.toLowerCase();

      //start with the uri
      let args = [base + uri];
      if (verb.match(/post|put|delete/)) {
        args.push(data);
      }
      args.push({params: params});

      rest[verb](args)
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(res) {
        defer.reject(res);
      });

      return defer.promise;
    }
  }
}
RestProvider.$inject = $inject;
export default RestProvider;

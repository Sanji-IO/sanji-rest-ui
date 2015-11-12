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
      get: (uri, basePath) => {
        return makeRequest('get', uri, null, basePath);
      },
      post: (uri, data, files, basePath) => {
        if ('http' === config.service && Array.isArray(files)) {
          let base = basePath || config.basePath;
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
          return makeRequest('post', uri, data, basePath);
        }
      },
      put: (uri, data, files, basePath) => {
        if ('http' === config.service && Array.isArray(files)) {
          let base = basePath || config.basePath;
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
          return makeRequest('put', uri, data, basePath);
        }
      },
      delete: (uri, basePath) => {
        return makeRequest('delete', uri, null, basePath);
      }
    };

    function makeRequest(verb, uri, data, basePath) {
      let defer = $q.defer();
      let base = basePath || config.basePath;
      verb = verb.toLowerCase();

      //start with the uri
      let args = [base + uri];
      if (verb.match(/post|put|delete/)) {
        args.push(data);
      }

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

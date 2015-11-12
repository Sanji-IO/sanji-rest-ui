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
      configure: cfg => Object.assign(this.config, cfg),
      get: uri => makeRequest('get', uri),
      post: (uri, data, files) => {
        if ('http' === config.service && Array.isArray(files)) {
          return Upload.upload({
            url: config.basePath + uri,
            method: 'POST',
            data: {
              files: files,
              otherInfo: data
            }
          });
        }
        else {
          return makeRequest('post', uri, data);
        }
      },
      put: (uri, data, files) => {
        if ('http' === config.service && Array.isArray(files)) {
          return Upload.upload({
            url: config.basePath + uri,
            method: 'PUT',
            data: {
              files: files,
              otherInfo: data
            }
          });
        }
        else {
          return makeRequest('put', uri, data);
        }
      },
      delete: uri => makeRequest('delete', uri)
    };

    function makeRequest(verb, uri, data) {
      let defer = $q.defer();
      verb = verb.toLowerCase();

      //start with the uri
      let args = [config.basePath + uri];
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

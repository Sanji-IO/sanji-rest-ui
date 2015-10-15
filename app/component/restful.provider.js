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

  $get($q, $log, $injector) {
    let config = this.config;
    let rest = $injector.get(config.service);

    return {
      get: function(uri) {
        return makeRequest('get', uri);
      },
      post: function(uri, data) {
        return makeRequest('post', uri, data);
      },
      put: function(uri, data) {
        return makeRequest('put', uri, data);
      },
      delete: function(uri) {
        return makeRequest('delete', uri);
      }
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

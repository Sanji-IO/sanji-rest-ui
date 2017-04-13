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
    'ngInject';
    let config = this.config;
    let rest = $injector.get(config.service);

    return {
      configure: cfg => Object.assign(config, cfg),
      get: (uri, options) => {
        return makeRequest('get', uri, null, options);
      },
      post: (uri, data, files, options = {}) => {
        if ('http' === config.service && Array.isArray(files)) {
          const base = options.basePath || config.basePath;
          const setting = {
            url: base + uri,
            method: 'POST',
            data: {}
          };
          transformUploadSetting(setting, data, files);
          return Upload.upload(Object.assign(setting, options));
        } else {
          return makeRequest('post', uri, data, options);
        }
      },
      put: (uri, data, files, options = {}) => {
        if ('http' === config.service && Array.isArray(files)) {
          options = options || {};
          const base = options.basePath || config.basePath;
          const setting = {
            url: base + uri,
            method: 'PUT',
            data: {}
          };
          transformUploadSetting(setting, data, files);
          return Upload.upload(Object.assign(setting, options));
        } else {
          return makeRequest('put', uri, data, options);
        }
      },
      delete: (uri, data, options) => {
        return makeRequest('delete', uri, data, options);
      }
    };

    function transformUploadSetting(setting, data, files) {
      if (files[0] instanceof File) {
        files.length === 1 ? (setting.data.file = files[0]) : (setting.data.files = files);
      } else {
        files.forEach(item => {
          if (item.key) {
            setting.data[item.key] = item.file;
          }
        });
      }
      if (data) {
        setting.data = Object.assign({}, setting.data, data);
      }
    }

    function makeRequest(verb, uri, data, options = {}) {
      let defer = $q.defer();
      let reqConfig = JSON.parse(JSON.stringify(options));
      let base = reqConfig.basePath || config.basePath;
      //start with the uri
      let args = [base + uri];

      verb = verb.toLowerCase();

      if (verb.match(/post|put/)) {
        args.push(data);
      }

      if (verb.match(/delete/)) {
        reqConfig.data = data;
        if (reqConfig.headers) {
          reqConfig.headers['Content-Type'] = 'application/json';
        } else {
          reqConfig.headers = { 'Content-Type': 'application/json' };
        }
      }

      args.push(reqConfig);

      rest
        [verb](args)
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

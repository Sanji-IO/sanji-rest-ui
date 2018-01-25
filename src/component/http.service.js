const $inject = ['$http'];
class HttpService {
  constructor(...injects) {
    HttpService.$inject.forEach((item, index) => (this[item] = injects[index]));
  }

  get(httpArgs) {
    return this.$http.get.apply(null, httpArgs);
  }

  post(httpArgs) {
    return this.$http.post.apply(null, httpArgs);
  }

  put(httpArgs) {
    return this.$http.put.apply(null, httpArgs);
  }

  delete(httpArgs) {
    return this.$http.delete.apply(null, httpArgs);
  }
}

HttpService.$inject = $inject;

export default HttpService;

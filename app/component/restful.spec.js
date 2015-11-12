import ngFileUpload from 'ng-file-upload';

import RestProvider from './restful.provider' ;
import HttpService from './http.service' ;

let sandbox;
let $q, $log, $http, $injector, $timeout, Upload;
let restProvider;
let http;

describe('Provider: rest', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(angular.mock.module(ngFileUpload));

  beforeEach(() => {
    angular.mock.inject((_$q_, _$log_, _$injector_, _$http_, _$timeout_, _Upload_) => {
      $q = _$q_;
      $log = _$log_;
      $injector = _$injector_;
      $http = _$http_;
      $timeout = _$timeout_;
      Upload = _Upload_;
    });
  });

  beforeEach(() => {
    restProvider = new RestProvider();
    http = new HttpService($http);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('#configure(<config>) should extend config', () => {
    let config = {
      service: 'websocket',
      basePath: '/api/v1'
    };
    restProvider.configure(config);
    expect(restProvider.config).to.eql(config);
  });

  it('#$get(<...injects>) should return rest service instance', () => {
    let obj;
    sandbox.stub($injector, 'get').returns(http);
    obj = restProvider.$get($q, $log, $injector, Upload);
    expect(obj.get).to.be.a('function');
    expect(obj.put).to.be.a('function');
    expect(obj.post).to.be.a('function');
    expect(obj.delete).to.be.a('function');
  });

  describe('Service: rest', () => {
    it('#configure(<config>) should extend config', () => {
      let obj;
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      let config = {
        basePath: '/api/v1'
      };
      expect(obj.configure(config)).to.eql({service: 'http', basePath: '/api/v1'});
    });

    it('#get(<url>) should return success fake data', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'get').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      obj.get('/test')
        .then(data => {
          expect(data).to.equal(fakeData);
          expect(http.get).to.be.called;
          done();
        });
      deferred.resolve(fakeData);
      $timeout.flush();
    });

    it('#get(<url>) should return fail fake data', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'get').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      obj.get('/test')
        .catch(data => {
          expect(data).to.equal(fakeData);
          expect(http.get).to.be.called;
          done();
        });
      deferred.reject(fakeData);
      $timeout.flush();
    });

    it('#post(<url>, <data>) should return success post fake data', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'post').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      obj.post('/test', fakeData)
        .then(data => {
          expect(data).to.equal(fakeData);
          expect(http.post).to.be.called;
          done();
        });
      deferred.resolve(fakeData);
      $timeout.flush();
    });

    it('#post(<url>, <data>) should return fail post fake data', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'post').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      obj.post('/test', fakeData)
        .catch(data => {
          expect(data).to.equal(fakeData);
          expect(http.post).to.be.called;
          done();
        });
      deferred.reject(fakeData);
      $timeout.flush();
    });

    it('#put(<url>, <data>) should return success put fake data', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'put').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector);
      obj.put('/test', fakeData)
        .then(data => {
          expect(data).to.equal(fakeData);
          expect(http.put).to.be.called;
          done();
        });
      deferred.resolve(fakeData);
      $timeout.flush();
    });

    it('#put(<url>, <data>) should return fail put fake data', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'put').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      obj.put('/test', fakeData)
        .catch(data => {
          expect(data).to.equal(fakeData);
          expect(http.put).to.be.called;
          done();
        });
      deferred.reject(fakeData);
      $timeout.flush();
    });

    it('#delete(<url>, <data>) should return success delete result', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'delete').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      obj.delete('/test', fakeData)
        .then(data => {
          expect(data).to.equal(fakeData);
          expect(http.delete).to.be.called;
          done();
        });
      deferred.resolve(fakeData);
      $timeout.flush();
    });

    it('#delete(<url>, <data>) should return fail delete result', (done) => {
      let obj, deferred = $q.defer();
      let fakeData = { key: 'value' };
      sandbox.stub(http, 'delete').returns(deferred.promise);
      sandbox.stub($injector, 'get').returns(http);
      obj = restProvider.$get($q, $log, $injector, Upload);
      obj.delete('/test', fakeData)
        .catch(data => {
          expect(data).to.equal(fakeData);
          expect(http.delete).to.be.called;
          done();
        });
      deferred.reject(fakeData);
      $timeout.flush();
    });
  });
});

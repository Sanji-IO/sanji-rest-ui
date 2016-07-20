import angular from 'angular';
import 'angular-mocks';

import HttpService from './http.service' ;

let $http;
let httpService;

describe('Service: http', () => {
  beforeEach(() => {
    angular.mock.inject(_$http_ => {
      $http = _$http_;
    });
  });

  beforeEach(() => {
    httpService = new HttpService($http);
  });

  it('#get() should return somthing', () => {
    sinon.spy($http, 'get');
    httpService.get(['/test']);
    expect($http.get.called).to.be.true;
    $http.get.restore();
  });

  it('#post() should call $http.post', () => {
    sinon.spy($http, 'post');
    httpService.post(['/test']);
    expect($http.post.called).to.be.true;
    $http.post.restore();
  });

  it('#put() should call $http.put', () => {
    sinon.spy($http, 'put');
    httpService.put(['/test']);
    expect($http.put.called).to.be.true;
    $http.put.restore();
  });

  it('#delete() should call $http.delete', () => {
    sinon.spy($http, 'delete');
    httpService.delete(['/test']);
    expect($http.delete.called).to.be.true;
    $http.delete.restore();
  });
});

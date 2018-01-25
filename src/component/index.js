import angular from 'angular';
import ngFileUpload from 'ng-file-upload';

import HttpService from './http.service';
import RestHelper from './restful.provider';

const sjRest = angular
  .module('sanji.rest', [ngFileUpload])
  .service('http', HttpService)
  .provider('rest', RestHelper).name;
export { sjRest };

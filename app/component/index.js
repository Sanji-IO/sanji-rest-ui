import angular from 'angular';
import ngFileUpload from 'ng-file-upload';

import HttpService from './http.service';
import RestHelper from './restful.provider';

let app = angular.module('sanji.rest', [ngFileUpload]);
app.service('http', HttpService);
app.provider('rest', RestHelper);
export default app = app.name;

import sjLogger from 'sanji-logger-ui';
import HttpService from './http.service';
import RestHelper from './restful.provider';

let app = angular.module('sanji.rest', [sjLogger]);
app.service('http', HttpService);
app.provider('rest', RestHelper);
export default app = app.name

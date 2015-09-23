import HttpService from './http.service';
import RestHelper from './restful.provider';

let app = angular.module('sanji.rest', []);
app.service('http', HttpService);
app.provider('rest', RestHelper);
export default app = app.name

import 'angular-material.css';
import 'toastr.scss';
import 'angular-sanji-window.css';
import './app.scss';
import angular from 'angular';
import sjWindow from 'angular-sanji-window';
import { sjRest } from './component';

class EthernetController {
  constructor(...injects) {
    EthernetController.$inject.forEach((item, index) => (this[item] = injects[index]));
    this.rest
      .get('/network/ethernets/1', {
        params: {
          hello: 'world'
        }
      })
      .then(res => {
        this.ethernet = {
          ip: res.data.ip,
          netmask: res.data.netmask,
          gateway: res.data.gateway
        };
      });
  }
}
EthernetController.$inject = ['rest'];

const app = angular.module('webapp', [sjRest, sjWindow]);
app.config(restProvider => {
  restProvider.configure({ basePath: 'http://private-d8e84-sanjigeneric.apiary-mock.com' });
});
app.controller('EthernetController', EthernetController);

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['webapp']);
});

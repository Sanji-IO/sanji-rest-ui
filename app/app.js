import 'angular-material.css';
import './app.scss';
import 'angular';
import sanjiWindow from 'angular-sanji-window';
import component from './component';

class EthernetController {
  constructor(...injects) {
    EthernetController.$inject.forEach((item, index) => this[item] = injects[index]);
    this.rest.get('/network/ethernets/1')
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

let app = angular.module('webapp', [component, sanjiWindow]);
app.config(restProvider => {
  restProvider.configure({basePath: 'http://private-d8e84-sanjigeneric.apiary-mock.com'});
});
app.controller('EthernetController', EthernetController);

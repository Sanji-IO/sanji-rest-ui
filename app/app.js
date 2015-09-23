import 'angular-material.css';
import './app.scss';
import 'angular';
import sanjiWindow from 'angular-sanji-window';
import component from './component';

class EthernetController {
  constructor(...injects) {
    EthernetController.$inject.forEach((item, index) => this[item] = injects[index]);
    this.rest.get('http://private-d8e84-sanjigeneric.apiary-mock.com/network/ethernets/1')
      .then((data) => {
        this.ethernet = {
          ip: data.ip,
          netmask: data.netmask,
          gateway: data.gateway
        };
      });
  }
}
EthernetController.$inject = ['rest'];

let app = angular.module('webapp', [component, sanjiWindow]);
app.config(restProvider => {
  restProvider.configure({basePath: ''});
});
app.controller('EthernetController', EthernetController);
app.run(rest => {
  rest.post('http://private-d8e84-sanjigeneric.apiary-mock.com/network/ethernets', {
    ip: '192.168.31.204',
    netmask: '255.255.255.0',
    gateway: '192.168.31.254'
  });
  rest.put('http://private-d8e84-sanjigeneric.apiary-mock.com/network/ethernets', {
    ip: '192.168.31.204',
    netmask: '255.255.255.0',
    gateway: '192.168.31.254'
  });
  rest.delete('http://private-d8e84-sanjigeneric.apiary-mock.com/network/ethernets', {
    ip: '192.168.31.204',
    netmask: '255.255.255.0',
    gateway: '192.168.31.254'
  });
});

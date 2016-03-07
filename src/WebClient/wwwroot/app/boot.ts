/*//<reference path="../../node_modules/angular2/typings/browser.d.ts"/>*/
 
import {bootstrap}      from 'angular2/platform/browser';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
 
import {Main}       from './components/Main.component';
import {ServerAPI}   from './services/ServerAPI.service';

import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(Main, [ServerAPI, Http, HTTP_PROVIDERS,ROUTER_PROVIDERS]);
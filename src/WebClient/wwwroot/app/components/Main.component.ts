import {Component} from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {Identity} from './Identity.component';
import {Medical} from './Medical.component';
import {ClothingSizesView} from './ClothingSizesView.component';
import {Likes} from './Likes.component';
import {Dislikes} from './Dislikes.component';
import {FinancialList} from './FinancialList.component';
import {PsychologyView} from './PsychologyView.component';
import {EducationView} from './EducationView.component';

@Component({
    selector: 'main',
    template: `
            <!-- tabs left -->
            <div class="tabbable tabs-left">
                <ul class="nav nav-tabs blacklinks text-left navbarLeftMenu">

                    <li [class.active]="router.isRouteActive(router.generate(['/Identity',{instanceId : insid}]))">
                        <a [routerLink]="['Identity',{instanceId : insid}]"><i class="fa fa-picture-o fa-fw"></i> Identity</a>
                    </li>
                    <li [class.active]="router.isRouteActive(router.generate(['/Medical',{instanceId : insid}]))">
                        <a [routerLink]="['Medical',{instanceId : insid}]"><i class="fa fa-medkit fa-fw"></i> Medical</a>
                    </li>
                    <li [class.active]="router.isRouteActive(router.generate(['/ClothingSizes',{instanceId : insid}]))">
                        <a [routerLink]="['ClothingSizes',{instanceId : insid}]"><i class="fa fa-arrows fa-fw"></i> Clothing</a>
                    </li>
                    <li [class.active]="router.isRouteActive(router.generate(['/Likes',{instanceId : insid}]))">
                        <a [routerLink]="['Likes',{instanceId : insid}]"><i class="fa fa-thumbs-o-up fa-fw"></i> Likes/Dislikes</a>
                    </li>
                    <li [class.active]="router.isRouteActive(router.generate(['/Psychology',{instanceId : insid}]))">
                        <a [routerLink]="['Psychology',{instanceId : insid}]" ><i class="fa fa-lightbulb-o fa-fw"></i> Psychology</a>
                    </li>
                    <li [class.active]="router.isRouteActive(router.generate(['/Financial',{instanceId : insid}]))">
                        <a [routerLink]="['Financial',{instanceId : insid}]"><i class="fa fa-money fa-fw"></i> Bank Account</a>
                    </li>
                    <li [class.active]="router.isRouteActive(router.generate(['/Education',{instanceId : insid}]))">
                        <a [routerLink]="['Education',{instanceId : insid}]"><i class="fa fa-graduation-cap fa-fw"></i> Education</a></li>
                    <li><a data-rl="['Relationships']"><i class="fa fa-sitemap fa-fw"></i> Relationships</a></li>
                    <li><a data-rl="['Contact']"><i class="fa fa-comment-o fa-fw"></i> Contact</a></li>

                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="a">
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </div>
            <!-- /tabs left -->`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/Identity/:instanceId', name: 'Identity', component: Identity, useAsDefault: true },
    { path: '/Medical/:instanceId', name: 'Medical', component: Medical },
    { path: '/Likes/:instanceId', name: 'Likes', component: Likes },
    { path: '/Financial/:instanceId', name: 'Financial', component: FinancialList },
    { path: '/Clothing/:instanceId', name: 'ClothingSizes', component: ClothingSizesView },
    { path: '/Education/:instanceId', name: 'Education', component: EducationView },
    { path: '/Psychology/:instanceId', name: 'Psychology', component: PsychologyView }
])
export class Main {
    insid: string;

    constructor(private router: Router) {
        this.insid = "37e717c8-32e1-e511-8d81-a0b3cc47d18e";

        router.subscribe((val) => console.log("Navigating to: " + val))
    }
}

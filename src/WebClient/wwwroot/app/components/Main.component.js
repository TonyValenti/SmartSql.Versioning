System.register(['angular2/core', 'angular2/router', './Identity.component', './Medical.component', './ClothingSizesView.component', './Likes.component', './FinancialList.component', './PsychologyView.component', './EducationView.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, Identity_component_1, Medical_component_1, ClothingSizesView_component_1, Likes_component_1, FinancialList_component_1, PsychologyView_component_1, EducationView_component_1;
    var Main;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Identity_component_1_1) {
                Identity_component_1 = Identity_component_1_1;
            },
            function (Medical_component_1_1) {
                Medical_component_1 = Medical_component_1_1;
            },
            function (ClothingSizesView_component_1_1) {
                ClothingSizesView_component_1 = ClothingSizesView_component_1_1;
            },
            function (Likes_component_1_1) {
                Likes_component_1 = Likes_component_1_1;
            },
            function (FinancialList_component_1_1) {
                FinancialList_component_1 = FinancialList_component_1_1;
            },
            function (PsychologyView_component_1_1) {
                PsychologyView_component_1 = PsychologyView_component_1_1;
            },
            function (EducationView_component_1_1) {
                EducationView_component_1 = EducationView_component_1_1;
            }],
        execute: function() {
            Main = (function () {
                function Main(router) {
                    this.router = router;
                    this.insid = "22fcf440-d3d5-e511-8d7c-a0b3cc47d18e";
                    router.subscribe(function (val) { return console.log("Navigating to: " + val); });
                }
                Main = __decorate([
                    core_1.Component({
                        selector: 'main',
                        template: "\n            <!-- tabs left -->\n            <div class=\"tabbable tabs-left\">\n                <ul class=\"nav nav-tabs blacklinks text-left navbarLeftMenu\">\n\n                    <li [class.active]=\"router.isRouteActive(router.generate(['/Identity',{instanceId : insid}]))\">\n                        <a [routerLink]=\"['Identity',{instanceId : insid}]\"><i class=\"fa fa-picture-o fa-fw\"></i> Identity</a>\n                    </li>\n                    <li [class.active]=\"router.isRouteActive(router.generate(['/Medical',{instanceId : insid}]))\">\n                        <a [routerLink]=\"['Medical',{instanceId : insid}]\"><i class=\"fa fa-medkit fa-fw\"></i> Medical</a>\n                    </li>\n                    <li [class.active]=\"router.isRouteActive(router.generate(['/ClothingSizes',{instanceId : insid}]))\">\n                        <a [routerLink]=\"['ClothingSizes',{instanceId : insid}]\"><i class=\"fa fa-arrows fa-fw\"></i> Clothing</a>\n                    </li>\n                    <li [class.active]=\"router.isRouteActive(router.generate(['/Likes',{instanceId : insid}]))\">\n                        <a [routerLink]=\"['Likes',{instanceId : insid}]\"><i class=\"fa fa-thumbs-o-up fa-fw\"></i> Likes/Dislikes</a>\n                    </li>\n                    <li [class.active]=\"router.isRouteActive(router.generate(['/Psychology',{instanceId : insid}]))\">\n                        <a [routerLink]=\"['Psychology',{instanceId : insid}]\" ><i class=\"fa fa-lightbulb-o fa-fw\"></i> Psychology</a>\n                    </li>\n                    <li [class.active]=\"router.isRouteActive(router.generate(['/Financial',{instanceId : insid}]))\">\n                        <a [routerLink]=\"['Financial',{instanceId : insid}]\"><i class=\"fa fa-money fa-fw\"></i> Financial</a>\n                    </li>\n                    <li [class.active]=\"router.isRouteActive(router.generate(['/Education',{instanceId : insid}]))\">\n                        <a [routerLink]=\"['Education',{instanceId : insid}]\"><i class=\"fa fa-graduation-cap fa-fw\"></i> Education</a></li>\n                    <li><a data-rl=\"['Relationships']\"><i class=\"fa fa-sitemap fa-fw\"></i> Relationships</a></li>\n                    <li><a data-rl=\"['Contact']\"><i class=\"fa fa-comment-o fa-fw\"></i> Contact</a></li>\n\n                </ul>\n                <div class=\"tab-content\">\n                    <div class=\"tab-pane active\" id=\"a\">\n                        <router-outlet></router-outlet>\n                    </div>\n                </div>\n            </div>\n            <!-- /tabs left -->",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/Identity/:instanceId', name: 'Identity', component: Identity_component_1.Identity, useAsDefault: true },
                        { path: '/Medical/:instanceId', name: 'Medical', component: Medical_component_1.Medical },
                        { path: '/Likes/:instanceId', name: 'Likes', component: Likes_component_1.Likes },
                        { path: '/Financial/:instanceId', name: 'Financial', component: FinancialList_component_1.FinancialList },
                        { path: '/Clothing/:instanceId', name: 'ClothingSizes', component: ClothingSizesView_component_1.ClothingSizesView },
                        { path: '/Education/:instanceId', name: 'Education', component: EducationView_component_1.EducationView },
                        { path: '/Psychology/:instanceId', name: 'Psychology', component: PsychologyView_component_1.PsychologyView }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], Main);
                return Main;
            })();
            exports_1("Main", Main);
        }
    }
});
//# sourceMappingURL=Main.component.js.map
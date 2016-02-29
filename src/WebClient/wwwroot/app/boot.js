System.register(['angular2/platform/browser', 'angular2/http', './components/Main.component', './services/ServerAPI.service', 'angular2/router'], function(exports_1) {
    var browser_1, http_1, Main_component_1, ServerAPI_service_1, router_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Main_component_1_1) {
                Main_component_1 = Main_component_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(Main_component_1.Main, [ServerAPI_service_1.ServerAPI, http_1.Http, http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=boot.js.map
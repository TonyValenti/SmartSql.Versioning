System.register([], function(exports_1) {
    var Financial;
    return {
        setters:[],
        execute: function() {
            Financial = (function () {
                function Financial(Name, AccountNumber, Description, Institution, InstanceId) {
                    this.Name = Name;
                    this.AccountNumber = AccountNumber;
                    this.Description = Description;
                    this.Institution = Institution;
                    this.InstanceId = InstanceId;
                }
                return Financial;
            })();
            exports_1("Financial", Financial);
        }
    }
});
//# sourceMappingURL=Financial.js.map
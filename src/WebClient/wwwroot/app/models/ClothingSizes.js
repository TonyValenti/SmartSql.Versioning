System.register([], function(exports_1) {
    var ClothingSizes;
    return {
        setters:[],
        execute: function() {
            /**
             *  Class for holding clothing sizes information
             */
            ClothingSizes = (function () {
                function ClothingSizes(Shirt, Pant, Shoe, Belt, Head, Dress) {
                    this.Shirt = Shirt;
                    this.Pant = Pant;
                    this.Shoe = Shoe;
                    this.Belt = Belt;
                    this.Head = Head;
                    this.Dress = Dress;
                }
                return ClothingSizes;
            })();
            exports_1("ClothingSizes", ClothingSizes);
        }
    }
});
//# sourceMappingURL=ClothingSizes.js.map
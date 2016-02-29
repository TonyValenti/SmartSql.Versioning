System.register(['angular2/core', '../services/ServerAPI.service', '../services/Like.service', '../directives/SelectedPerson.directive', "../directives/radio_value_accessor", "angular2/common", 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, ServerAPI_service_1, Like_service_1, SelectedPerson_directive_1, radio_value_accessor_1, common_1, router_1;
    var Likes;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (Like_service_1_1) {
                Like_service_1 = Like_service_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            },
            function (radio_value_accessor_1_1) {
                radio_value_accessor_1 = radio_value_accessor_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Likes = (function () {
                function Likes(_serverAPI, _likeSvc, _routeParams) {
                    var _this = this;
                    this._serverAPI = _serverAPI;
                    this._likeSvc = _likeSvc;
                    this._routeParams = _routeParams;
                    this.LikeCategory = {
                        Beverage: 100,
                        Book: 200,
                        Food: 300,
                        Game: 400,
                        Hobby: 500,
                        Movie: 600,
                        Music: 700,
                        Show: 800,
                        Sport: 900,
                        Store: 1000,
                        Vehicle: 1100,
                        Other: 9999999
                    };
                    this.likesProps = [];
                    this.isEditLikes = true;
                    this.likeIndex = 0;
                    this.areLikesEmpty = false;
                    this.areDislikesEmpty = false;
                    this.isAddLike = true;
                    var instanceId = this._routeParams.get('instanceId');
                    if (!instanceId) {
                        alert("No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e");
                    }
                    for (var prop in this.LikeCategory) {
                        var icon = '';
                        switch (prop) {
                            case 'Food':
                                icon = 'fa-cutlery';
                                break;
                            case 'Music':
                                icon = 'fa-music';
                                break;
                            case 'Store':
                                icon = 'fa-shopping-cart';
                                break;
                            case 'Vehicles':
                                icon = 'fa-car';
                                break;
                            case 'Book':
                                icon = 'fa-book';
                                break;
                            case 'Beverage':
                                icon = 'fa-glass';
                                break;
                            case 'Movie':
                                icon = 'fa-film';
                                break;
                            case 'Show':
                                icon = 'fa-television';
                                break;
                            case 'Sport':
                                icon = 'fa-futbol-o';
                                break;
                            case 'Game':
                                icon = 'fa-gamepad';
                                break;
                            case 'Hobby':
                                icon = 'fa-list';
                                break;
                            case 'Other':
                                icon = 'fa-hashtag';
                                break;
                        }
                        this.likesProps.push({ prop: prop, icon: icon });
                    }
                    var self = this;
                    _serverAPI.getPersonByInstanceId(instanceId).subscribe(function (p) {
                        self.selectedDude = p;
                        var l = {
                            Beverage: [],
                            Book: [],
                            Food: [],
                            Game: [],
                            Hobby: [],
                            Movie: [],
                            Music: [],
                            Show: [],
                            Sport: [],
                            Store: [],
                            Vehicle: [],
                            Other: []
                        };
                        for (var i = 0; i < p.likes.length; i++) {
                            switch (p.likes[i].category) {
                                case 100:
                                    l.Beverage.push(p.likes[i]);
                                    break;
                                case 200:
                                    l.Book.push(p.likes[i]);
                                    break;
                                case 300:
                                    l.Food.push(p.likes[i]);
                                    break;
                                case 400:
                                    l.Game.push(p.likes[i]);
                                    break;
                                case 500:
                                    l.Hobby.push(p.likes[i]);
                                    break;
                                case 600:
                                    l.Movie.push(p.likes[i]);
                                    break;
                                case 700:
                                    l.Music.push(p.likes[i]);
                                    break;
                                case 800:
                                    l.Show.push(p.likes[i]);
                                    break;
                                case 900:
                                    l.Sport.push(p.likes[i]);
                                    break;
                                case 1000:
                                    l.Store.push(p.likes[i]);
                                    break;
                                case 1100:
                                    l.Vehicle.push(p.likes[i]);
                                    break;
                                case 9999999:
                                    l.Other.push(p.likes[i]);
                            }
                        }
                        self.likesData = l;
                        var dl = {
                            Beverage: [],
                            Book: [],
                            Food: [],
                            Game: [],
                            Hobby: [],
                            Movie: [],
                            Music: [],
                            Show: [],
                            Sport: [],
                            Store: [],
                            Vehicle: [],
                            Other: []
                        };
                        for (var i = 0; i < p.dislikes.length; i++) {
                            switch (p.dislikes[i].category) {
                                case 100:
                                    dl.Beverage.push(p.dislikes[i]);
                                    break;
                                case 200:
                                    dl.Book.push(p.dislikes[i]);
                                    break;
                                case 300:
                                    dl.Food.push(p.dislikes[i]);
                                    break;
                                case 400:
                                    dl.Game.push(p.dislikes[i]);
                                    break;
                                case 500:
                                    dl.Hobby.push(p.dislikes[i]);
                                    break;
                                case 600:
                                    dl.Movie.push(p.dislikes[i]);
                                    break;
                                case 700:
                                    dl.Music.push(p.dislikes[i]);
                                    break;
                                case 800:
                                    dl.Show.push(p.dislikes[i]);
                                    break;
                                case 900:
                                    dl.Sport.push(p.dislikes[i]);
                                    break;
                                case 1000:
                                    dl.Store.push(p.dislikes[i]);
                                    break;
                                case 1100:
                                    dl.Vehicle.push(p.dislikes[i]);
                                    break;
                                case 9999999:
                                    dl.Other.push(p.dislikes[i]);
                            }
                        }
                        self.dislikesData = dl;
                        console.log(self.likesData);
                        console.log(self.dislikesData);
                        self.addTypeLike = _this.likesProps[0].prop;
                    }, function (error) { return alert("Server error. Try again later"); });
                }
                /**
                 * Edit one Like or Dislike text
                 * @param event
                 * @param editTypeOfLike
                 * @param isEditLikesParam
                 * @param i
                 */
                Likes.prototype.editLikes = function (event, editTypeOfLike, isEditLikesParam, i) {
                    event.preventDefault();
                    this.likeIndex = i;
                    this.isEditLikes = isEditLikesParam;
                    this.editTypeOfLike = editTypeOfLike;
                    setTimeout(function () {
                        $('#editLikes').modal('show');
                    }, 50);
                };
                /**
                 * Update Like/Dislike
                 * @param event
                 * @param newValue
                 */
                Likes.prototype.updateLike = function (event, newValue) {
                    event.preventDefault();
                    if (this.isEditLikes) {
                        this.likesData[this.editTypeOfLike][this.likeIndex].value = newValue;
                        this._likeSvc.updateLike(this.likesData[this.editTypeOfLike][this.likeIndex].instanceId, {
                            Status: 1,
                            Category: this.LikeCategory[this.addTypeLike],
                            Value: newValue
                        }).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editLikes').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        this.dislikesData[this.editTypeOfLike][this.likeIndex].value = newValue;
                        this._likeSvc.updateLike(this.dislikesData[this.editTypeOfLike][this.likeIndex].instanceId, {
                            Status: 0,
                            Category: this.LikeCategory[this.addTypeLike],
                            Value: newValue
                        }).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editLikes').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    $('#editLikes').modal('hide');
                };
                /**
                 * Close popup
                 * @param event
                 * @param txtLike
                 */
                Likes.prototype.closeLikeModal = function (event, txtLike) {
                    event.preventDefault();
                    if (this.isEditLikes) {
                        txtLike.value = this.likesData[this.editTypeOfLike][this.likeIndex];
                    }
                    else {
                        txtLike.value = this.dislikesData[this.editTypeOfLike][this.likeIndex];
                    }
                    $('#editLikes').modal('hide');
                };
                Likes.prototype.deleteLikes = function ($event, typeOfLike, isEditLikesParam, index) {
                    event.preventDefault();
                    if (isEditLikesParam) {
                        this._likeSvc.archiveLike(this.likesData[typeOfLike][index].instanceId).subscribe(function (r) { console.log(r); }, function (error) { return alert("Server error. Try again later"); });
                        this.likesData[typeOfLike].splice(index, 1);
                        this.checkLikesEmpty();
                    }
                    else {
                        this._likeSvc.archiveLike(this.dislikesData[typeOfLike][index].instanceId).subscribe(function (r) { console.log(r); }, function (error) { return alert("Server error. Try again later"); });
                        this.dislikesData[typeOfLike].splice(index, 1);
                        this.checkDislikesEmpty();
                    }
                };
                Likes.prototype.checkLikesEmpty = function () {
                    for (var prop in this.likesData) {
                        if (this.likesData[prop].length > 0) {
                            this.areLikesEmpty = false;
                            return false;
                        }
                    }
                    this.areLikesEmpty = true;
                };
                Likes.prototype.checkDislikesEmpty = function () {
                    for (var prop in this.dislikesData) {
                        if (this.dislikesData[prop].length > 0) {
                            this.areDislikesEmpty = false;
                            return false;
                        }
                    }
                    this.areDislikesEmpty = true;
                };
                Likes.prototype.addLike = function ($event, isLike) {
                    event.preventDefault();
                    this.isAddLike = isLike;
                    $('#addLikesModal').modal('show');
                };
                Likes.prototype.changeAddTypeLike = function (event, likeProp) {
                    event.preventDefault();
                    this.addTypeLike = likeProp;
                };
                Likes.prototype.closeAddLike = function (event, txtNewLike) {
                    event.preventDefault();
                    txtNewLike.value = '';
                    $('#addLikesModal').modal('hide');
                };
                /**
                 * Add new like/dislike item
                 * @param event
                 * @param txtNewLike
                 */
                Likes.prototype.saveNewLike = function (event, txtNewLike) {
                    event.preventDefault();
                    if (this.isAddLike) {
                        // Add Like
                        this.likesData[this.addTypeLike].push({
                            status: 1,
                            category: this.LikeCategory[this.addTypeLike],
                            value: txtNewLike.value
                        });
                        this._likeSvc.addLike(this.selectedDude.instanceId, {
                            Status: 1,
                            Category: this.LikeCategory[this.addTypeLike],
                            Value: txtNewLike.value
                        }).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#addLikesModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Add Dislike
                        this.dislikesData[this.addTypeLike].push({
                            status: 0,
                            category: this.LikeCategory[this.addTypeLike],
                            value: txtNewLike.value
                        });
                        this._likeSvc.addLike(this.selectedDude.instanceId, {
                            Status: 0,
                            Category: this.LikeCategory[this.addTypeLike],
                            Value: txtNewLike.value
                        }).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#addLikesModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    txtNewLike.value = '';
                };
                Likes.prototype.toggleLikeDislike = function (event) {
                    event.preventDefault();
                    this.isAddLike = !this.isAddLike;
                };
                Likes = __decorate([
                    core_1.Component({
                        selector: 'likes',
                        templateUrl: '../app/templates/likes.html',
                        directives: [SelectedPerson_directive_1.SelectedPersonDirective, common_1.FORM_DIRECTIVES, radio_value_accessor_1.RadioControlValueAccessor],
                        providers: [Like_service_1.LikeSvc]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object, Like_service_1.LikeSvc, router_1.RouteParams])
                ], Likes);
                return Likes;
            })();
            exports_1("Likes", Likes);
        }
    }
});
//# sourceMappingURL=Likes.component.js.map
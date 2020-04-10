(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <!-- <ion-buttons slot=\"start\" >\n        <img src=\"assets/img/companylogo.png\" alt=\"your image\" style=\"width:25px;height:25px;\">\n      </ion-buttons> -->\n      <ion-title slot=\"start\" class=\"titleheader\"><h1> {{CompanyInfo.Name}} </h1></ion-title>\n      <ion-buttons slot=\"end\">\n        <ion-icon slot=\"end\"  name=\"person\" (click)=\"ActionLogout()\"></ion-icon>\n        <div class=\"check-font\">\n          {{UserInfo.loginUserName}}\n        </div>\n        <ion-icon slot=\"end\" class=\"btn-logout\" name=\"power\" (click)=\"ActionLogout()\"></ion-icon>\n      </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n      <ion-item *ngIf=\"userAccess.quote != 0\">\n          <ion-col  (click)=\"ActionLoadModule('/home/quotelist')\">\n              <h2><img src=\"assets/img/Quote1.png\" alt=\"img\" class=\"imghw35\"> Quoting</h2>\n        </ion-col>\n      </ion-item>\n      <ion-item *ngIf=\"userAccess.calendar != 0\">\n        <ion-col  (click)=\"ActionLoadModule('/home/scheduling')\">\n            <h2><img src=\"assets/img/calendar-icon.png\" alt=\"img\" class=\"imghw35\"> Scheduling</h2></ion-col>\n      </ion-item>\n      <ion-item >\n          <ion-col>\n              <h2><img src=\"assets/img/Purchasing Icon5.jpg\" alt=\"img\" class=\"imghw35\">  Purchasing</h2></ion-col>\n      </ion-item>\n        <ion-item >\n            <ion-col>\n                <h2><img src=\"assets/img/Inventory34.png\" alt=\"img\" class=\"imghw35\"> Inventory</h2></ion-col>\n      </ion-item>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");







var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    },
                    {
                        path: 'quotelist',
                        // component:QuotePage
                        loadChildren: function () { return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../pages/quotes/quote/quote.module */ "./src/app/pages/quotes/quote/quote.module.ts")).then(function (m) { return m.QuotePageModule; }); }
                    },
                    {
                        path: 'scheduling',
                        loadChildren: function () { return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../pages/project/scheduling/scheduling.module */ "./src/app/pages/project/scheduling/scheduling.module.ts")).then(function (m) { return m.SchedulingPageModule; }); }
                    },
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"],]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn-logout {\n  background: red;\n  color: white;\n  border-radius: 100%;\n  font-size: 30px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9DOlxcVmVyc2lvbjQoTW9iaWxlKS9zcmNcXGFwcFxcaG9tZVxcaG9tZS5wYWdlLnNjc3MiLCJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxlQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uYnRuLWxvZ291dHtcbiAgICBiYWNrZ3JvdW5kOiByZWQ7IFxuICAgIGNvbG9yOiB3aGl0ZTsgXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICBmb250LXNpemU6MzBweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbn0iLCIuYnRuLWxvZ291dCB7XG4gIGJhY2tncm91bmQ6IHJlZDtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICBmb250LXNpemU6IDMwcHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, loadingController, authservise, storage) {
        this.navCtrl = navCtrl;
        this.loadingController = loadingController;
        this.authservise = authservise;
        this.storage = storage;
        this.CompanyInfo = { ID: 0, Name: "" };
        this.UserInfo = { logInUserID: 0, loginUserName: "" };
        this.userAccess = { quote: 1, calendar: 1 };
    }
    HomePage.prototype.ngOnInit = function () {
        this.LoadCompanyAndUser();
    };
    HomePage.prototype.ActionLoadModule = function (path) {
        this.navCtrl.navigateRoot(path);
    };
    HomePage.prototype.ActionLogout = function () {
        this.navCtrl.navigateRoot('/login');
    };
    HomePage.prototype.LoadCompanyAndUser = function () {
        var _this = this;
        this.authservise.GetStoredLoginUser().then(function (result) {
            _this.UserInfo = result;
        });
        this.authservise.GetStoredCompany().then(function (result) {
            _this.CompanyInfo = result;
        });
        this.authservise.GetStoredUserModuleAccess().then(function (result) {
            _this.userAccess = result;
        });
    };
    HomePage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: src_app_service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] }
    ]; };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            src_app_service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module-es5.js.map
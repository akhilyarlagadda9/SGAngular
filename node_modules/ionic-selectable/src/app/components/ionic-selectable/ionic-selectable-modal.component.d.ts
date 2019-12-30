import { AfterViewInit, ElementRef } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonSearchbar, NavParams } from '@ionic/angular';
import { IonicSelectableComponent } from './ionic-selectable.component';
export declare class IonicSelectableModalComponent implements AfterViewInit {
    private navParams;
    _element: ElementRef;
    _content: IonContent;
    _header: HTMLElement;
    selectComponent: IonicSelectableComponent;
    _searchbarComponent: IonSearchbar;
    _infiniteScroll: IonInfiniteScroll;
    _cssClass: boolean;
    readonly _canClearCssClass: boolean;
    readonly _isMultipleCssClass: boolean;
    readonly _isSearchingCssClass: boolean;
    readonly _isIos: boolean;
    _isMD(): boolean;
    readonly _isAddItemTemplateVisibleCssClass: boolean;
    onResize(): void;
    constructor(navParams: NavParams, _element: ElementRef);
    ngAfterViewInit(): void;
}

import {
    AfterViewInit,
    Component,
    ComponentRef,
    ElementRef,
    Injector,
    OnInit,
    QueryList,
    Type,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service';
import { CustomInjector, SidepaneData } from './dynamic-modules/custom-injector';
import { MessageComponent } from './dynamic-modules/message/message.component';
import { SidepaneRef } from './dynamic-modules/sidepane-ref';
import { SidepaneComponent } from './dynamic-modules/sidepane/sidepane.component';
import { SidepaneService, SidepaneStates } from './sidepane.service';
import { moveAnim } from './dynamic-modules/animations/sidepane-animation';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { RoutingStateService } from './routing-state.service';

export function* sum() {
    let num = 1;
    while (true) {
        yield num;
        num = num + 1;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [SidepaneService],
    animations: [moveAnim],
})
export class AppComponent implements OnInit, AfterViewInit {
    private unsubscribe$ = new Subject();
    sidepaneInstance;
    sidepaneState;
    sidepaneEvent: SidepaneStates = {add: false, remove: false};

    sidepaneIndex;

    sidepanePosition;
    stateResult;

    width: 300;
    componentRef: ComponentRef<any>;

    @ViewChild('testOutlet', {read: ViewContainerRef}) testOutlet: ViewContainerRef;

    @ViewChild('inputComponent')
    inputComponent;

    @ViewChild('testOutlet', {read: ElementRef}) elementRef: ElementRef;

    gen = sum();

    constructor(
        private dynamicComponentLoader: DynamicComponentLoader,
        private sidepaneService: SidepaneService,
        private injector: Injector,
        private router: Router,
        private location: Location,
        private activatedRoute: ActivatedRoute,
        private routingStateService: RoutingStateService,
    ) {
    }

    ngOnInit() {
        console.log('first');
        this.sidepaneState = 'hidden';
        this.stateLogic();
        // console.log(this.router);
        // console.log(this.activatedRoute);
        // console.log(this.location.path());
        this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
        console.log(this.sidepaneIndex);
        this.routingStateService.addRoute();
        // this.routingStateService.loadRouting();
        // console.log(this.routingStateService.history);
        // console.log(this.sidepaneIndex);

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                console.log(event);
                console.log(this.activatedRoute);
                console.log(this.router);
                console.log(event.url);
                console.log(this.routingStateService.history);
            }
        });
        this.sidepaneService.storeObserve.pipe(
            takeUntil(this.unsubscribe$),
            delay(0))
            .subscribe(item => {
                // this.stateLogic();
                console.log('Change');
                console.log(item);
                this.sidepanePosition = item.widthState[this.sidepaneIndex];
                console.log(this.sidepanePosition);
                this.sidepaneEvent = {...item.state};
                this.stateLogic();
            });
    }

    switchState() {
        console.log(this.sidepanePosition);
        console.log(this.sidepaneService.sidepanesWidthState);
        this.stateResult = {value: 'move', params: {pos: 500, col: 'red'}};
    }

    stateLogic() {
        console.log(this.sidepaneEvent);
        // console.log(!this.sidepaneEvent.remove && !this.sidepaneEvent.add);
        console.log(this.sidepanePosition);
        console.log(this.sidepaneEvent.add && !this.sidepaneEvent.move);
        this.stateResult = !this.sidepaneEvent.remove && !this.sidepaneEvent.add ?
            {value: 'hidden', params: {pos: -1000, col: 'red'}} :
            (this.sidepaneEvent.add && !this.sidepaneEvent.move ?
                {value: 'in', params: {pos: this.sidepanePosition, col: 'blue'}} :
                {value: 'move', params: {pos: this.sidepanePosition}});
        this.sidepaneState = 'in';
        console.log(this.stateResult);

    }

    ngAfterViewInit() {
    }

    showSidepane() {
        // const sidepaneWidth = this.width;

        /*this.sidepaneIndex = this.sidepaneService.store.length;
        const res = this.sidepaneService.addSidepanesWidthOb(500, this.sidepaneIndex);
        this.sidepanePosition = res.widthState[this.sidepaneIndex];
        this.sidepaneEvent = {...res.state};
        this.sidepaneService.parent = this;
        this.stateLogic();*/
        this.router.navigate(['1']);

    }

    onActivate(componentRef, outlet) {
        console.log(outlet);
        console.log(componentRef);
        // const sidepaneWidth = this.width;
        // this.sidepaneIndex = this.sidepaneService.store.length;
        // const res = this.sidepaneService.addSidepanesWidthOb(sidepaneWidth, this.sidepaneIndex);
        // this.sidepanePosition = res.widthState[this.sidepaneIndex];
        // console.log(res);
        // console.log(this.sidepanePosition);
        // this.sidepaneEvent = res.state.add;
        // console.log(this.sidepaneEvent);


    }

    loadCustom() {

        const config = {
            data: {
                content: this.gen.next().value,
                open: true,
                dynamicComponents: {
                    childComponent: MessageComponent,
                },
            },
        };
        const map = new WeakMap();
        map.set(SidepaneData, config);
        const sidepaneRef = new SidepaneRef();
        map.set(SidepaneRef, sidepaneRef);
        this.sidepaneService.loadComponent(SidepaneComponent, 'sidepane', this.testOutlet, map);
    }
}

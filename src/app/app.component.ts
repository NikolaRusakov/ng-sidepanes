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
import { SidepaneObject, SidepaneService, SidepaneStates } from './sidepane.service';
import { moveAnim } from './dynamic-modules/animations/sidepane-animation';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { RoutingStateService } from './routing-state.service';
import { timer } from 'rxjs/internal/observable/timer';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { AnimationCanDeactivateGuard } from './AnimationCanDeactivateGuard';

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
export class AppComponent implements OnInit, AfterViewInit, AnimationCanDeactivateGuard {
    private unsubscribe$ = new Subject();
    sidepaneInstance;
    sidepaneState = 'hidden';

    sidepaneIndex;

    sidepanePosition = -1000;
    stateResult = {value: 'hidden', params: {pos: -400}};

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
        this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
        console.log(this.sidepaneIndex);
        this.sidepaneService.storeObserve.pipe(
            takeUntil(this.unsubscribe$),
            delay(0))
            .subscribe(item => {
                console.log(item);
                console.log(this.sidepaneIndex);
                console.log(this.sidepanePosition);
                this.sidepanePosition = this.sidepaneService.getWidthState(this.sidepanePosition, this.sidepaneIndex);
                const remove = item.state.remove && item.state.removeIndex === this.sidepaneIndex;
                this.stateLogic(item, remove);
            });
    }

    ngAfterViewInit() {
    }

    switchState() {
        console.log(this.sidepanePosition);
        console.log(this.sidepaneService.sidepanesWidthState);
        this.stateResult = {value: 'move', params: {pos: 500}};
    }

    stateLogic(states: SidepaneObject, remove) {
        if (remove && states.state.remove) {
            console.log('removing');

            this.stateResult = (this.stateResult.value === 'move' ?
                    {value: 'moveAgain', params: {pos: -1000}} :
                    {value: 'move', params: {pos: -1000}}
            );
            // this.router.navigate(['', '1']);
            // setTimeout(() => {
            //     this.router.navigate(['']);
            // }, 1000);
        } else {
            this.stateResult = !states.state.remove && !states.state.add ||
            this.sidepaneState === 'hidden' ?
                {value: 'hidden', params: {pos: -1000}} :
                (this.stateResult.value === 'move' ?
                        {value: 'moveAgain', params: {pos: this.sidepanePosition}} :
                        {value: 'move', params: {pos: this.sidepanePosition}}
                );
        }
        this.sidepaneState = 'in';
    }

    showSidepane() {
        this.router.navigate(['1']);

    }

    onActivate(componentRef, outlet) {
        console.log(outlet);
        console.log(componentRef);
    }

    canDeactivate(navigate) {
        /*this.stateResult = (this.stateResult.value === 'move' ?
            {value: 'moveAgain', params: {pos: -1000}} :
            {value: 'move', params: {pos: -1000}});*/
        console.log(this.stateResult);
        this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
        return timer(500).pipe(mapTo(true)).toPromise();
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

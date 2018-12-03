import { animate, state, style, transition, trigger } from '@angular/animations';
import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { FactoryService } from '../../factory.service';
import { SidepaneData } from '../custom-injector';

@Component({
    selector: 'app-sidepane',
    templateUrl: './sidepane.component.html',
    styleUrls: ['./sidepane.scss'],
    providers: [
    ],
    animations: [
        trigger('transition', [
            state('in', style({width: '100%'})),
            transition('void => *', [
                style({width: '0%'}),
                animate(500)
            ]),
            transition('* => void', [
                animate(2500, style({width: '100%'})),
            ]),
        ]),
        // trigger('openClose', [
        //     // ...
        //     state('open', style({
        //         height: '100%',
        //         backgroundColor: 'green'
        //     })),
        //     state('closed', style({
        //         width: '0%',
        //     })),
        //     transition('open', [
        //         animate('1s'),
        //     ]),
        //     transition('open => closed', [
        //         animate('1s'),
        //     ]),
        //     transition('closed => open', [
        //         animate('0.5s'),
        //     ]),
        // ]),
    ],
})
export class SidepaneComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    private unsubscribe$ = new Subject();
    transition;

    private sidepanePosition: number;
    private sidepaneIndex: number;

    @Input()
    cmpRef?: ComponentRef<SidepaneComponent>;

    @ViewChild('inputComponent')
    container?: ElementRef;

    @ViewChild('childComponent', {read: ViewContainerRef})
    childComponent: ViewContainerRef;

    childComponentRef;
    @Output()
    submitted = new EventEmitter();

    constructor(
        public config: SidepaneData,
        private factoryService: FactoryService,
        public elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnChanges() {
    }

    ngOnInit() {
        this.loadAndInitialize(this.config.data.dynamicComponents);

        this.factoryService.storeObserve.pipe(takeUntil(this.unsubscribe$))
            .subscribe(item => {
                console.log(item.widthState[this.sidepaneIndex]);
                const checkInitialPos = this.sidepanePosition !== undefined;
                const checkPos = item.remove &&
                    !item.remove.removeLast &&
                    this.sidepaneIndex >= item.remove.index &&
                    this.sidepaneIndex !== 0;
                this.sidepaneIndex = (checkInitialPos && checkPos) ?
                    (this.sidepaneIndex - 1) : this.sidepaneIndex;

                this.sidepanePosition = item.widthState[this.sidepaneIndex];
            });
    }

    ngAfterViewInit() {
        const sidepaneWidth = this.elementRef.nativeElement.children[0].offsetWidth;
        this.factoryService.addSidepanesWidthOb(sidepaneWidth);
    }

    loadAndInitialize(dynamicComponents) {
        Object.entries(dynamicComponents).forEach(([key, value]) => {
            this.loadChildComponent(value);
        });
        this.sidepaneIndex = this.factoryService.store.length;
        this.factoryService.addSidepane(this);

    }

    loadChildComponent(componentType: any) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.childComponent.clear();
        this.childComponentRef = this.childComponent.createComponent(componentFactory);
    }

    onClose() {
        if (this.cmpRef) {
            this.unsubscribe$.next();
            this.cmpRef.destroy();
        }
    }

    onSubmit() {

    }

    ngOnDestroy() {
        this.factoryService.removeSidepaneInstances(this.sidepaneIndex);
    }
}

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SidepaneData } from '../custom-injector';
import { FactoryService } from '../../factory.service';
import { SidepaneService } from '../../sidepane.service';

@Component({
    selector: 'app-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.scss'],
    providers: [SidepaneService]
})
export class CustomComponent implements OnInit, AfterViewInit {

    @ViewChild('inputComponent')
    container?: ElementRef;

    constructor(
        public config: SidepaneData,
        private factoryService: FactoryService,
        public sidepaneService: SidepaneService,
        public elementRef: ElementRef
    ) {
    }

    ngAfterViewInit() {
        // this.factoryService.store = [
        //     ...this.factoryService.store, {
        //         ...currentSidepane,
        //         width: this.elementRef.nativeElement.children[0].offsetWidth
        //     }
        //
        // ];
        const sidepaneWidth = this.elementRef.nativeElement.children[0].offsetWidth;
        this.sidepaneService.width = sidepaneWidth;
        this.factoryService.calculateWidthState(sidepaneWidth);
        this.factoryService.addSidepanesWidth(sidepaneWidth);
        // this.factoryService.addSidepane();
    }

    ngOnInit() {
        this.factoryService.addSidepane(this);
        console.log(this);
        if (this.factoryService.store.length > 0) {
            console.log(this.factoryService.store[this.factoryService.store.length - 1]);
            console.log(this.factoryService.store);
            // console.log(this.factoryService.store[this.factoryService.store.length - 1].nativeElement.childNodes.item(0));
            // console.log(this.factoryService.store[this.factoryService.store.length - 1].nativeElement.childNodes.item(0).offsetWidth);
            // this.elementRef.nativeElement.
        }
    }
}

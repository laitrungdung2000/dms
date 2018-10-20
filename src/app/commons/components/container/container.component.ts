import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
    @Input()
    toggleLeft: boolean = false;
    @Input()
    toggleRight: boolean = false;

    public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
    constructor() { }

    toggleSideLeft(){
        console.log('toggle left');
        this.toggleLeft = !this.toggleLeft;
    }
    toggleSideRight(){
        console.log('toggle right');
        this.toggleRight = !this.toggleRight;
    }
    
    ngOnInit() {
    }

}

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-asa-dropdown',
    templateUrl: './asa-dropdown.component.html',
    styleUrls: ['./asa-dropdown.component.css']
})
export class AsaDropdownComponent implements OnInit{
    @Input() data: any = [];
    @Input() invalid = true;
    @Input() value = '';
    @Output() valueChange = new EventEmitter();
    @Input() selectedItem;
    isTouch = false;

    selectedName  = '';
    public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
    constructor() { }
    select(item, index){
        this.selectedItem = item;
        this.isTouch = true;
        this.selectedName = item.name;
        this.value = item.key;
        this.valueChange.emit(this.value);
    }
    ngOnInit() {
        console.log(this.selectedItem);
    }

}

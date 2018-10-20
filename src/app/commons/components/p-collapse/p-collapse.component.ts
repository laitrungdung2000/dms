import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-p-collapse',
    templateUrl: './p-collapse.component.html',
    styleUrls: ['./p-collapse.component.css']
})
export class PCollapseComponent implements OnInit {
    @Input("icon")
    icon: string = 'icons8-folder';
    @Input("icon-close")
    icon_close: string = 'icons8-collapse-arrow';
    @Input("icon-open")
    icon_open: string = 'icons8-expand-arrow';
    @Input("title")
    title: string;
    @Input("opened")
    opened: Boolean = false;
    toggle() {
        this.opened = !this.opened;
    }

    constructor() { }

    ngOnInit() {
    }

}

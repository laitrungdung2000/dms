import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit
} from "@angular/core";
import { Router } from "@angular/router";

import { TabComponent } from "../../../commons/components/tab/tab.component";
import { UtilService } from "../../../commons/services/util.service";
import { Constant } from "../../../.././js-global/constant";
import { TabObject } from "../../../objects/tabObject";
@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.css"],
    providers: [Constant]
})
export class TabsComponent implements AfterContentInit {
    constructor(
        private utilService: UtilService,
        private constant: Constant,
        private router: Router
    ) { }

    @ContentChildren(TabComponent)
    tabs: QueryList<TabComponent>;

    ngAfterContentInit() {
        const that = this;

        let activeTabs = that.tabs.filter(tab => tab.active);

        if (activeTabs.length === 0) {
            that.selectTab(that.tabs.first);
        }

        that.tabs.changes.subscribe(list => {
            if (list.length >= 3) {
                that.router.navigate([that.tabs.last.path, that.tabs.last.id]);
            } else {
                that.router.navigate([that.tabs.last.path]);
            }
            that.selectTab(that.tabs.last);
        });
    }

    selectTab(tab: TabComponent) {
        this.tabs.toArray().forEach(tab => (tab.active = false));
        tab.active = true;
    }

    removeTab(tab: TabObject) {
        this.utilService.removeTab(tab);
    }

    addTab() {
        let path = this.router.url;
        let tab: TabObject = new TabObject();
        let type: string;

        if (path.includes(this.constant.path_object.home)) {
            type = this.constant.type_object.template;
            tab.path = path + "/" + this.constant.path_object.templates;
        } else {
            if (path.includes(this.constant.path_object.inputs)) {
                type = this.constant.type_object.input;
            } else if (path.includes(this.constant.path_object.outputs)) {
                type = this.constant.type_object.output;
            } else if (path.includes(this.constant.path_object.actions)) {
                type = this.constant.type_object.action;
            } else if (path.includes(this.constant.path_object.states)) {
                type = this.constant.type_object.state;
            } else if (path.includes(this.constant.path_object.visuals)) {
                type = this.constant.type_object.visual;
            }
            tab.path = path;
        }
        
        console.log("PPPPPP path = " + path);
        
        tab.type = type;
        tab.title = type;
        tab.id = "-1";
        tab.icon = "";
        this.utilService.addTab(tab);
    }
}

import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";

import { TabComponent } from "../../../../commons/components/tab/tab.component";
import { UtilService } from "../../../../commons/services/util.service";
import { Constant } from "../../../../../js-global/constant";

@Component({
  selector: "app-sub-tabs",
  templateUrl: "./sub-tabs.component.html",
  styleUrls: ["./sub-tabs.component.css"]
})
export class SubTabsComponent implements AfterContentInit {
  @Output()
  selectTabEvent = new EventEmitter<number>();
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  constructor(private utilService: UtilService, private router: Router, private constant: Constant) {}

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.selectTabEvent.emit(tab.idx);
    tab.active = true;
    this.router.navigate([this.constant.path_object.setting, tab.path]);
  }
}

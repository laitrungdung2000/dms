import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { UtilService } from "../../commons/services/util.service";
import { Constant } from "../../.././js-global/constant";
import { TabObject } from "../../objects/tabObject";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [Constant]
})
export class HeaderComponent implements OnInit {
  @Input()
  tabList: any = [
    {
      type: "home",
      icon: "fa fa-home",
      title: "",
      path: "home",
      idx: 0
    },
    {
      type: "setting",
      icon: "icon icons8-settings-3",
      title: "",
      path: "setting",
      idx: 1
    }
  ];

  constructor(
    private utilService: UtilService,
    private constant: Constant,
    private router: Router
  ) {}

  ngOnInit() {
    const that = this;

    that.utilService.addTabEvent.subscribe(function(tab: TabObject) {
      if (tab.type !== undefined) {
        tab.idx = that.tabList.length;
        that.tabList.push(tab);
      }
    });

    that.utilService.removeTabEvent.subscribe(function(tab: TabObject) {
      if (that.tabList.length > 2) {
        that.tabList = that.tabList.filter(function(item) {
          return +item.idx !== +tab.idx;
        });
      }
    });

    that.utilService.removeTabIdEvent.subscribe(function(object: any) {
      if (that.tabList.length > 2) {
        that.tabList = that.tabList.filter(function(item) {
            console.log("item = " + JSON.stringify(item));
            return item.id !== object.id || item.type !== object.type;
        })
      }
    });
  }
}

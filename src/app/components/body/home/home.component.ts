import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { UtilService } from "../../../commons/services/util.service";
import { Constant } from "../../../.././js-global/constant";
import { TabObject } from "../../../objects/tabObject";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [Constant]
})
export class HomeComponent implements OnInit {
  @Input()
  toggleFilterBar: boolean = false;

  constructor(
    private utilService: UtilService,
    private constant: Constant,
    private router: Router
  ) {}

  ngOnInit() {}

  openTemplateTab(id: string) {
    let path = this.router.url;
    let tab: TabObject = new TabObject();
    let type: string;

    if (path.includes(this.constant.path_object.home)) {
      type = this.constant.type_object.template;
      tab.path = path + "/" + this.constant.path_object.templates;
      tab.type = type;
      tab.title = type;
      tab.icon = "";
  
      if(id === '-1') {
          tab.id = id;
      } else {
          tab.id = this.utilService.getSelectTemplateId();
          if(tab.id === '-1') { return; }
      }
      this.utilService.addTab(tab);
    }
  }
}

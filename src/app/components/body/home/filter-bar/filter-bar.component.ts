import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UtilService } from "../../../../commons/services/util.service";

@Component({
  selector: "app-filter-bar",
  templateUrl: "./filter-bar.component.html",
  styleUrls: ["./filter-bar.component.css"]
})
export class FilterBarComponent implements OnInit {

  @Input()
  isExpand: boolean = false;

  @Input()
  templateName: string;

  constructor(private utilService: UtilService) {}

  ngOnInit() {}

  onChange(event) {
    this.utilService.filterTemplate(this.templateName);
  }
}

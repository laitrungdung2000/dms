import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"]
})
export class TabComponent {
  @Input("tabIcon")
  icon: string;
  @Input("tabPath")
  path: string;
  @Input("tabTitle")
  title: string;
  @Input("tabId")
  id: number;
  @Input()
  active = false;
  @Input("tabIdx")
  idx: number;
}

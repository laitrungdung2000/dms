import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  QueryList
} from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { DataTableDirective } from "angular-datatables";
import { Router } from "@angular/router";

import { SubTabsComponent } from "./sub-tabs/sub-tabs.component";
import { TabComponent } from "../../../commons/components/tab/tab.component";
import { APIService } from "../../../commons/services/api.service";
import { Constant } from "../../../../js-global/constant";
import { TabObject } from "../../../objects/tabObject";
import { UtilService } from "../../../commons/services/util.service";

class Template {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  inputs: any = [];
  outputs: any = [];
  actions: any = [];
  states: any = [];
  visuals: any = [];

  activeTabIdx: number = 0;

  private selectInputId = this.utilService.getSelectInputId();
  private selectOutputId = this.utilService.getSelectOutputId();
  private selectActionId = this.utilService.getSelectActionId();
  private selectStateId = this.utilService.getSelectStateId();
  private selectVisualId = this.utilService.getSelectVisualId();

  constructor(
    private http: HttpClient,
    private apiService: APIService,
    private router: Router,
    private constant: Constant,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    const that = this;

    that.dtOptions[0] = that.buildDtOption();
    that.dtOptions[1] = that.buildDtOption();
    that.dtOptions[2] = that.buildDtOption();
    that.dtOptions[3] = that.buildDtOption();
    that.dtOptions[4] = that.buildDtOption();

    that.dtOptions[0].ajax = (dataTableParameters: any, callback) => {
      that.apiService.getInputs().subscribe(function(data) {
        that.inputs = data;
        that.utilService.setDataInputs(data);
      });
    };
    that.dtOptions[1].ajax = (dataTableParameters: any, callback) => {
      that.apiService.getOutputs().subscribe(function(data) {
        that.outputs = data;
        that.utilService.setDataOutputs(data);
      });
    };
    that.dtOptions[2].ajax = (dataTableParameters: any, callback) => {
      that.apiService.getActions().subscribe(function(data) {
        that.actions = data;
        that.utilService.setDataActions(data);
      });
    };
    that.dtOptions[3].ajax = (dataTableParameters: any, callback) => {
      that.apiService.getStates().subscribe(function(data) {
        that.states = data;
        that.utilService.setDataStates(data);
      });
    };
    that.dtOptions[4].ajax = (dataTableParameters: any, callback) => {
      that.apiService.getVisuals().subscribe(function(data) {
        that.visuals = data;
        that.utilService.setDataVisuals(data);
      });
    };
    that.dtOptions[0].columns = [
      { data: "id" },
      { data: "name" },
      { data: "configName" }
    ];
    that.dtOptions[1].columns = [
      { data: "id" },
      { data: "name" },
      { data: "configName" }
    ];
    that.dtOptions[2].columns = [
      { data: "id" },
      { data: "actionName" },
      { data: "configName" }
    ];
    that.dtOptions[3].columns = [
      { data: "id" },
      { data: "configName" },
      { data: "stateName" }
    ];
    that.dtOptions[4].columns = [
      { data: "id" },
      { data: "configName" },
      { data: "" }
    ];
  }

  private buildDtOption(): DataTables.Settings {
    return {
      dom: "t",
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: true
    };
  }

  updateActiveTabIdx(idx) {
    this.activeTabIdx = +idx;
  }

  openObjectTab(id: string) {
    let tab: TabObject = new TabObject();
    var path = this.router.url;
    var type: string;

    if (path.includes(this.constant.path_object.inputs)) {
      type = this.constant.type_object.input;
      tab.id = id === "-1" ? id : this.utilService.getSelectInputId();
    } else if (path.includes(this.constant.path_object.outputs)) {
      type = this.constant.type_object.output;
      tab.id = id === "-1" ? id : this.utilService.getSelectOutputId();
    } else if (path.includes(this.constant.path_object.actions)) {
      type = this.constant.type_object.action;
      tab.id = id === "-1" ? id : this.utilService.getSelectActionId();
    } else if (path.includes(this.constant.path_object.states)) {
      type = this.constant.type_object.state;
      tab.id = id === "-1" ? id : this.utilService.getSelectStateId();
    } else if (path.includes(this.constant.path_object.visuals)) {
      type = this.constant.type_object.visual;
      tab.id = id === "-1" ? id : this.utilService.getSelectVisualId();
    }

    if (tab.id === "-1" && id !== "-1") {
      return;
    }

    tab.path = path;
    tab.type = type;
    tab.title = type;
    tab.icon = "";

    this.utilService.addTab(tab);
  }

  handleClickEvent(typeObject, idx) {
    switch (typeObject) {
      case this.constant.type_object.input:
        this.selectInputId = this.inputs[idx].id;
        this.utilService.setSelectInputId(this.selectInputId);
        break;
      case this.constant.type_object.output:
        this.selectOutputId = this.outputs[idx].id;
        this.utilService.setSelectOutputId(this.selectOutputId);
        break;
      case this.constant.type_object.action:
        this.selectActionId = this.actions[idx].id;
        this.utilService.setSelectActionId(this.selectActionId);
        break;
      case this.constant.type_object.state:
        this.selectStateId = this.states[idx].id;
        this.utilService.setSelectStateId(this.selectStateId);
        break;
      case this.constant.type_object.visual:
        this.selectVisualId = this.visuals[idx].id;
        this.utilService.setSelectVisualId(this.selectVisualId);
        break;
    }
  }

  deleteItem() {
    const that = this;
    let path = that.router.url;
    let typeObject: string;
    let selectItemId: string;
    if (path.includes(that.constant.path_object.inputs)) {
      that.apiService
        .deleteInput({ id: that.selectInputId })
        .subscribe(function success(data) {
          console.log("delete input item success");
          that.inputs = that.inputs.filter(function(item) {
            return item.id !== that.selectInputId;
          });
        });
    } else if (path.includes(that.constant.path_object.outputs)) {
      that.apiService
        .deleteOutput({ id: that.selectOutputId })
        .subscribe(function success(data) {
          console.log("delete output item success");
          that.outputs = that.outputs.filter(function(item) {
            return item.id !== that.selectOutputId;
          });
        });
    } else if (path.includes(that.constant.path_object.actions)) {
      that.apiService
        .deleteAction({ id: that.selectActionId })
        .subscribe(function success(data) {
          console.log("delete action item success");
          that.actions = that.actions.filter(function(item) {
            return item.id !== that.selectActionId;
          });
        });
    } else if (path.includes(that.constant.path_object.states)) {
      that.apiService
        .deleteState({ id: that.selectStateId })
        .subscribe(function success(data) {
          console.log("delete state item success");
          that.states = that.states.filter(function(item) {
            return item.id !== that.selectStateId;
          });
        });
    } else if (path.includes(that.constant.path_object.visuals)) {
      that.apiService
        .deleteVisual({ id: that.selectVisualId })
        .subscribe(function success(data) {
          console.log(
            "delete visual item success, that.visuals = " +
              JSON.stringify(that.visuals)
          );
          that.visuals = that.visuals.filter(function(item) {
            return item.id !== that.selectVisualId;
          });
        });
    }
  }
}

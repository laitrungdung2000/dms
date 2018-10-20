import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { DataTableDirective } from "angular-datatables";

import { Constant } from "../../../../../js-global/constant";
import { UtilService } from "../../../../commons/services/util.service";
import { TabObject } from "../../../../objects/tabObject";

class Template {
  id: number;
  name: string;
  deviceType: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.css"],
  providers: [Constant]
})
export class DatatableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings;
  templates: any = [];
  templateName: string;
  selectTemplateId = this.utilService.getSelectTemplateId();

  constructor(
    private http: HttpClient,
    private constant: Constant,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    const that = this;

    that.utilService.currentFilter.subscribe(function (name) {
      that.templateName = name;
      if (that.dtElement.dtInstance !== undefined) {
        that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance
            .column(1)
            .search(that.templateName)
            .draw();
        });
      }
    });

    that.dtOptions = {
      dom: "t",
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .get<DataTablesResponse>(
            that.constant.base_url + "/template/",
            dataTablesParameters
          )
          .subscribe(resp => {
            that.templates = resp;
            console.log("AAAAAA templates = " + JSON.stringify(that.templates));
          });
      },
      columns: [{ data: "name" }, { data: "deviceType" }]
    };
  }

  handleClickEvent(template, idx) {
    this.selectTemplateId = this.templates[idx].id;
    this.utilService.setSelectTemplateId(this.selectTemplateId);
  }

  handleDbClickEvent(template) {
    console.log("GGGGGG template = " + JSON.stringify(template));
    let tab: TabObject = new TabObject();
    tab.path =
      this.constant.path_object.home +
      "/" +
      this.constant.path_object.templates;
    tab.type = this.constant.type_object.template;
    tab.title = tab.type;
    tab.icon = "";
    tab.id = template.id;
    console.log("LLLLLL tab.id " + tab.id);
    console.log("LLLLLL id from service = " + this.utilService.getSelectTemplateId());
    this.utilService.addTab(tab);
  }
}

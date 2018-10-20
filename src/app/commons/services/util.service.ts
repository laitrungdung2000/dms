import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { TabComponent } from "../components/tab/tab.component";
import { TabObject } from "../../objects/tabObject";
import { Constant } from "../../../js-global/constant";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  private selectTemplateId: string = "-1";
  private selectInputId: string = "-1";
  private selectOutputId: string = "-1";
  private selectActionId: string = "-1";
  private selectStateId: string = "-1";
  private selectVisualId: string = "-1";
  private dataInputs: any = [];
  private dataOutputs: any = [];
  private dataActions: any = [];
  private dataStates: any = [];
  private dataVisuals: any = [];

  private templateSource = new BehaviorSubject("");
  private addTabAction = new BehaviorSubject(new TabObject());
  private removeTabAction = new BehaviorSubject(new TabObject());
  private removeTabIdAction = new BehaviorSubject("");

  currentFilter = this.templateSource.asObservable();
  addTabEvent = this.addTabAction.asObservable();
  removeTabEvent = this.removeTabAction.asObservable();
  removeTabIdEvent = this.removeTabIdAction.asObservable();

  private scrollbarOptions = {
    axis: "y",
    theme: "minimal-dark"
  };

  constructor(private constant: Constant) {}

  /* -------------------- FUNCTIONS DETAIL -------------------- */
  getDataInputs() {
      return this.dataInputs;
  }
  setDataInputs(data: any) {
      this.dataInputs = data;
  }
  
  getDataOutputs() {
      return this.dataOutputs;
  }
  setDataOutputs(data: any) {
      this.dataOutputs = data;
  }

  getDataActions() {
      this.dataActions;
  }
  setDataActions(data: any) {
      this.dataActions = data;
  }

  getDataStates() {
      return this.dataStates;
  }
  setDataStates(data: any) {
      this.dataStates = data;
  }

  getDataVisuals() {
      return this.dataVisuals;
  }
  setDataVisuals(data: any) {
      this.dataVisuals = data;
  }

  getSelectTemplateId() {
      return this.selectTemplateId;
  }
  setSelectTemplateId(newId: string) {
      this.selectTemplateId = newId;
  }

  getSelectInputId() {
      return this.selectInputId;
  }
  setSelectInputId(newId: string) {
      this.selectInputId = newId;
  }

  getSelectOutputId() {
      return this.selectOutputId;
  }
  setSelectOutputId(newId: string) {
      this.selectOutputId = newId;
  }

  getSelectActionId() {
      return this.selectActionId;
  }
  setSelectActionId(newId: string) {
      this.selectActionId = newId;
  }

  getSelectStateId() {
      return this.selectStateId;
  }
  setSelectStateId(newId: string) {
      this.selectStateId = newId;
  }

  getSelectVisualId() {
      return this.selectVisualId;
  }
  setSelectVisualId(newId: string) {
      this.selectVisualId = newId;
  } 

  getScrollbarOptions() {
    return this.scrollbarOptions;
  }

  filterTemplate(templateName: string) {
    this.templateSource.next(templateName);
  }

  addTab(tab: TabObject) {
    this.addTabAction.next(tab);
  }

  removeTab(tab: TabObject) {
    this.removeTabAction.next(tab);
  }

  removeTabId(object: any) {
    this.removeTabIdAction.next(object);
  }
}

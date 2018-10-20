import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";

import { APIService } from "../../../../commons/services/api.service";
import { UtilService } from "../../../../commons/services/util.service";
import { Constant } from "../../../../../js-global/constant";

@Component({
  selector: "app-state",
  templateUrl: "./state.component.html",
  styleUrls: ["./state.component.css"]
})
export class StateComponent implements OnInit {
  form: FormGroup;
  visuals: any = [];
  valueUnits: any = [];
  valueTypes: any = [];
  visualSelected: any = { name: "", key: "" };
  visualUnitSelected: any = { name: "", key: "" };
  visualTypeSelected: any = { name: "", key: "" };
  color = "#000000";

  stateId = this.route.snapshot.paramMap.get("id");

  constructor(
    private apiService: APIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private constant: Constant
  ) {}
  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.apiService.createState(this.form.value).subscribe((data: any) => {
        console.log(data);
        this.closeTab();
      });
    } else {
      this.validateAllFormFields(this.form);
    }
  }
  ngOnInit() {
    if (this.stateId !== undefined) {
      this.apiService.getState(this.stateId).subscribe((data: any) => {
        this.form.patchValue(data);
      });
    }
    this.form = this.fb.group({
      configName: ["", Validators.required],
      stateName: ["", Validators.required],
      defaultState: [false, Validators.required],
      displayColor: ["", Validators.required],
      failureState: [false, Validators.required],
      stateCameraSwitch: [false, Validators.required],
      stateVisual: ["", Validators.required],
      stateValue: this.fb.group({
        value: ["", Validators.required],
        valueType: ["", Validators.required],
        valueUnit: ["", Validators.required]
      }),
      stateEventtList: [[]],
      stateAlarmList: [[]]
    });

    this.apiService.getVisuals().subscribe((data: any) => {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          this.visuals.push({ name: data[i].configName, key: data[i].id });
        }
        this.form.patchValue({
          stateVisual: data[0].id
        });
        this.visualSelected = this.visuals[0];
      }
    });
    this.apiService.getEnum("ValueType").subscribe((data: any[]) => {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          this.valueTypes.push({ name: data[i], key: data[i] });
        }
        this.form.controls["stateValue"].patchValue({
          valueType: data[0]
        });
        this.visualTypeSelected = this.valueTypes[0];
      }
    });
    this.apiService.getEnum("ValueUnit").subscribe((data: any[]) => {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          this.valueUnits.push({ name: data[i], key: data[i] });
        }
        this.form.controls["stateValue"].patchValue({
          valueUnit: data[0]
        });
        this.visualUnitSelected = this.valueUnits[0];
      }
    });
  }
  onChangeColorHex8(event) {
    console.log(event);
    this.form.patchValue({
      displayColor: event
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  get configName() {
    return this.form.get("configName");
  }
  get stateName() {
    return this.form.get("stateName");
  }
  get displayColor() {
    return this.form.get("displayColor");
  }
  get stateVisual() {
    return this.form.get("stateVisual");
  }
  get value() {
    return this.form.get("stateValue").get("value");
  }
  get valueType() {
    return this.form.get("stateValue").get("valueType");
  }
  get valueUnit() {
    return this.form.get("stateValue").get("valueUnit");
  }

  closeTab() {
    this.utilService.removeTabId({
      id: this.stateId,
      type: this.constant.type_object.state
    });
  }
}

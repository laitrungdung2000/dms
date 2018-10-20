import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../../commons/services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from "../../../../commons/services/util.service";
import { Constant } from "../../../../../js-global/constant";
@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.css"]
})
export class ActionComponent implements OnInit {
    form: FormGroup;
    valueUnits: any = [];
    valueTypes: any = [];
    visualUnitSelected: any = {name: '', key: ''};
    visualTypeSelected: any = {name: '', key: ''};
    actionId = this.route.snapshot.paramMap.get("id");
    constructor(
        private apiService: APIService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private utilService: UtilService,
        private constant: Constant
    ) { }
    onSubmit() {
        console.log('submit');
        console.log(this.form.value);
        if (this.form.valid) {
            this.apiService.createAction(this.form.value).subscribe((data: any) => {
                console.log(data);
                this.closeTab();
            })
        } else {
            this.validateAllFormFields(this.form);
        }
    }
    ngOnInit() {
        if (this.route.snapshot.paramMap.get('id') !== undefined){
            this.apiService.getAction(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
                this.form.patchValue(data);
            });
        }
        this.form = this.fb.group({
            id: [''],
            actionName: ['', Validators.required],
            configName: ['', Validators.required],
            // visual: [null],
            actionValue: this.fb.group({
                value: ['', Validators.required],
                valueType: ['', Validators.required],
                valueUnit: ['', Validators.required],
            }),
            actionEventList: [[]],
            actionAlarmList: [[]]
        });

    this.apiService.getEnum("ValueType").subscribe((data: any[]) => {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          this.valueTypes.push({ name: data[i], key: data[i] });
        }
        this.form.controls["actionValue"].patchValue({
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
        this.form.controls["actionValue"].patchValue({
          valueUnit: data[0]
        });
        this.visualUnitSelected = this.valueUnits[0];
      }
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
  get actionName() {
    return this.form.get("actionName");
  }
  get value() {
    return this.form.get("actionValue").get("value");
  }

  closeTab() {
    this.utilService.removeTabId({
      id: this.actionId,
      type: this.constant.type_object.action
    });
  }
}
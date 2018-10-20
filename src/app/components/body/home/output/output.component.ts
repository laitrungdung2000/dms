import { Component, OnInit } from "@angular/core";
import { APIService } from "../../../../commons/services/api.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilService } from "../../../../commons/services/util.service";
import { Constant } from "../../../../../js-global/constant";

@Component({
  selector: "app-output",
  templateUrl: "./output.component.html",
  styleUrls: ["./output.component.css"]
})
export class OutputComponent implements OnInit {
  form: FormGroup;
  ioTypes: any = [];
  actionList: any = [];
  actions: any = [];
  ioTypeSelected: any = { name: "", key: "" };

  outputId = this.route.snapshot.paramMap.get("id");

  constructor(
    private apiService: APIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private constant: Constant
  ) {}
  onSubmit() {
    if (this.form.valid) {
      this.apiService.createOutput(this.form.value).subscribe((data: any) => {
        console.log(data);
        this.closeTab();
      });
    } else {
      this.validateAllFormFields(this.form);
    }
  }
  drop() {
    let actionIds = [];
    this.actions.map(function(item) {
      actionIds.push(item.id);
    });
    console.log(actionIds);
    this.form.patchValue({
      actions: actionIds
    });
  }
  ngOnInit() {
    if (this.outputId !== undefined) {
      this.apiService.getOutput(this.outputId).subscribe((data: any) => {
        this.form.patchValue(data);
      });
    }
    this.form = this.fb.group({
      name: ["", Validators.required],
      configName: ["", Validators.required],
      ioType: ["", Validators.required],
      actions: [[], Validators.required]
    });

    this.apiService.getEnum("IOType").subscribe((data: any) => {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          this.ioTypes.push({ name: data[i], key: data[i] });
        }
        this.form.patchValue({
          ioType: data[0]
        });
        this.ioTypeSelected = this.ioTypes[0];
      }
    });
    this.apiService.getActions().subscribe((data: any) => {
      this.actionList = data;
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
  get name() {
    return this.form.get("name");
  }
  get configName() {
    return this.form.get("configName");
  }

  closeTab() {
    this.utilService.removeTabId({
      id: this.outputId,
      type: this.constant.type_object.output
    });
  }
}

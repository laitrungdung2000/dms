import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { APIService } from "../../../../commons/services/api.service";
import { UtilService } from "../../../../commons/services/util.service";
import { Constant } from "../../../../../js-global/constant";
@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  form: FormGroup;
  stateList: any = [];
  states: any = [];
  ioTypes: any = [];

  inputId = this.route.snapshot.paramMap.get("id");

  ioTypeSelected: any = { name: "", key: "" };
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
      this.apiService.createInput(this.form.value).subscribe(data => {
        console.log(data);
        this.closeTab();
      });
    } else {
      this.validateAllFormFields(this.form);
    }
  }
  drop() {
    let stateIds = [];
    this.states.map(function(item) {
      stateIds.push(item.id);
    });
    console.log(stateIds);
    this.form.patchValue({
      states: stateIds
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

  ngOnInit() {
    if (this.inputId !== undefined) {
      this.apiService.getInput(this.inputId).subscribe((data: any) => {
        this.form.patchValue(data);
      });
    }
    this.form = this.fb.group({
      name: ["", Validators.required],
      configName: ["", Validators.required],
      ioType: ["", Validators.required],
      states: [[], Validators.required]
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
    this.apiService.getStates().subscribe((data: any) => {
      this.stateList = data;
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
      id: this.inputId,
      type: this.constant.type_object.input
    });
  }
}

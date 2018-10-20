import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { APIService } from "../../../../commons/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilService } from "../../../../commons/services/util.service";
import { Constant } from "../../../../../js-global/constant";
@Component({
  selector: "app-visual",
  templateUrl: "./visual.component.html",
  styleUrls: ["./visual.component.css"]
})
export class VisualComponent implements OnInit {
  form: FormGroup;
  imgPreview = "";
  isUpdate = false;
  visualId = this.route.snapshot.paramMap.get("id");
  constructor(
    private apiService: APIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private constant: Constant
  ) {
    if (this.visualId !== undefined) {
      this.apiService.getVisual(this.visualId).subscribe((data: any) => {
        this.form.patchValue(data);
        this.imgPreview =
          "data:" + data.contentType + ";base64," + data.content;
      });
      this.isUpdate = true;
    }
    this.form = this.fb.group({
      id: [""],
      configName: ["", Validators.required],
      content: ["", Validators.required],
      contentType: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.apiService.createVisual(this.form.value).subscribe(data => {
        console.log(data);
        this.closeTab();
      });
    } else {
      this.validateAllFormFields(this.form);
    }
  }
  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({
          content: reader.result.toString().split(",")[1],
          contentType: file.type
        });
        this.imgPreview = reader.result.toString();
      };
    }
  }
  ngOnInit() {}

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
  get contentType() {
    return this.form.get("contentType");
  }

  closeTab() {
    this.utilService.removeTabId({
      id: this.visualId,
      type: this.constant.type_object.visual
    });
  }
}
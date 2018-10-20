import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { DragAndDropModule } from "angular-draggable-droppable";
import { APIService } from "../../../../commons/services/api.service";
import { UtilService } from "../../../../commons/services/util.service";
import { Constant } from "../../../../../js-global/constant";
import { TemplateFormComponent } from "./template-form/template-form.component";
import { TemplateObject } from "../../../../objects/templateObject";
import { viewClassName } from "@angular/compiler";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: "app-template",
    templateUrl: "./template.component.html",
    styleUrls: ["./template.component.css"]
})
export class TemplateComponent implements OnInit {
    @ViewChild(TemplateFormComponent)
    templateFormComponent: TemplateFormComponent;

    inputList: any;
    outputList: any;
    inputs: Array<any> = [];
    outputs: Array<any> = [];
    valid: Boolean = false;
    template: TemplateObject = new TemplateObject();
    form: FormGroup;
    deviceTypes = [];
    deviceSelected: any = { name: "", key: "" };

    templateId = this.route.snapshot.paramMap.get("id");

    constructor(
        private apiService: APIService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private utilService: UtilService,
        private constant: Constant
    ) { }

    onSubmit() {
        console.log(this.form.value);
        if (this.form.valid) {
            this.apiService.createTemplate(this.form.value).subscribe(data => {
                console.log("Create template success");
                this.closeTab();
            });
        } else {
            this.validateAllFormFields(this.form);
        }
    }
    dropInput() {
        let inputIds = [];
        this.inputs.map(function (item) {
            inputIds.push(item.id);
        });
        console.log(inputIds);
        this.form.patchValue({
            inputs: inputIds
        });
    }
    dropOutput() {
        let outputIds = [];
        this.outputs.map(function (item) {
            outputIds.push(item.id);
        });
        console.log(outputIds);
        this.form.patchValue({
            outputs: outputIds
        });
    }
    ngOnInit() {
        if (this.route.snapshot.paramMap.get("id") !== undefined) {
            this.apiService
                .getInput(this.route.snapshot.paramMap.get("id"))
                .subscribe((data: any) => {
                    this.form.patchValue(data);
                });
        }
        this.form = this.fb.group({
            id: [""],
            name: ["", Validators.required],
            configName: ["", Validators.required],
            description: ["", Validators.required],
            deviceType: ["", Validators.required],
            sendsAlarms: [false, Validators.required],
            sendsCameraSwitch: [false, Validators.required],
            sendsEvents: [false, Validators.required],
            inputs: [[], Validators.required],
            outputs: [[], Validators.required]
        });
        this.getInputs();
        this.getOutputs();
        this.getDeviceTypes();
    }
    getDeviceTypes() {
        this.apiService.getEnum("DeviceType").subscribe((data: Array<object>) => {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    this.deviceTypes.push({ name: data[i], key: data[i] });
                }
                this.form.patchValue({
                    deviceType: data[0]
                });
                this.deviceSelected = this.deviceTypes[0];
            }
        });
    }

    public getInputs() {
        this.apiService.getInputs().subscribe((data: Array<object>) => {
            this.inputList = data;
        });
    }

    public getOutputs() {
        this.apiService.getOutputs().subscribe((data: Array<object>) => {
            this.outputList = data;
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
    get description() {
        return this.form.get("description");
    }
    get deviceType() {
        return this.form.get("deviceType");
    }
    get sendsAlarms() {
        return this.form.get("sendsAlarms");
    }
    get sendsCameraSwitch() {
        return this.form.get("sendsCameraSwitch");
    }
    get sendsEvents() {
        return this.form.get("sendsEvents");
    }
    get configName() {
        return this.form.get("configName");
    }

    closeTab() {
        this.utilService.removeTabId({
            id: this.templateId,
            type: this.constant.type_object.template
        });
    }
}

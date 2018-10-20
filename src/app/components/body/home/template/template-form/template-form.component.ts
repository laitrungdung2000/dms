import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { FormControl , FormGroup, Validators} from '@angular/forms';
import { APIService } from '../../../../../commons/services/api.service';
@Component({
    selector: 'app-template-form',
    templateUrl: './template-form.component.html',
    styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
    templateForm: FormGroup;
    @Input() model;
    @Output() validChange = new EventEmitter<boolean>();
    deviceTypes: Array<any>;

    submited = false;

    onSubmit() {
        console.log('submit');
        this.submited = true;
        return this.templateForm;
    }
    constructor(private apiService: APIService) {
        
    }


    ngOnInit() {
        this.getDeviceTypes();
        this.templateForm = new FormGroup({
            'name': new FormControl(this.model.name, [
                Validators.required
            ]),
            'description': new FormControl(this.model.description, [
                Validators.required
            ]),
            'deviceType': new FormControl(this.model.deviceType,[
                Validators.required
            ]),
            'sendsAlarms': new FormControl(this.model.sendsAlarms !== undefined ? this.model.sendsAlarms : false, [
                Validators.required
            ]),
            'sendsCameraSwitch': new FormControl(this.model.sendsCameraSwitch !== undefined ? this.model.sendsCameraSwitch: false, [
                Validators.required
            ]),
            'sendsEvents': new FormControl(this.model.sendsEvents !== undefined ? this.model.sendsEvents: false, [
                Validators.required
            ]),
        });
 
        this.templateForm.statusChanges.subscribe(
            result => {console.log('phat emit', this.templateForm.valid); this.validChange.emit(this.templateForm.valid) }
        );
    }

    getDeviceTypes(){
        this.apiService.getEnum('DeviceType').subscribe((data: Array<object>) => {
            this.deviceTypes = data;
            this.templateForm.setValue(this.deviceTypes[0]);
        });
    }
    get name() { return this.templateForm.get('name'); }
    get description() { return this.templateForm.get('description'); }
}

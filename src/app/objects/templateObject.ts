export class TemplateObject {
    public name: string;
    public description: string;
    public deviceType: string;
    public id: string;
    public inputs: Array<any>;
    public outputs: Array<any>;
    public sendsAlarms: Boolean;
    public sendsCameraSwitch: Boolean;
    public sendsEvents: Boolean;
    public visualOrder: Array<any>
    constructor(){}
}
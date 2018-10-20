import { Injectable } from "@angular/core";

@Injectable()
export class Constant {
  base_url: string = window.location.origin + "/dms/rest/v2";
  get_template_list_url = this.base_url + /template/;
  get_input_list_url = this.base_url + "/template/input/";
  get_output_list_url = this.base_url + "/template/output/";
  get_action_list_url = this.base_url + "/template/action/";
  get_state_list_url = this.base_url + "/template/state/";
    
  new_template: string = "New Template";

  type_object: any = {
      template: "Template",
      input: "Input",
      output: "Output",
      action: "Action",
      state: "State",
      visual: "Visual"
  };

  path_object: any = {
      home: "home",
      templates: "templates",
      setting: "setting",
      inputs: "inputs",
      outputs: "outputs",
      actions: "actions",
      states: "states",
      visuals: "visuals"
  }
}

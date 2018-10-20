import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as API from "../services/api";
@Injectable({
  providedIn: "root"
})
export class APIService {
  API_URL = `${window.location.origin}/dms/rest/v2`;
  constructor(private httpClient: HttpClient) {}
  // input
  getInputs() {
    return this.httpClient.get(API.TEMPLATE_INPUT);
  }
  getInput(id) {
    return this.httpClient.get(`${API.TEMPLATE_INPUT}/${id}`);
  }
  createInput(data) {
    return this.httpClient.post(API.TEMPLATE_INPUT, data);
  }
  updateInput(data) {
    return this.httpClient.put(API.TEMPLATE_INPUT, data);
  }
  deleteInput(data) {
    return this.httpClient.delete(API.TEMPLATE_INPUT, this.getBody(data));
  }

  //output
  getOutputs() {
    return this.httpClient.get(API.TEMPLATE_OUTPUT);
  }
  getOutput(id) {
    return this.httpClient.get(`${API.TEMPLATE_OUTPUT}${id}`);
  }
  createOutput(data) {
    return this.httpClient.post(API.TEMPLATE_OUTPUT, data);
  }
  updateOutput(data) {
    return this.httpClient.put(API.TEMPLATE_OUTPUT, data);
  }
  deleteOutput(data) {
    return this.httpClient.delete(API.TEMPLATE_OUTPUT, this.getBody(data));
  }

  // action
  getActions() {
    return this.httpClient.get(API.TEMPLATE_ACTION);
  }
  getAction(id) {
    return this.httpClient.get(`${API.TEMPLATE_ACTION}${id}`);
  }
  createAction(data) {
    return this.httpClient.post(API.TEMPLATE_ACTION, data);
  }
  updateAction(data) {
    return this.httpClient.put(API.TEMPLATE_ACTION, data);
  }
  deleteAction(data) {
    return this.httpClient.delete(API.TEMPLATE_ACTION, this.getBody(data));
  }

  // state
  getStates() {
    return this.httpClient.get(API.TEMPLATE_STATE);
  }
  getState(id) {
    return this.httpClient.get(`${API.TEMPLATE_STATE}${id}`);
  }
  createState(data) {
    return this.httpClient.post(API.TEMPLATE_STATE, data);
  }
  updateState(data) {
    return this.httpClient.put(API.TEMPLATE_STATE, data);
  }
  deleteState(data) {
    return this.httpClient.delete(API.TEMPLATE_STATE, this.getBody(data));
  }

  // template
  getTemplates() {
    return this.httpClient.get(API.TEMPLATE);
  }
  getTemplate(id) {
    return this.httpClient.get(`${API.TEMPLATE}${id}`);
  }
  createTemplate(data) {
    return this.httpClient.post(API.TEMPLATE, data);
  }
  updateTemplate(data) {
    return this.httpClient.put(API.TEMPLATE, data);
  }

  deleteTemplate(data) {
    return this.httpClient.delete(API.TEMPLATE, this.getBody(data));
  }

  // visual
  getVisuals() {
    return this.httpClient.get(API.TEMPLATE_VISUAL);
  }
  getVisual(id) {
    return this.httpClient.get(`${API.TEMPLATE_VISUAL}${id}`);
  }
  createVisual(data: any) {
    return this.httpClient.post(API.TEMPLATE_VISUAL, data);
  }
  updateVisual(data) {
    return this.httpClient.put(API.TEMPLATE_VISUAL, data);
  }

  deleteVisual(data) {
    return this.httpClient.delete(API.TEMPLATE_VISUAL, this.getBody(data));
  }

  // common api
  getEnum(type) {
    return this.httpClient.get(`${API.ENUM}${type}`);
  }

  getBody(data: any) {
      let object: any = {
          body: data
      };
      return object;
  }
}

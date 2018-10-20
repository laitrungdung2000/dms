import { NgModule, Input } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SettingComponent } from "./components/body/setting/setting.component";
import { HomeComponent } from "./components/body/home/home.component";
import { TemplateComponent } from "./components/body/home/template/template.component";

import { InputComponent } from "./components/body/home/input/input.component";
import { OutputComponent } from "./components/body/home/output/output.component";
import { ActionComponent } from "./components/body/home/action/action.component";
import { StateComponent } from "./components/body/home/state/state.component";
import { VisualComponent } from "./components/body/home/visual/visual.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "setting",
    component: SettingComponent,
    children: [
      {
        path: "inputs",
        component: SettingComponent
      },
      {
        path: "outputs",
        component: SettingComponent
      },
      {
        path: "actions",
        component: SettingComponent
      },
      {
        path: "states",
        component: SettingComponent
      },
      {
        path: "visuals",
        component: SettingComponent
      }
    ]
  },

  {
    path: "setting/inputs/:id",
    component: InputComponent
  },
  {
    path: "setting/outputs/:id",
    component: OutputComponent
  },
  {
    path: "setting/actions/:id",
    component: ActionComponent
  },
  {
    path: "setting/states/:id",
    component: StateComponent
  },
  {
    path: "setting/visuals/:id",
    component: VisualComponent
  },
  { path: "home/templates/:id", component: TemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { MalihuScrollbarModule } from "ngx-malihu-scrollbar";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, FormControl } from "@angular/forms";
import { DragAndDropModule } from "angular-draggable-droppable";
import { NgxDnDModule } from "@swimlane/ngx-dnd";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { GlobalBarComponent } from "./components/header/global-bar/global-bar.component";
import { BodyComponent } from "./components/body/body.component";

import { SettingComponent } from "./components/body/setting/setting.component";
import { FooterComponent } from "./components/footer/footer.component";

import { TabsComponent } from "./components/header/tabs/tabs.component";
import { TabComponent } from "./commons/components/tab/tab.component";
import { HomeComponent } from "./components/body/home/home.component";
import { DatatableComponent } from "./components/body/home/datatable/datatable.component";
import { FilterBarComponent } from "./components/body/home/filter-bar/filter-bar.component";
import { Constant } from "../js-global/constant";
import { SubTabsComponent } from "./components/body/setting/sub-tabs/sub-tabs.component";
import { TemplateComponent } from "./components/body/home/template/template.component";
import { PCollapseComponent } from "./commons/components/p-collapse/p-collapse.component";
import { TemplateFormComponent } from "./components/body/home/template/template-form/template-form.component";
import { InputComponent } from "./components/body/home/input/input.component";
import { OutputComponent } from "./components/body/home/output/output.component";
import { ActionComponent } from "./components/body/home/action/action.component";
import { StateComponent } from "./components/body/home/state/state.component";
import { VisualComponent } from './components/body/home/visual/visual.component';
import { ContainerComponent } from './commons/components/container/container.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AsaDropdownComponent } from './commons/components/asa-dropdown/asa-dropdown.component';
import { ColorPickerModule } from 'ngx-color-picker';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalBarComponent,
    BodyComponent,
    SettingComponent,
    FooterComponent,
    TabsComponent,
    TabComponent,
    HomeComponent,
    DatatableComponent,
    FilterBarComponent,
    SubTabsComponent,
    TemplateComponent,
    PCollapseComponent,
    TemplateFormComponent,
    InputComponent,
    OutputComponent,
    ActionComponent,
    StateComponent,
    VisualComponent,
    ContainerComponent,
    AsaDropdownComponent
  ],
  imports: [
    NgxDnDModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    DragAndDropModule,
    ColorPickerModule,
    MalihuScrollbarModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [Constant],
  bootstrap: [AppComponent]
})
export class AppModule {}

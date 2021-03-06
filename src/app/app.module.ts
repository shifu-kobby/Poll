import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateComponent } from './component/create/create.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card';
import { AngularMaterialDataGridModule } from 'angular-material-data-grid';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MonitorComponent } from './component/monitor/monitor.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { PollComponent } from './component/poll/poll.component';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { StoreModule } from '@ngrx/store';
import { reducer, userReducer } from './store/reducers/user.reducer';
import { USER_FEATURE_KEY } from './store/state/user.state';
import {MatMenuModule} from '@angular/material/menu';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
    SideNavComponent,
    ToolbarComponent,
    MonitorComponent,
    PollComponent,
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    MatTooltipModule,
    ClipboardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    ChartsModule,
    WavesModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    AngularMaterialDataGridModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(USER_FEATURE_KEY, reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

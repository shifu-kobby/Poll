import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './component/create/create.component';
import { HomeComponent } from './component/home/home.component';
import { MonitorComponent } from './component/monitor/monitor.component';
import { PollComponent } from './component/poll/poll.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: CreateComponent},
  {path: 'monitor', component: MonitorComponent},
  {path: 'poll', component: PollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

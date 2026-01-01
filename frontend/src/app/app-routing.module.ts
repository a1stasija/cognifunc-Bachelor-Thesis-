import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentComponent } from './consent/consent.component';
import { HomeComponent } from './home/home.component';
import { FlankerTestComponent } from './flanker-test/flanker-test.component';
import { VisualSearchTestComponent } from './visual-search-test/visual-search-test.component';
import { VisualSearchRecreateComponent } from './visual-search-recreate/visual-search-recreate.component';
import { FlankerRecreateComponent } from './flanker-recreate/flanker-recreate.component';

const routes: Routes = [{path:'', component:HomeComponent},
  {path:'consent', component:ConsentComponent},
  {path:'flanker', component:FlankerTestComponent},
  {path:'visualSearch', component: VisualSearchTestComponent},
  {path:'recreateVisualSearch', component:VisualSearchRecreateComponent},
  {path:'recreateFlanker', component: FlankerRecreateComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking/ranking.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { RaceComponent } from './race/race.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RankingService } from './ranking/ranking.service';
import { UpdateService } from './update/update.service';
import { RaceService } from './race/race.service';
import { AuthGuard } from 'app/auth/helpers';

const routes: Routes = [
  {
    path: 'ranking',
    component: RankingComponent
  },
  {
    path: 'race',
    canActivate: [AuthGuard],
    component: RaceComponent
  },
  {
    path: 'update',
    canActivate: [AuthGuard],
    component: UpdateComponent
  }
]

@NgModule({
  declarations: [
    RankingComponent,
    UpdateComponent,
    RaceComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), NgxDatatableModule, CoreCommonModule,NgbModule
  ],
  providers: [RankingService, UpdateService, RaceService]
})
export class AppsModule { }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { log } from 'console';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RankingService } from './ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankingComponent implements OnInit {
  public data: any;

  selected = [];

  constructor(private _rankingService: RankingService, private router: Router) {

  }

  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  private _unsubscribeAll: Subject<any>;

  ngOnInit() {
    const body = {
      page: 0,
      contains: null,
      sort: null,
      fromDate: null,
      toDate: null,
      size: 1000,
    };
    console.log("jdksaks");
    this._rankingService
      .getRankingTeam(JSON.stringify(body))
      // .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        console.log(response);
        this.data = response.data.data;
        console.log("list ranking");
      });
  }
  public editingName = { '0': false, '1': false };

  inlineEditingUpdateName(event, cell, rowIndex) {
    console.log(1);

    this.editingName[rowIndex] = false;
    this.data[parseInt(rowIndex)].name = event.target.value;

  }


  onSelect({ selected }) {
    console.log('Select Event', selected);
    // console.log("select", this.selected[0].raceTeamId)
    // this._rankingService
    //   .getRacerOfTem(this.selected[0].raceTeamId)
    //   .subscribe((response: any) => {
    //       console.log(response);
    //       this.data = response.data.data;
    //       console.log("list ranking");
    //   });
  }

  onActivate(event) {
    console.log('Activate Event', event);
    if (event.type == 'click')
      this.router.navigateByUrl(`apps/ranking/${event.row.raceTeamId}`)
  }

}

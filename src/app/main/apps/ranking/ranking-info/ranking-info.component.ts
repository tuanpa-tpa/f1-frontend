import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RankingService } from '../ranking.service';

@Component({
  selector: 'app-ranking-info',
  templateUrl: './ranking-info.component.html',
  styleUrls: ['./ranking-info.component.scss']
})
export class RankingInfoComponent implements OnInit {
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  private _unsubscribeAll: Subject<any>;
  selected = []

  data: any
  teamName: string

  constructor(private route: ActivatedRoute, private rankingService: RankingService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(param => {
        console.log(param);
        return param['id'];
      }), switchMap(id => {
        console.log(id)
        return this.rankingService.getRacerOfTem(id)
      })).subscribe(res => {
        this.data = res.data.racers
        this.teamName = res.data.name
        console.log(res);
      })
  }

}

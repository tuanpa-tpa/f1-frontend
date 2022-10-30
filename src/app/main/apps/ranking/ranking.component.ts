import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { log } from 'console';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankingComponent implements OnInit {
  public data: any = [{id: 1, name: 'acccccccccc3213213123'}, {name: 'b321321312312312'}];
  constructor() { }


  

  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
public ColumnMode = ColumnMode
  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {

  }

  /**
   * On init
   */
  ngOnInit() {

  }

  public editingName = {'0': false, '1': false};


  /**
   * Inline editing Name
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateName(event, cell, rowIndex) {
    console.log(1);
    
    this.editingName[rowIndex] = false;
    this.data[parseInt(rowIndex)].name = event.target.value;

  }

  a() {
    console.log(1);
    
  }
  
}

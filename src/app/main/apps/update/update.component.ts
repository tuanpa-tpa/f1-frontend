import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { UpdateService } from './update.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateComponent implements OnInit {
  season = []
  grandPrix = []
  result = []
  selected = null
  grandPrixId = null
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  constructor(private updateService: UpdateService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.updateService.getAllSeason().subscribe((res) => {
      this.season = res.data
      this.selected = this.season[0].seasonId
      this.getSeason()
      console.log(this.season)
    })
  }

  getSeason() {
    console.log(this.selected);

    const body = {
      page: 0,
      contains: null,
      sort: null,
      seasonId: this.selected,
      fromDate: null,
      toDate: null,
      size: 1000,
    };

    this.updateService.searchGrandPrix(JSON.stringify(body)).subscribe(res => {
      this.grandPrix = res.data.data
      this.grandPrix.forEach(() => {
        this.editing.push(false)
      })
    })
  }

  onActivate(modal, event) {
    console.log('Activate Event', event);
    if (event.type == 'click') {
      const body = {
        page: 0,
        contains: null,
        sort: null,
        grandPrixId: event.row.grandPrixId,
        fromDate: null,
        toDate: null,
        size: 1000,
      };
      this.modalService.open(modal, { size: 'xl' })
      this.updateService.search(body).subscribe(res => {
        this.result = res.data.data
      })
    }
  }

  public editing = [];
  inlineEditingUpdateName(event, cell, rowIndex) {
    console.log(1);

    this.editing[parseInt(rowIndex)] = false;
    this.result[parseInt(rowIndex)][cell] = event.target.value;
    if (cell == 'lapFinished')
      this.result[parseInt(rowIndex)][cell] = parseInt(event.target.value);
    console.log(this.result)

  }

  update() {
    const body = {
      grandPrixId: this.grandPrixId,
      updates: this.result
    }
    this.updateService.updateResult(JSON.stringify(body)).subscribe(res => {
      console.log(res)
      
      Swal.fire({title: 'Thành công', text: "Da cap nhat"})
      this.modalService.dismissAll()
    })
  }
}

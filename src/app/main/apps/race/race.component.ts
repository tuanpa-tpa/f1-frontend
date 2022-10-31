import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { RaceService } from './race.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RaceComponent implements OnInit {
  season = []
  grandPrix = []
  selected = null
  raceCourse = [1, 2, 3]
  listRemove = []
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  form: FormGroup;
  type = ""
  constructor(private raceService: RaceService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      "name": [""],
      "laps": [],
      "time": [""],
      "raceCourseId": [],
      "seasonId": [],
      "grandPrixId": []
    })
    this.raceService.getAllSeason().subscribe((res) => {
      this.season = res.data
      this.selected = this.season[0].seasonId
      console.log(this.selected);
      
      this.getSeason()
    })
  }

  getSeason() {
    const body = {
      page: 0,
      contains: null,
      sort: null,
      seasonId: this.selected,
      fromDate: null,
      toDate: null,
      size: 1000,
    };

    this.raceService.search(JSON.stringify(body)).subscribe(res => {
      this.grandPrix = res.data.data
    })
  }

  onActivate(modal, event) {
    if (event.type == 'click' && event.column.name != 'checkbox') {
      this.type = 'update'
      const body = {
        page: 0,
        contains: null,
        sort: null,
        grandPrixId: event.row.grandPrixId,
        fromDate: null,
        toDate: null,
        size: 1000,
      };
      this.modalService.open(modal)
      this.raceService.getGrandPrix(event.row.grandPrixId).subscribe(res => {
        this.form.patchValue({ ...res.data, grandPrixId: event.row.grandPrixId })
      })
      // this.updateService.search(body).subscribe(res => {
      //   this.result = res.data.data
      // })
    }
  }

  create(modal) {
    this.type = 'create';
    this.modalService.open(modal)
  }

  onSelect(event) {
    this.listRemove = event.selected;
  }

  delete() {
    let observable = []
    this.listRemove.map(x => {
      observable.push(this.raceService.deleteGrandPrix(x.grandPrixId))
    });

    forkJoin(observable).subscribe(res => {
      Swal.fire({ title: 'Thành công', text: "Da xoa" })
      const body = {
        page: 0,
        contains: null,
        sort: null,
        seasonId: this.selected,
        fromDate: null,
        toDate: null,
        size: 1000,
      };
      this.raceService.search(JSON.stringify(body)).subscribe(res => {
        this.grandPrix = res.data.data
      })
    })
  }

  submit() {
    if (this.type === 'create') {
      this.raceService.createGrandPrix(JSON.stringify(this.form.value)).subscribe(res => {
        Swal.fire({ title: 'Thành công', text: "Da them" })
        this.form.reset()
        this.modalService.dismissAll()
        const body = {
          page: 0,
          contains: null,
          sort: null,
          seasonId: this.selected,
          fromDate: null,
          toDate: null,
          size: 1000,
        };
        this.raceService.search(JSON.stringify(body)).subscribe(res => {
          this.grandPrix = res.data.data
        })
      })
    }
    else {
      console.log(this.form.value);
      this.raceService.updateGrandPrix(JSON.stringify(this.form.value)).subscribe(res => {


        Swal.fire({ title: 'Thành công', text: "Da cap nhat" })
        this.form.reset()
        this.modalService.dismissAll()
        const body = {
          page: 0,
          contains: null,
          sort: null,
          seasonId: this.selected,
          fromDate: null,
          toDate: null,
          size: 1000,
        };
        this.raceService.search(JSON.stringify(body)).subscribe(res => {
          this.grandPrix = res.data.data
        })
      })

    }
  }
}

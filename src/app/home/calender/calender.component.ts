/* tslint:disable */

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, AfterViewInit {

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};

  @ViewChild('dp', {static: false}) datePickerRef: ElementRef<any>;

  private dayColumnSelected: number;
  private dayRowSelected: number;
  private monthCurr: number;

  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
    const date = new Date();
    this.model = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    this.dayColumnSelected = date.getDay() === 0 ? 7 : date.getDay();
    this.dayRowSelected = 1 + this.getWeekRow(this.model);
    this.monthCurr =  date.getMonth() + 1;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectDate(this.dayColumnSelected, this.dayRowSelected);
    }, 1);
  }

  onDatepickerClick(event: MouseEvent) {
    if ((event.target.className === 'btn btn-link ngb-dp-arrow-btn' && event.target.parentElement.className === 'ngb-dp-arrow right') ||
        (event.target.className === 'ngb-dp-navigation-chevron' && event.target.parentNode.parentElement.className === 'ngb-dp-arrow right')) {
      this.monthCurr++;
      console.log(`month ++ | monthCurr: ${this.monthCurr} model.month: ${this.model.month}`);
      this.checkMonthToSelect();

    } else if ((event.target.className === 'btn btn-link ngb-dp-arrow-btn' && event.target.parentElement.className === 'ngb-dp-arrow') ||
        (event.target.className === 'ngb-dp-navigation-chevron' && event.target.parentNode.parentElement.className === 'ngb-dp-arrow')) {
      this.monthCurr--;
      console.log(`month -- | monthCurr: ${this.monthCurr} model.month: ${this.model.month}`);
      this.checkMonthToSelect();

    } else if (event.target.className === 'btn-light bg-primary text-white active' ||
        event.target.className === 'btn-light active bg-primary text-white') {
      const dayColumn = this.calendar.getWeekday(NgbDate.from(this.model));
      const dayRow = 1 + this.getWeekRow(this.model);

      this.selectDate(dayColumn, dayRow);
    }
  }

  private getWeekRow(dateStruc: NgbDateStruct): number {
    let firstDayOfMonth = new Date(dateStruc.year, dateStruc.month - 1, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

    let index = 1;
    while (true) {
      if (7 * index - firstDayOfMonth + 1 >= dateStruc.day) {
        return index;
      }
      index++;
    }
  }

  private selectDate(column: number, row: number): void {
    if (this.dayRowSelected && this.dayColumnSelected) {
      this.datePickerRef._elementRef.nativeElement.querySelector(`div.ngb-dp-months > div > ngb-datepicker-month-view > 
           div:nth-child(${this.dayRowSelected}) > div:nth-child(${this.dayColumnSelected}) > div`).classList.remove('rm-selected');
    }

    if (row && column) {
      this.datePickerRef._elementRef.nativeElement.querySelector(`div.ngb-dp-months > div > ngb-datepicker-month-view > 
           div:nth-child(${row}) > div:nth-child(${column}) > div`).classList.add('rm-selected');
    }

    this.dayRowSelected = row;
    this.dayColumnSelected = column;
    this.monthCurr = this.model.month;
  }

  private checkMonthToSelect() {
    if (this.model.month === this.monthCurr) {
      this.datePickerRef._elementRef.nativeElement.querySelector(`div.ngb-dp-months > div > ngb-datepicker-month-view > 
           div:nth-child(${this.dayRowSelected}) > div:nth-child(${this.dayColumnSelected}) > div`).classList.add('rm-selected');
    } else {
      this.datePickerRef._elementRef.nativeElement.querySelector(`div.ngb-dp-months > div > ngb-datepicker-month-view > 
           div:nth-child(${this.dayRowSelected}) > div:nth-child(${this.dayColumnSelected}) > div`).classList.remove('rm-selected');
    }
  }

  private getSelectedDate() {
    return new Date(this.model.year, this.model.month - 1, this.model.day);
  }
}

import { AfterViewInit, Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, AfterViewInit {

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};

  @ViewChild('dp', {static: false}) datePickerRef: ViewRef;

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
    if (((<HTMLButtonElement>event.target).className === 'btn btn-link ngb-dp-arrow-btn' &&
        (<HTMLButtonElement>event.target).parentElement.className === 'ngb-dp-arrow right') ||
        ((<HTMLSpanElement>event.target).className === 'ngb-dp-navigation-chevron' &&
        (<HTMLSpanElement>event.target).parentNode.parentElement.className === 'ngb-dp-arrow right')) {
      this.monthCurr++;
      console.log(`month ++ | monthCurr: ${this.monthCurr} model.month: ${this.model.month}`);
      this.checkMonthToSelect();

    } else if (((<HTMLButtonElement>event.target).className === 'btn btn-link ngb-dp-arrow-btn' &&
        (<HTMLButtonElement>event.target).parentElement.className === 'ngb-dp-arrow') ||
        ((<HTMLSpanElement>event.target).className === 'ngb-dp-navigation-chevron' &&
        (<HTMLSpanElement>event.target).parentNode.parentElement.className === 'ngb-dp-arrow')) {
      this.monthCurr--;
      console.log(`month -- | monthCurr: ${this.monthCurr} model.month: ${this.model.month}`);
      this.checkMonthToSelect();

    } else if ((<HTMLDivElement>event.target).className === 'btn-light bg-primary text-white active' ||
        (<HTMLDivElement>event.target).className === 'btn-light active bg-primary text-white') {
      const dayColumn = this.calendar.getWeekday(NgbDate.from(this.model));
      const dayRow = 1 + this.getWeekRow(this.model);

      this.selectDate(dayColumn, dayRow);
    }
  }

  private getWeekRow(dateStruct: NgbDateStruct): number {
    let firstDayOfMonth = new Date(dateStruct.year, dateStruct.month - 1, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

    let index = 1;
    while (true) {
      if (7 * index - firstDayOfMonth + 1 >= dateStruct.day) {
        return index;
      }
      index++;
    }
  }

  private selectDate(column: number, row: number): void {
    // tslint:disable-next-line
    const dayElemUnselector = `div.ngb-dp-months > div > ngb-datepicker-month-view > div:nth-child(${this.dayRowSelected}) > div:nth-child(${this.dayColumnSelected}) > div`;
    const dayElemSelector = `div.ngb-dp-months > div > ngb-datepicker-month-view > div:nth-child(${row}) > div:nth-child(${column}) > div`;

    if (this.dayRowSelected && this.dayColumnSelected) {
      (<any>this.datePickerRef)._elementRef.nativeElement.querySelector(dayElemUnselector).classList.remove('rm-selected');
    }

    if (row && column) {
      (<any>this.datePickerRef)._elementRef.nativeElement.querySelector(dayElemSelector).classList.add('rm-selected');
    }

    this.dayRowSelected = row;
    this.dayColumnSelected = column;
    this.monthCurr = this.model.month;
  }

  private checkMonthToSelect() {
    // tslint:disable-next-line
    const dayElemSelector = `div.ngb-dp-months > div > ngb-datepicker-month-view > div:nth-child(${this.dayRowSelected}) > div:nth-child(${this.dayColumnSelected}) > div`;

    if (this.model.month === this.monthCurr) {
      (<any>this.datePickerRef)._elementRef.nativeElement.querySelector(dayElemSelector).classList.add('rm-selected');
    } else {
      (<any>this.datePickerRef)._elementRef.nativeElement.querySelector(dayElemSelector).classList.remove('rm-selected');
    }
  }

  private getSelectedDate() {
    return new Date(this.model.year, this.model.month - 1, this.model.day);
  }
}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  addHours,
  add,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppointmentService } from 'src/app/service/appointment/appointment-service';
import { Appointment } from 'src/app/model/appointment';
import {
  convertStringToDate,
  getFirstDayofWeek,
  getLastDayofWeek,
  isTodaysDate,
  dateToString,
  formatDate,
} from 'src/app/utils/utils';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastService } from 'src/app/service/toast/toast.service';
import { WeekViewHourColumn } from 'calendar-utils';
import { NotesService } from 'src/app/service/notes/notes.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
   physicians = [];
   patients = [];
   bookingForm:FormGroup;
  constructor(
    private modal: NgbModal,
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private noteService: NotesService
  ) {
    // this.bookingForm = this.formBuilder.group({
    //   physicianId: [''],
    //   patientId: [''], 
    // });
      }
  appointments = [];
  activeDayIsOpen: boolean = true;
  // hourColumns: WeekViewHourColumn[];
  selectedDate: Date = null;

 

  getPhysician() {
    return [
      { id: '1', name: 'Dr. Smith' },
      { id: '2', name: 'Dr. Subhash' },
      { id: '3', name: 'Dr. Thomas' },
      { id: '4', name: 'Dr. Prajakta' },
      { id: '5', name: 'Dr. John' },
      { id: '6', name: 'Dr. William' },
      { id: '7', name: 'Dr. Rk' },
      { id: '8', name: 'Dr. Allen' },
      { id: '9', name: 'Dr. Lee' },
    ];
  }
  getPatient() {
    return [
      { id: '1', name: 'Santosh' },
      { id: '2', name: 'Gorge' },
      { id: '3', name: 'Ashraf' },
      { id: '4', name: 'Willam' },
      { id: '5', name: 'Bruce' },
      { id: '6', name: 'Loki' },
      { id: '7', name: 'Natasha' },
      { id: '8', name: 'Tony' },
      { id: '9', name: 'Thanos' },
    ];
  }

  ngOnInit(): void {

    this.bookingForm = this.formBuilder.group({
      meetingTitle: new FormControl(),
      description: new FormControl(),
      physicianId: new FormControl(),
      patientId: new FormControl(),
      appointmentDate: new FormControl(),
      appointmentStartTime: new FormControl(),
      appointmentEndTime: new FormControl(),
    });

    //ToDo call the method baed on user role
    this.physicians = this.getPhysician();
    this.patients = this.getPatient();

  
  
    let role = 'physician';
    if (role === 'patient') {
      this.populatePatientsAppointments(
        dateToString(getFirstDayofWeek(this.viewDate)),
        dateToString(getLastDayofWeek(this.viewDate))
      );
    } else {
      this.populatePhysiciansAppoitments(
        dateToString(getFirstDayofWeek(this.viewDate)),
        dateToString(getLastDayofWeek(this.viewDate))
      );
    }

    // this.noteService.getUsersByRole().subscribe((val) => {
    //   this.physicians = val.filter((user) => {
    //     // TODO: sender id is hardcoded for now . would be fetched from session

    //     return user.userId !== 3;
    //   });

    //   console.log(val);
    // });
  }
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  refresh: Subject<any> = new Subject();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  populatePatientsAppointments(startDate: string, endDate: string) {
    this.appointmentService
      .getAppointmentToPatient(84, startDate, endDate)
      .subscribe((val) => {
        //console.log(val);
        this.appointments = val;
        this.events = val.map((appointments: Appointment) => {
          return {
            start: new Date(
              convertStringToDate(
                appointments.appointmentDate
              ).getUTCFullYear(),
              convertStringToDate(appointments.appointmentDate).getUTCMonth(),
              convertStringToDate(appointments.appointmentDate).getUTCDate(),
              parseInt(appointments.appointmentStartTime.split(':')[0]),
              parseInt(appointments.appointmentStartTime.split(':')[1]),
              0,
              0
            ),

            end: new Date(
              convertStringToDate(
                appointments.appointmentDate
              ).getUTCFullYear(),
              convertStringToDate(appointments.appointmentDate).getUTCMonth(),
              convertStringToDate(appointments.appointmentDate).getUTCDate(),
              parseInt(appointments.appointmentEndTime.split(':')[0]),
              parseInt(appointments.appointmentEndTime.split(':')[1]),
              0,
              0
            ),

            title: appointments.meetingTitle,
            color: isTodaysDate(appointments.appointmentDate)
              ? colors.yellow
              : colors.blue,
          } as CalendarEvent;
        });
      });
  }

  populatePhysiciansAppoitments(startDate: string, endDate: string) {
    this.appointmentService
      .getAppointmentToPhysician(19, startDate, endDate)
      .subscribe((val) => {
        //console.log(val);
        this.appointments = val;
        this.events = val.map((appointments: Appointment) => {
          return {
            start: new Date(
              convertStringToDate(
                appointments.appointmentDate
              ).getUTCFullYear(),
              convertStringToDate(appointments.appointmentDate).getUTCMonth(),
              convertStringToDate(appointments.appointmentDate).getUTCDate(),
              parseInt(appointments.appointmentStartTime.split(':')[0]),
              parseInt(appointments.appointmentStartTime.split(':')[1]),
              0,
              0
            ),

            end: new Date(
              convertStringToDate(
                appointments.appointmentDate
              ).getUTCFullYear(),
              convertStringToDate(appointments.appointmentDate).getUTCMonth(),
              convertStringToDate(appointments.appointmentDate).getUTCDate(),
              parseInt(appointments.appointmentEndTime.split(':')[0]),
              parseInt(appointments.appointmentEndTime.split(':')[1]),
              0,
              0
            ),

            title: appointments.meetingTitle,
            color: isTodaysDate(appointments.appointmentDate)
              ? colors.yellow
              : colors.blue,
          } as CalendarEvent;
        });
      });
  }

  colors: any = {
    blue: {
      primary: '#2B4FA6',
      secondary: '#1570E4',
    },
    yellow: {
      primary: '#EDAA00',
      secondary: '#EDAA00',
    },
  };

  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [];

  // private addSelectedDayViewClass() {
  //   this.hourColumns.forEach((column) => {
  //     column.hours.forEach((hourSegment) => {
  //       hourSegment.segments.forEach((segment) => {
  //         delete segment.cssClass;
  //         if (this.shouldAddHighlight(segment.date)) {
  //           segment.cssClass = 'cal-day-selected';
  //         }
  //       });
  //     });
  //   });
  // }

  closeOpenMonthViewDay() {
    let role = 'physician';
    if (role === 'patient') {
      this.populatePatientsAppointments(
        dateToString(getFirstDayofWeek(this.viewDate)),
        dateToString(getLastDayofWeek(this.viewDate))
      );
    } else {
      this.populatePhysiciansAppoitments(
        dateToString(getFirstDayofWeek(this.viewDate)),
        dateToString(getLastDayofWeek(this.viewDate))
      );
    }
    this.activeDayIsOpen = false;
  }
  hourSegmentClicked(date: Date, content) {
    this.selectedDate = date;
    this.modal.open(content);
    this.bookingForm.get('appointmentDate').setValue(formatDate(date));
    var options = { hour12: false };
    console.log(date.toLocaleString('en-US', options));
    //we need getter method to get & set the time
    // this.bookingForm.get('appointmentStartTime').setValue(date.toLocaleTimeString());
    this.bookingForm
      .get('appointmentStartTime')
      .setValue(date.toLocaleTimeString('en-US', options));
    date.setTime(date.getTime() + 30 * 60 * 1000);
    // this.bookingForm.get('appointmentEndTime').setValue(date.toLocaleTimeString());
    this.bookingForm
      .get('appointmentEndTime')
      .setValue(date.toLocaleTimeString('en-US', options));

    // this.addSelectedDayViewClass();
  }
  submitted = false;

  book() {
    console.log('inside');
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }
    // this.bookingForm.appointmentStartTime=   Date.now()
    let newAppointment: Appointment = this.bookingForm.value;

    //setter method to set time

    console.log(this.selectedDate);

    // TODO: sender id is hardcoded for now . would be fetched from session
    this.appointmentService.bookAppointment(newAppointment).subscribe(
      (data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 5000,
        });
      },
      (error) => {
        this.toastService.show('Server Error please try later', {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
  }

  shouldAddHighlight = function (date) {
    let startDate = this.selectedDate;
    let endDate = this.selectedDate.setTime(
      this.selectedDate.getTime() + 30 * 60 * 1000
    );
    console.log('Start date ' + startDate);
    console.log('Date ' + startDate);
    if (date > startDate && date < endDate) {
      return true;
      alert(date);
    }

    function addSelectedDayViewClass() {
      this.hourColumns.forEach((column) => {
        column.hours.forEach((hourSegment) => {
          hourSegment.segments.forEach((segment) => {
            delete segment.cssClass;
            if (this.shouldAddHighlight(segment.date)) {
              segment.cssClass = 'cal-day-selected';
            }
          });
        });
      });
    }
  };
}

import {
  Component, OnInit, ViewChild,
  TemplateRef,
} from '@angular/core';
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
  add
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppointmentService } from 'src/app/service/appointment/appointment-service';
import { Appointment } from 'src/app/model/appointment';
import { convertStringToDate, getFirstDayofWeek, getLastDayofWeek, isTodaysDate, dateToString, formatDate } from 'src/app/utils/utils';
import { FormGroup, FormControl, FormArray, Validators,FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/service/toast/toast.service';

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
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private modal: NgbModal, private appointmentService: AppointmentService,private formBuilder: FormBuilder,private toastService :ToastService) { }
  appointments = [];
  activeDayIsOpen: boolean = true;
  bookingForm: FormGroup = this.formBuilder.group({
    meetingTitle :new FormControl(),
    description :new FormControl(),
    physicianId : new FormControl(),
    patientId :new FormControl(),
    appointmentDate :new FormControl(),
    appointmentStartTime: new FormControl(),
    appointmentEndTime:new FormControl()
  });
  ngOnInit(): void {
    
    //ToDo call the method baed on user role
    let role = 'physician'
    if (role === 'patient') {
      this.populatePatientsAppointments(dateToString(getFirstDayofWeek(this.viewDate)), 
            dateToString(getLastDayofWeek(this.viewDate)));
    }
    else {
      this.populatePhysiciansAppoitments(dateToString(getFirstDayofWeek(this.viewDate)),
            dateToString(getLastDayofWeek(this.viewDate)));
    }

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
    this.appointmentService.getAppointmentToPatient(84, startDate, endDate).subscribe(val => {
      //console.log(val);
      this.appointments = val;
      this.events = val.map((appointments: Appointment) => {
        return {
          start: new Date(
            convertStringToDate(appointments.appointmentDate).getUTCFullYear(),
            convertStringToDate(appointments.appointmentDate).getUTCMonth(),
            convertStringToDate(appointments.appointmentDate).getUTCDate(),
            parseInt(appointments.appointmentStartTime.split(':')[0]),
            parseInt(appointments.appointmentStartTime.split(':')[1]), 0, 0
          ),

          end: new Date(
            convertStringToDate(appointments.appointmentDate).getUTCFullYear(),
            convertStringToDate(appointments.appointmentDate).getUTCMonth(),
            convertStringToDate(appointments.appointmentDate).getUTCDate(),
            parseInt(appointments.appointmentEndTime.split(':')[0]),
            parseInt(appointments.appointmentEndTime.split(':')[1]), 0, 0
          ),

          title: appointments.meetingTitle,
          color: isTodaysDate(appointments.appointmentDate) ? colors.yellow : colors.blue

        } as CalendarEvent;
      });
    })
  }

  populatePhysiciansAppoitments(startDate: string, endDate: string) {
    this.appointmentService.getAppointmentToPhysician(19, startDate, endDate).subscribe(val => {
      //console.log(val);
      this.appointments = val;
      this.events = val.map((appointments: Appointment) => {
        return {
          start: new Date(
            convertStringToDate(appointments.appointmentDate).getUTCFullYear(),
            convertStringToDate(appointments.appointmentDate).getUTCMonth(),
            convertStringToDate(appointments.appointmentDate).getUTCDate(),
            parseInt(appointments.appointmentStartTime.split(':')[0]),
            parseInt(appointments.appointmentStartTime.split(':')[1]), 0, 0
          ),

          end: new Date(
            convertStringToDate(appointments.appointmentDate).getUTCFullYear(),
            convertStringToDate(appointments.appointmentDate).getUTCMonth(),
            convertStringToDate(appointments.appointmentDate).getUTCDate(),
            parseInt(appointments.appointmentEndTime.split(':')[0]),
            parseInt(appointments.appointmentEndTime.split(':')[1]), 0, 0
          ),

          title: appointments.meetingTitle,
          color: isTodaysDate(appointments.appointmentDate) ? colors.yellow : colors.blue

        } as CalendarEvent;
      });
    })
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

  events: CalendarEvent[] = [
  ];

  closeOpenMonthViewDay() {
    let role = 'physician'
    if (role === 'patient') {
      this.populatePatientsAppointments(dateToString(getFirstDayofWeek(this.viewDate)), 
            dateToString(getLastDayofWeek(this.viewDate)));
    }
    else {
      this.populatePhysiciansAppoitments(dateToString(getFirstDayofWeek(this.viewDate)),
            dateToString(getLastDayofWeek(this.viewDate)));
    }
    this.activeDayIsOpen = false;
  }
  hourSegmentClicked(date: Date,content) {
    
    this.modal.open(content);
    this.bookingForm.get('appointmentDate').setValue(formatDate(date));
    this.bookingForm.get('appointmentStartTime').setValue(date.toLocaleTimeString());
    date.setTime((date.getTime() + (30 * 60 * 1000)));
    this.bookingForm.get('appointmentEndTime').setValue(date.toLocaleTimeString());
    
  } 
  submitted=false;

  book(){
    console.log("inside")
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }
    
    let newAppointment: Appointment = this.bookingForm.value;
    // TODO: sender id is hardcoded for now . would be fetched from session
    this.appointmentService.bookAppointment(newAppointment).subscribe(
      data => {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 5000 })
      },
      error => {
        this.toastService.show('Server Error please try later', { classname: 'bg-danger text-light', delay: 5000 });
      })
  }

}

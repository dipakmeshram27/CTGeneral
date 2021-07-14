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
import { LoginService } from 'src/app/service/login/login-service';
import { UserRole } from 'src/app/utils/constants';
import { UserLogin } from 'src/app/model/userlogin';
import { Router } from '@angular/router';

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
   isAppointmentToPhysician : boolean;
   isAppointmentToPatient : boolean;
   isNewAppointment : boolean;
   selectedAppointmentId: number;
  // isAppointmentUpdated :boolean;
  constructor(
    private modal: NgbModal,
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private noteService: NotesService,
    private loginService:LoginService,
    private router: Router
  ) {
    // this.bookingForm = this.formBuilder.group({
    //   physicianId: [''],
    //   patientId: [''], 
    // });
      }
  appointments = [];
  visitAppoitment = [];
  activeDayIsOpen: boolean = true;
  // hourColumns: WeekViewHourColumn[];
  selectedDate: Date = null;

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


    this.isAppointmentToPhysician = this.loginService.userRole === UserRole.PATIENT || this.loginService.userRole === UserRole.NURSE
    this.isAppointmentToPatient = this.loginService.userRole === UserRole.PHYSICIAN || this.loginService.userRole === UserRole.NURSE

    UserRole.PHYSICIAN === this.loginService.userRole;
  
    if (this.loginService.userRole === UserRole.PATIENT) {
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
    if(UserRole.PHYSICIAN === this.loginService.userRole)
    {
      this.noteService.getUsersByRole(UserRole.PATIENT).subscribe((val) => {
        this.patients = val;
      });
    }
    else if(UserRole.NURSE === this.loginService.userRole){
      this.noteService.getUsersByRole(UserRole.PATIENT).subscribe((val) => {
        console.log(val);
      });
      this.noteService.getUsersByRole(UserRole.PHYSICIAN).subscribe((val) => {
        console.log(val);
      });
    }
    else{
      this.noteService.getUsersByRole(UserRole.PATIENT).subscribe((val) => {
        this.physicians = val;
      });
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
    this.appointmentService
      .getAppointmentToPatient(parseInt(localStorage.getItem('id')), startDate, endDate)
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
            id: appointments.appointmentId,
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
      .getAppointmentToPhysician(parseInt(localStorage.getItem('id')), startDate, endDate)
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
            id: appointments.appointmentId,
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

  closeOpenMonthViewDay() {
    UserRole.PHYSICIAN === this.loginService.userRole;
    if (this.loginService.userRole === UserRole.PATIENT) {
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
    this.isNewAppointment = true;
    this.modal.open(content, {'size': 'md'});
    this.bookingForm.get('appointmentDate').setValue(formatDate(date));
    var options = { hour12: false };
    console.log(date.toLocaleString('en-US', options));
   
    this.bookingForm
      .get('appointmentStartTime')
      .setValue(date.toLocaleTimeString('en-US', options));
    date.setTime(date.getTime() + 30 * 60 * 1000);
   
    this.bookingForm
      .get('appointmentEndTime')
      .setValue(date.toLocaleTimeString('en-US', options));
  }
  submitted = false;

  get f() { return this.bookingForm.controls; }

  book() {
   
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }
   
    let newAppointment: Appointment = this.bookingForm.value;

    //setting physician id from storage if logged in user is physician
    if (UserRole.PHYSICIAN === this.loginService.userRole) {
      newAppointment.physicianId = parseInt(localStorage.getItem('id'));
    }

    // setting patient id from storage if logged in user is patient.
    // For nurse, we have both dropdowns to select both physician and patient
    if (UserRole.PATIENT === this.loginService.userRole) {
      newAppointment.patientId = parseInt(localStorage.getItem('id'));
    }

    // TODO: sender id is hardcoded for now . would be fetched from session
    this.appointmentService.bookAppointment(newAppointment).subscribe(
      (data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 5000,
        })
        UserRole.PHYSICIAN === this.loginService.userRole;
  
        if (this.loginService.userRole === UserRole.PATIENT) {
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
      },
      
      (error) => {
        this.toastService.show('Server Error please try later', {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
    if (this.modal.hasOpenModals()) {
      this.modal.dismissAll();
    }
  }

  handleEvent(action: string, event: CalendarEvent, content): void {
    this.isNewAppointment = false;
    this.selectedAppointmentId = parseInt(event.id.toString());
    this.appointmentService.getAppointmentById(parseInt(event.id.toString())).subscribe(val => {
      this.bookingForm.get('meetingTitle').setValue(val.meetingTitle);
      this.bookingForm.get('description').setValue(val.description);
      this.bookingForm.get('patientId').setValue(val.patientId);
      this.bookingForm.get('physicianId').setValue(val.physicianId);
      this.bookingForm.get('appointmentDate').setValue(val.appointmentDate);
      this.bookingForm.get('appointmentStartTime').setValue(val.appointmentStartTime);
      this.bookingForm.get('appointmentEndTime').setValue(val.appointmentEndTime);
    })
    this.modalData = { event, action };
    console.log(this.modalData);
    this.modal.open(content, { size: 'md' });
    // Calling get appointment details API
    
  }

  updateAppointment() {
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }
   
    let newAppointment: Appointment = this.bookingForm.value;
    newAppointment.appointmentId = this.selectedAppointmentId;

    //setting physician id from storage if logged in user is physician
    if (UserRole.PHYSICIAN === this.loginService.userRole) {
      newAppointment.physicianId = parseInt(localStorage.getItem('id'));
    }

    // setting patient id from storage if logged in user is patient.
    // For nurse, we have both dropdowns to select both physician and patient
    if (UserRole.PATIENT === this.loginService.userRole) {
      newAppointment.patientId = parseInt(localStorage.getItem('id'));
    }

    // TODO: sender id is hardcoded for now . would be fetched from session
    this.appointmentService.updateAppointment(newAppointment).subscribe(
      (data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 5000,
        })
        UserRole.PHYSICIAN === this.loginService.userRole;
  
        if (this.loginService.userRole === UserRole.PATIENT) {
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
      },
      
      (error) => {
        this.toastService.show('Server Error please try later', {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
    if (this.modal.hasOpenModals()) {
      this.modal.dismissAll();
    }
  }

  goToVisit() {
    if (this.modal.hasOpenModals()) {
      this.modal.dismissAll();
    }
    //TODO: Navigate to correct patient visit page by sending appointment id
    this.router.navigate(['note']);
  }
}

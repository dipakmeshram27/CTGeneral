import { Time } from "@angular/common";

export class Appointment {
    appointmentId :number;
	meetingTitle :string;
	description:string;
	hysicianId :number;
	patientId :number;
    appointmentDate: string;
    appointmentStartTime: string;
    appointmentEndTime: string;
    edit_id: number;
}

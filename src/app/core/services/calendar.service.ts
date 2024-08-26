import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private appointmentsSource = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointmentsSource.asObservable();

  addAppointment(appointment: Appointment) {
    const currentAppointments = this.appointmentsSource.value;
    this.appointmentsSource.next([...currentAppointments, appointment]);
  }

  updateAppointment(updatedAppointment: Appointment) {
    const currentAppointments = this.appointmentsSource.value.map(appointment =>
      appointment.uuid === updatedAppointment.uuid ? updatedAppointment : appointment
    );
    this.appointmentsSource.next(currentAppointments);
  }

  deleteAppointment(uuid: string) {
    const currentAppointments = this.appointmentsSource.value.filter(appointment => appointment.uuid !== uuid);
    this.appointmentsSource.next(currentAppointments);
  }
}

// Interface usada para criaçao de um agendamento (Data Transfer Object)
export default interface ICreateAppointmentDTO {
  user_id: string;
  provider_id: string;
  date: Date;
}

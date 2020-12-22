// Interface usada para encontrar todos os agendamentos de um dia específico (Data Transfer Object)
export default interface IFindAllInDayFromProviderDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

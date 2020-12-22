// Interface usada para encontrar todos os agendamentos de um mes específico (Data Transfer Object)
export default interface IFindAllInMonthFromProviderDTO {
  provider_id: string;
  month: number;
  year: number;
}

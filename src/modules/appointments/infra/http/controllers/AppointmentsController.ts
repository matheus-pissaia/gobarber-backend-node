import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

// Controller responsável por criar um agendamento:
export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Para realizar um agendamento, o usuário precisa estar logado:
    const user_id = request.user.id;

    // Dados requisitados do front-end para marcar o agendamento:
    const { provider_id, date } = request.body;

    // Chamamos o 'Service' responsável por criar o agendamento utilizando injeçao de dependência:
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    // Retornamos para o front-end um json com o agendamento criado:
    return response.json(appointment);
  }
}

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

// Com isso garantimos que as rotas de perfil serão acessíveis somente se o usuário estiver logado:
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.string(),
      new_password_confirmation: Joi.string().valid(Joi.ref('new_password')),
    },
  }),
  profileController.update,
);

export default profileRouter;

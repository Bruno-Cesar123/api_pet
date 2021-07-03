import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PetsController from '../controllers/PetsController';
import PetAvatarController from '../controllers/PetAvatarController';

const petsRouter = Router();
const petsController = new PetsController();
const petAvatarController = new PetAvatarController();

const upload = multer(uploadConfig.multer);
petsRouter.use(ensureAuthenticated);

petsRouter.patch(
  '/avatar/:id',
  ensureAuthenticated,
  upload.single('avatar'),
  petAvatarController.update,
);

petsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      pet_id: Joi.string().uuid().required(),
      age: Joi.number().required(),
      description: Joi.string(),
    },
  }),
  petsController.create,
);
petsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  petsController.delete,
);
petsRouter.get('/', petsController.index);
petsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  petsController.update,
);
petsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  petsController.show,
);

export default petsRouter;

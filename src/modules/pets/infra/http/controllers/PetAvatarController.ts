import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdatePetAvatarService from '@modules/pets/services/UpdatePetAvatarService';

export default class PetAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updatePetAvatar = container.resolve(UpdatePetAvatarService);

    const pet = await updatePetAvatar.execute({
      pet_id: id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(pet));
  }
}

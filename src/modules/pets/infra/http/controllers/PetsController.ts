import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreatePetService from '@modules/pets/services/CreatePetService';
import DeletePetService from '@modules/pets/services/DeletePetService';
import ListPetsService from '@modules/pets/services/ListPetsService';
import UpdatePetService from '@modules/pets/services/UpdatePetService';
import ShowPetService from '@modules/pets/services/ShowPetService';

export default class PetsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, pet_id, age, description } = request.body;

    const createPet = container.resolve(CreatePetService);

    const pet = await createPet.execute({
      name,
      pet_id,
      age,
      description,
    });

    return response.json(pet);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const pet = container.resolve(DeletePetService);

    await pet.execute({
      id,
    });

    return response.json({ message: 'delete succefully' });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const pet_id = request.user.id;

    const Showpet = container.resolve(ListPetsService);

    const pet = await Showpet.execute({
      pet_id,
    });

    return response.json(classToClass(pet));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;
    const { name, age, description } = request.body;

    const updatePet = container.resolve(UpdatePetService);

    const pet = await updatePet.execute({
      id,
      pet_id: user_id,
      name,
      age,
      description,
    });

    return response.json(pet);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPet = container.resolve(ShowPetService);

    const pet = await showPet.execute({ id });

    return response.json(pet);
  }
}

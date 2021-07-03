import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/Pet';
import IPetsRepository from '../repositories/IPetsRepository';

interface IRequest {
  id: string;
  name: string;
  age: number;
  pet_id: string;
  description: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({
    id,
    name,
    age,
    pet_id,
    description,
  }: IRequest): Promise<User> {
    const pet = await this.petsRepository.findPetId(id);

    if (!pet) {
      throw new AppError('Pet not found.');
    }
    pet.name = name;
    pet.age = age;
    pet.pet_id = pet_id;
    pet.description = description;

    return this.petsRepository.save(pet);
  }
}

export default UpdateProfileService;

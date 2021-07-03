import { injectable, inject } from 'tsyringe';
import Pet from '../infra/typeorm/entities/Pet';
import IPetsRepository from '../repositories/IPetsRepository';

interface IRequest {
  name: string;
  pet_id: string;
  age: number;
  description: string;
}

@injectable()
class CreatePetService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({
    name,
    pet_id,
    age,
    description,
  }: IRequest): Promise<Pet> {
    const pet = await this.petsRepository.create({
      name,
      pet_id,
      age,
      description,
    });

    return pet;
  }
}

export default CreatePetService;

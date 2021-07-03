import { injectable, inject } from 'tsyringe';
import Pet from '../infra/typeorm/entities/Pet';

import IPetsRepository from '../repositories/IPetsRepository';

interface IRequest {
  pet_id: string;
}

@injectable()
class ListPetsService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({ pet_id }: IRequest): Promise<Pet[] | undefined> {
    const pets = await this.petsRepository.findPets(pet_id);

    return pets;
  }
}

export default ListPetsService;

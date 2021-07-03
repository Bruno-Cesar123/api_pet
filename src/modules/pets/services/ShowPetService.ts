import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Pet from '../infra/typeorm/entities/Pet';

import IPetsRepository from '../repositories/IPetsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowPetService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Pet> {
    const pet = await this.petsRepository.findPetId(id);

    if (!pet) {
      throw new AppError('Pet does not exists', 401);
    }

    return pet;
  }
}

export default ShowPetService;

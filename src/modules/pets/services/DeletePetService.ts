import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IPetsRepository from '../repositories/IPetsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeletePetService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const pet = await this.petsRepository.findPetId(id);

    if (!pet) {
      throw new AppError('Pet does not exists', 401);
    }

    await this.petsRepository.delete(pet);
  }
}

export default DeletePetService;

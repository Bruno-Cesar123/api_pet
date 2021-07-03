import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import Pet from '../infra/typeorm/entities/Pet';
import IPetsRepository from '../repositories/IPetsRepository';

interface IRequest {
  pet_id: string;
  avatarFilename: string;
}

@injectable()
class UptadePetAvatarService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ pet_id, avatarFilename }: IRequest): Promise<Pet> {
    const pet = await this.petsRepository.findPetId(pet_id);

    if (!pet) {
      throw new AppError(
        'Only authenticated users can change avatar from pet.',
        401,
      );
    }

    if (pet.avatar) {
      await this.storageProvider.deleteFile(pet.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    pet.avatar = fileName;

    await this.petsRepository.save(pet);

    return pet;
  }
}

export default UptadePetAvatarService;

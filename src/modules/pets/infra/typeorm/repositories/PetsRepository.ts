import { getRepository, Repository } from 'typeorm';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

import Pet from '../entities/Pet';

class PetsRepository implements IPetsRepository {
  private ormRepository: Repository<Pet>;

  constructor() {
    this.ormRepository = getRepository(Pet);
  }

  public async findPets(pet_id: string): Promise<Pet[]> {
    const pets = await this.ormRepository.find({
      where: { pet_id },
    });

    return pets;
  }

  public async findPetId(id: string): Promise<Pet | undefined> {
    const pet = await this.ormRepository.findOne(id);

    return pet;
  }

  public async create({
    name,
    pet_id,
    age,
    description,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = this.ormRepository.create({ name, pet_id, age, description });

    await this.ormRepository.save(pet);

    return pet;
  }

  public async delete(pet: Pet): Promise<void> {
    await this.ormRepository.delete(pet);
  }

  public async save(pet: Pet): Promise<Pet> {
    return this.ormRepository.save(pet);
  }
}

export default PetsRepository;

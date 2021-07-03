import { v4 as uuid } from 'uuid';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

import Pet from '../../infra/typeorm/entities/Pet';

class FakePetsRepository implements IPetsRepository {
  private pets: Pet[] = [];

  public async findPetId(id: string): Promise<Pet | undefined> {
    const FindPet = this.pets.find(pet => pet.id === id);
    return FindPet;
  }

  public async findPets(pet_id: string): Promise<Pet[]> {
    const pets = this.pets.filter(pet => pet.pet_id === pet_id);
    return pets;
  }

  public async delete(pet: Pet): Promise<void> {
    const pets = this.pets.indexOf(pet);
    this.pets.splice(pets);
  }

  public async create({
    name,
    pet_id,
    age,
    description,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = new Pet();

    Object.assign(pet, { id: uuid(), name, pet_id, age, description });

    this.pets.push(pet);

    return pet;
  }

  public async save(pet: Pet): Promise<Pet> {
    const findIndex = this.pets.findIndex(findPet => findPet.id === pet.id);

    this.pets[findIndex] = pet;

    return pet;
  }
}

export default FakePetsRepository;

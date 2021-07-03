import Pet from '../infra/typeorm/entities/Pet';
import ICreatePetDTO from '../dtos/ICreatePetDTO';

export default interface IPetsRepository {
  create(data: ICreatePetDTO): Promise<Pet>;
  findPets(pet_id: string): Promise<Pet[]>;
  findPetId(id: string): Promise<Pet | undefined>;
  delete(pet: Pet): Promise<void>;
  save(pet: Pet): Promise<Pet>;
}

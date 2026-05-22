export abstract class BaseRepository<T> {
  abstract create(data: T): Promise<any>;
  abstract findById(id: number): Promise<any>;
}
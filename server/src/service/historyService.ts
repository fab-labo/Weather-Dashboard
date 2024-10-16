import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(
    name: string,
    id: string) {
      this.name = name;
      this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read(): Promise<any[]> {
    try {
      const data = await fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {    
    try {
      await fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(cities));
    } catch (error) {
      console.error(error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<void> {
    const cities = await this.getCities();
    const newCity = new City(cityName, this.generateId());
    cities.push(newCity);
    await this.write(cities);
  }
  generateId(): string {
    throw new Error('Method not implemented.');
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();

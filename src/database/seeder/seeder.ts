import { User } from '../../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Role } from '../../users/entities/role.entity';
import { UserDetail } from '../../users/entities/user-detail.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'dignitas_app',
  entities: [User, UserDetail, Role],
});

export function createMany(number: number, callBack: Function) {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
      console.log('Inserting database...');
      for (let i = 1; i <= number; i++) {
        callBack(i);
      }
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    })
    .finally(() => {
      console.log('insert is completed');
    });
}

export function create(callBack: Function) {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
      console.log('inserting database...');
      callBack();
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    })
    .finally(() => {
      console.log('insert is completed');
    });
}

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

console.log(process.env.DB_HOST)


const config: MysqlConnectionOptions = {
  type: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  entities: ['dist/src/entities/**/*.entity.js'],
  synchronize: false,
  migrations: [
    'dist/src/db/migrations/*.js'
  ],
  cli: {
    migrationsDir: 'src/db/migrations'
  }
}


export default config;
import { Dialect, Sequelize } from 'sequelize';
import { dbDialect, dbHost, dbName, dbPassword, dbPort, dbUsername } from '../configs/credentials';

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    logging: false, // Loggin Queries to console.
    port: +dbPort,
    dialect: dbDialect as Dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

export default sequelize;
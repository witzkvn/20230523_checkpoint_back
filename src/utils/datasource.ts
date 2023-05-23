import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [],
    logging: true,
});

export default dataSource;

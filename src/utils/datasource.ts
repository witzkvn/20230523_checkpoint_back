import { DataSource } from "typeorm";
import { Country } from "../entities/country";

const dataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [Country],
    logging: true,
});

export default dataSource;

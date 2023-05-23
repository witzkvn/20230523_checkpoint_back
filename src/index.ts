import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server";
import { buildSchema } from "type-graphql";
import dataSource from "./utils/datasource";
import { CountriesResolver } from "./resolvers/countriesResolver";

const port = 5050;

async function start(): Promise<void> {
    try {
        await dataSource.initialize();

        const schema = await buildSchema({
            resolvers: [CountriesResolver],
        });

        const server = new ApolloServer({
            schema,
        });

        try {
            const { url }: { url: string } = await server.listen({ port });
            console.log(`🚀  Server ready at ${url}`);
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log("Error while launching the server");
        console.log(error);
    }
}

start();

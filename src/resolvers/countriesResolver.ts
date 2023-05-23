import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/country";
import dataSource from "../utils/datasource";

@Resolver(Country)
export class CountriesResolver {
    @Query(() => Country)
    async getCountryByCode(@Arg("code") code: string): Promise<Country> {
        const country = await dataSource
            .getRepository(Country)
            .findOneByOrFail({ code });

        return country;
    }

    @Query(() => [Country])
    async getAllCountries(): Promise<Country[]> {
        const countries = await dataSource.getRepository(Country).find();

        return countries;
    }

    @Mutation(() => Country)
    async addCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string
    ): Promise<Country> {
        const createdCountry = await dataSource.getRepository(Country).save({
            code,
            emoji,
            name,
        });

        return createdCountry;
    }
}

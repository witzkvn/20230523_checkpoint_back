import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/country";
import dataSource from "../utils/datasource";
import { continentsCodes } from "../enums/continentsCodes";

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

    @Query(() => [Country])
    async getCountriesByContinentCode(
        @Arg("continentCode") continentCode: string
    ): Promise<Country[]> {
        const validatedContinentCode = continentCode as continentsCodes;

        const countries = await dataSource.getRepository(Country).find({
            where: {
                continentCode: validatedContinentCode,
            },
        });

        return countries;
    }

    @Mutation(() => Country)
    async addCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string,
        @Arg("continentCode") continentCode: string
    ): Promise<Country> {
        const validatedContinentCode = continentCode as continentsCodes;

        const createdCountry = await dataSource.getRepository(Country).save({
            code,
            emoji,
            name,
            continentCode: validatedContinentCode,
        });

        return createdCountry;
    }
}

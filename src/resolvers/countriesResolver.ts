import { Query, Resolver } from "type-graphql";

@Resolver()
export class CountriesResolver {
    @Query(() => Boolean)
    test() {
        return true;
    }
}

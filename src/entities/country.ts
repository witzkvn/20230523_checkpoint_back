import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ICountry } from "../interfaces/entities/ICountry";
import { Length, MinLength } from "class-validator";
import { continentsCodes } from "../enums/continentsCodes";

@ObjectType()
@Entity()
export class Country implements ICountry {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    @Length(2, 4, {
        message: "The country code must contain between 2 and 4 characters.",
    })
    code!: string;

    @Field()
    @Column({ unique: true })
    @MinLength(2, {
        message: "The country name must contain at least 2 characters.",
    })
    name!: string;

    @Field()
    @Column({ unique: true })
    @Length(1, 1, { message: "You have to provide exactly 1 emoji." })
    emoji!: string;

    @Field()
    @Column({
        type: "varchar",
        length: 2,
        enum: continentsCodes,
    })
    continentCode!: continentsCodes;
}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class CinemaSystem1663877813247 implements MigrationInterface {
	/**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "films" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id")
            )
        `)
		await queryRunner.query(`
            CREATE TABLE "seat-type" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "pricePercentage" numeric(10, 2) NOT NULL DEFAULT '0',
                "name" character varying NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e4a82b765c90acd2fef8f14ca19" PRIMARY KEY ("id")
            )
        `)
		await queryRunner.query(`
            CREATE TABLE "seats" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "seatTypeId" uuid NOT NULL,
                "cinemaId" uuid NOT NULL,
                CONSTRAINT "PK_3fbc74bb4638600c506dcb777a7" PRIMARY KEY ("id")
            )
        `)
		await queryRunner.query(`
            CREATE TABLE "cinemas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_5c49a5f87710ce93fad49d72320" PRIMARY KEY ("id")
            )
        `)
		await queryRunner.query(`
            CREATE TABLE "shows" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "price" numeric(10, 2) NOT NULL DEFAULT '0',
                "name" character varying NOT NULL,
                "start" TIMESTAMP NOT NULL,
                "end" TIMESTAMP NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "filmId" uuid NOT NULL,
                "cinemaId" uuid NOT NULL,
                CONSTRAINT "PK_db2b12161dbc5081c4f50025669" PRIMARY KEY ("id")
            )
        `)
		await queryRunner.query(`
            CREATE TABLE "bookings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "showId" character varying NOT NULL,
                "seatId" character varying NOT NULL,
                "userId" character varying NOT NULL,
                CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")
            )
        `)
		await queryRunner.query(`
            ALTER TABLE "seats"
            ADD CONSTRAINT "FK_8f3fedf23876fad63dae468bc3a" FOREIGN KEY ("seatTypeId") REFERENCES "seat-type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
		await queryRunner.query(`
            ALTER TABLE "seats"
            ADD CONSTRAINT "FK_bbeda9d215f334ffcd71a4b47d8" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
		await queryRunner.query(`
            ALTER TABLE "shows"
            ADD CONSTRAINT "FK_49697ac3649f5dce32dc662169c" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
		await queryRunner.query(`
            ALTER TABLE "shows"
            ADD CONSTRAINT "FK_562f8389f0b78c201affbc00e02" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "shows" DROP CONSTRAINT "FK_562f8389f0b78c201affbc00e02"
        `)
		await queryRunner.query(`
            ALTER TABLE "shows" DROP CONSTRAINT "FK_49697ac3649f5dce32dc662169c"
        `)
		await queryRunner.query(`
            ALTER TABLE "seats" DROP CONSTRAINT "FK_bbeda9d215f334ffcd71a4b47d8"
        `)
		await queryRunner.query(`
            ALTER TABLE "seats" DROP CONSTRAINT "FK_8f3fedf23876fad63dae468bc3a"
        `)
		await queryRunner.query(`
            DROP TABLE "bookings"
        `)
		await queryRunner.query(`
            DROP TABLE "shows"
        `)
		await queryRunner.query(`
            DROP TABLE "cinemas"
        `)
		await queryRunner.query(`
            DROP TABLE "seats"
        `)
		await queryRunner.query(`
            DROP TABLE "seat-type"
        `)
		await queryRunner.query(`
            DROP TABLE "films"
        `)
	}
}

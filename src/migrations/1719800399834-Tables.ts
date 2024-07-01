import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1719800399834 implements MigrationInterface {
    name = 'Tables1719800399834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "passHash" character varying NOT NULL, "roles" integer NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "CHK_d0eb36b995e89b2bb903e248f7" CHECK ("roles" >= 0 AND "roles" <= 15), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tmp" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "passHash" character varying NOT NULL, "registrationCode" integer NOT NULL, CONSTRAINT "UQ_9464d96db690ddeeb489a824df7" UNIQUE ("username"), CONSTRAINT "UQ_4511666626c3de6b3faae784a84" UNIQUE ("email"), CONSTRAINT "PK_6f325318fe452a944033ad6170a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "publicationDate" TIMESTAMP NOT NULL, "authorId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_genres_genre" ("bookId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_75a197f32ed39286c5c39198ece" PRIMARY KEY ("bookId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId") `);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_genres_genre" ADD CONSTRAINT "FK_31d658e0af554165f4598158c55" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_genres_genre" ADD CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1"`);
        await queryRunner.query(`ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_31d658e0af554165f4598158c55"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83bd32782d44d9db3d68c3f58c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31d658e0af554165f4598158c5"`);
        await queryRunner.query(`DROP TABLE "book_genres_genre"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "user_tmp"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentRefactor1748883610123 implements MigrationInterface {
  // instruct what needs to be changed and how
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" RENAME COLUMN "name" to "title"`,
    );
  }

  // undo or rollback any of those chnages, just in case an issue comes up
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" RENAME COLUMN "title" to "name"`,
    );
  }
}

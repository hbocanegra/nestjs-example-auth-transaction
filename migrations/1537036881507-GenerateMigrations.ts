import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateMigrations1537036881507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(255) NOT NULL, `username` varchar(50) NOT NULL, `password` varchar(100) NULL, `passwordHash` varchar(100) NULL, `email` varchar(500) NOT NULL, `facilityId` varchar(255) NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `photo` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(500) NOT NULL, `description` text NOT NULL, `filename` varchar(255) NOT NULL, `views` int NOT NULL, `isPublished` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_e1bc39538195a989607297a0f2b` FOREIGN KEY (`facilityId`) REFERENCES `facility`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_e1bc39538195a989607297a0f2b`");
        await queryRunner.query("DROP TABLE `photo`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}

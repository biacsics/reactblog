import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export default class Blog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    publishedAt!: Date;
}

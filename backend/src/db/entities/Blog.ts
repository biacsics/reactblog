import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export default class Blog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    content!: string;

    // https://github.com/typeorm/typeorm/issues/5841
    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
    })
    publishedAt!: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
    })
    modifiedAt!: Date;

}

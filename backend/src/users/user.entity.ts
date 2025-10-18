import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // <-- add !

  @Column({ unique: true })
  username!: string; // <-- add !

  @Column()
  passwordHash!: string; // <-- add !

  @CreateDateColumn()
  createdAt!: Date; // <-- add !
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id!: number; // primary key

  @Column({ unique: true })
  slug!: string;

  @Column()
  longUrl!: string;

  @Column({ default: 0 })
  clicks!: number;

  @Column()
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}

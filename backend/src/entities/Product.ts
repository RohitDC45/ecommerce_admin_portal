import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Image } from "./Image";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sku!: string;

  @Column()
  name!: string;

  @Column("decimal")
  price!: number;

  @OneToMany(() => Image, image => image.product, { cascade: true, eager: true })
  images!: Image[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
  product!: Product;
}

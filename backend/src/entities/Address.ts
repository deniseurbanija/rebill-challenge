import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  extraInfo: string;

  @Column()
  type: 'billing' | 'shipping' | 'billing-shipping';

  @Column({ default: false })
  sameAsBilling: boolean;
}

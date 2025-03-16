import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column({ nullable: true })
  state?: string; // Opcional, algunos países no tienen estados

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  postalCode?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  streetNumber?: string;

  @Column({ nullable: true })
  neighborhood?: string;
}

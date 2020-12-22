/* eslint-disable camelcase */
// Arquivo responsável por estruturar o 'Appointment'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

/**
 * Tipos de Relacionamento:
 * 1. Um para Um (OneToOne)
 * 2. Um para Muitos (OneToMany)
 * 3. Muitos para Muitos (ManyToMany)
 */

// Uso de 'Decorator' (o '@') para fazer uma marcação afim do banco de dados entender os arquivos que devem ser criados e o seu uso
@Entity('appointments')
class Appointment {
  // Coluna do id marcada de forma 'especial' (PrimaryGeneratedColumn)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Coluna do provider
  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Coluna da data
  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;

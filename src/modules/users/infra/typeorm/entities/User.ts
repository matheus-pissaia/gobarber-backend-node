/* eslint-disable camelcase */
// Arquivo responsável por estruturar o 'User'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

// Uso de 'Decorator' (o '@') para fazer uma marcação afim do banco de dados entender os arquivos que devem ser criados e o seu uso
@Entity('users')
class User {
  // Coluna do id marcada de forma 'especial' (PrimaryGeneratedColumn)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Coluna do nome do usuário ou do presatador de serviço
  @Column()
  name: string;

  // Coluna do email
  @Column()
  email: string;

  // Coluna da senha
  // Com a opçao 'Exclude' garantimos que a senha nao seja retornada para o front-end ou API
  @Column()
  @Exclude()
  password: string;

  // Coluna do avatar
  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // A configuraçao 'Expose' expõe o caminho onde se encontra o aqruivo do avatar, nesse caso é na nossa máquina
  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;

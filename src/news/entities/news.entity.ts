import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity()
export class News extends CommonEntity {
  @Column()
  public title: string;

  @Column()
  public desc: string;
}

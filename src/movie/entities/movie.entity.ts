import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity()
export class Movie extends CommonEntity {
  @Column()
  public adult: boolean;

  @Column()
  public title: string;

  @Column()
  public date: string;

  @Column()
  public video: boolean;

  @Column()
  public voteCount: number;
}

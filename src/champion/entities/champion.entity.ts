import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { string } from '@hapi/joi';

@Entity()
export class Champion extends CommonEntity {
  @Column()
  public champion: string;

  @Column({ type: 'float' })
  public KDA: number;

  @Column()
  public wins_rate: string;

  @Column()
  public pick_rate: string;

  @Column()
  public ban_rate: string;

  @Column({ type: 'float' })
  public cs: number;

  @Column({ type: 'integer' })
  public gold: number;

  @Column({ length: 10, default: 'na' }) // 최대 길이 10, 기본값 'na'
  public tag: string;
}

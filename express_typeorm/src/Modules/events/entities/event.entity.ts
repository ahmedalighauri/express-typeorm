import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Workshop } from './workshop.entity'

@Entity()
export class Event extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ type: 'datetime' })
	createdAt: string

	@OneToMany(() => Workshop, (workshops) => workshops.event)
	workshops: Workshop[]
}

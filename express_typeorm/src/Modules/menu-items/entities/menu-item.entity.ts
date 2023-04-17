import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MenuItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	url: string

	@Column({ type: 'integer', default: null })
	parentId: number

	@Column({ type: 'datetime' })
	createdAt: string

	@ManyToOne(() => MenuItem, (parent) => parent.children)
	parent: MenuItem

	@OneToMany(() => MenuItem, (menuItem) => menuItem.parent, {
		eager: true,
	})
	children: MenuItem[]
}

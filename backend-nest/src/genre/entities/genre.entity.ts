import { Serie } from "src/serie/entities/serie.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "type" })
    type: string;

    @Column({ name: "description" })
    description: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @ManyToMany(() => Serie, serie => serie.genres)
    series: Serie[];
}

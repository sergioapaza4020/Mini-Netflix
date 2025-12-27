import { Serie } from "src/serie/entities/serie.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "title" })
    title: string;

    @Column({ name: "duration_seconds" })
    durationSeconds: number;

    @Column({ name: "episode_number" })
    episodeNumber: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @ManyToOne(() => Serie, serie => serie.episodes)
    serie: Serie;
}

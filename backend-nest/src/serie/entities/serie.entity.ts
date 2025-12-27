import { Episode } from "src/episode/entities/episode.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Serie {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "title", unique: true })
    title: string;

    @Column({ name: "synopsis" })
    synopsis: string;

    @Column({ name: "url_portrait" })
    urlPortrait: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToMany(() => Episode, episode => episode.serie)
    episodes: Episode[]
}
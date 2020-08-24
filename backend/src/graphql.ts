
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    refresh(accessToken: string, refreshToken: string): Auth | Promise<Auth>;
    login(login: string, password: string): Auth | Promise<Auth>;
    info(): Info | Promise<Info>;
    skills(): Skill[] | Promise<Skill[]>;
    skill(id: string): Skill | Promise<Skill>;
    works(): Work[] | Promise<Work[]>;
    work(id: string): Work | Promise<Work>;
}

export interface Auth {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface Info {
    user: User;
}

export interface IMutation {
    deleteSkillById(id: string): Skill | Promise<Skill>;
    createSkill(title: string, percents: number, category: string): Skill | Promise<Skill>;
    changeSkillById(title: string, percents: number, category: string, id: string): Skill | Promise<Skill>;
    deleteWorkById(id: string): Work | Promise<Work>;
    createWork(title: string, description: string, link: string, file: Upload): Work | Promise<Work>;
    changeWorkById(id: string, title: string, description: string, link: string, file?: Upload): Work | Promise<Work>;
}

export interface Skill {
    id: string;
    title: string;
    percents: number;
    category: string;
}

export interface User {
    id: number;
    login: string;
    password?: string;
}

export interface Work {
    id: number;
    title: string;
    description: string;
    link: string;
    image: string;
}

export type Upload = any;

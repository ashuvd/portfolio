import { ISkill } from "@/types";

export interface ISkillsState {
  loading: boolean;
  skill: ISkill,
  skills: ISkill[];
}

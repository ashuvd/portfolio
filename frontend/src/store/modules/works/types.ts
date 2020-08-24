import { IWork } from "@/types";

export interface IWorksState {
  loading: boolean;
  work: IWork,
  works: IWork[];
}

export interface IUser {
  id: number;
  login: string;
  accessToken: string;
  role: number;
}

export interface ISelect<T> {
  id: T;
  value: string;
}

export interface IWork {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

export interface ISkill {
  id: number;
  title: string;
  percents: number;
  category: string;
}

export interface ISkillDto {
  title: string;
  percents: number;
  category: string;
}

export interface IWorkDto {
  file: string;
  title: string;
  description: string;
  link: string;
}

export interface ILogin {
  login: string;
  password: string;
  submitHandler: () => void;
}

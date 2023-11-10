export interface IExercises {}

export interface IExercise {
  _id: string;
  id: string;
  name: string;
  image: string;
  isBest: boolean;
  type: string;
  raiting: number;
  video: string;
  description: string;
  muscleGroups: string[];
  mainGroup: string;
  mainGroupRu: string;
}

export interface IResponseArrExercises {
  message: string;
  result?: IExercise[];
}

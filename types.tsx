export interface IExercises {}

export interface IExercise {
  _id: string | undefined;
  id: string | undefined;
  name: string | undefined;
  image: string | undefined;
  isBest: boolean | undefined;
  type: string | undefined;
  raiting: number | undefined;
  video: string | undefined;
  description: string | undefined;
  muscleGroups: string[] | undefined;
  mainGroup: string | undefined;
  mainGroupRu: string | undefined;
}

export interface IResponseArrExercises {
  message: string;
  result?: IExercise[];
}

export interface IResponseOneExercise {
  message: string;
  result?: IExercise;
}

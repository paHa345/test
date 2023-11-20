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

export interface IUserSchema {
  email: String;
  name: String;
  password: String;
  workoutsArr?: String[];
}

export interface IWorkoutSchema {
  comments: String;
  date: Date;
  userId: String;
  name?: String;
  exercisesArr: String[];
}

export interface IExerciseSchema {
  id: String;
  name: String;
  image: String;
  isBest: Boolean;
  type: String;
  raiting: String;
  muscleGroups: String[];
  video: String;
  description: String;
  mainGroup: String;
  mainGroupRu: String;
  commentsArr?: String[];
}

export interface ICommentSchema {
  date: Date;
  score: Number;
  text: String;
  exerciseId: String;
  userId: String;
}

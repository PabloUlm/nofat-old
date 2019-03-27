export interface IRoutine {
  mode: string;
  week: number;
  workoutExercises: IWorkoutExercise[];
}

export interface IWorkoutExercise {
  workoutId: string;
  exerciseId: number;
  qty: number;
}

export interface IExercise {
  _id: string;
  id: number;
  name: string;
  difficulty: number;
  description: string;
  url: string;
}

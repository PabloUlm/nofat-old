export interface IRoutine {
  mode: string;
  week: number;
  exercises: IExercise[];
}

export interface IExercise {
  workoutId: string;
  exerciseId: number;
  qty: number;
}

export enum GameState {
  Idle = "idle",
  Playing = "playing",
  GameOver = "gameover",
  Paused = "paused",
}

let score = -1;
let gameState: GameState = GameState.Idle;

export const addScore = () => score++;
export const getScore = () => score;
export const setScore = (n: number) => (score = n);

export const getGameState = () => gameState;
export const setGameState = (state: GameState) => {
  gameState = state;
};

export const resetGameStatus = () => {
  score = -1;
  gameState = GameState.Idle;
};

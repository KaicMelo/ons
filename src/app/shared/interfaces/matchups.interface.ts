export interface IMatchups {
  id: string;
  player1: IPlayer;
  player2: IPlayer;
}

export interface IPlayer {
  id: string;
  name: string;
  win: number | any;
  value: number | any;
}

export interface IMessage {
  text: string;
  isGpt: boolean;
  info?: IInfoMessage
}

interface IInfoMessage {
  userScore: number;
  errors: string[];
  message: string;
}

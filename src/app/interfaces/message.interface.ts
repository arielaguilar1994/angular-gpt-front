export interface IMessage {
  text: string;
  isGpt: boolean;
  info?: IInfoMessage;
  audioUrl?: string | null;
}

interface IInfoMessage {
  userScore: number;
  errors: string[];
  message: string;
}

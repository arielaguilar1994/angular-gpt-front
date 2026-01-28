export interface IMessage {
  text: string;
  isGpt: boolean;
  info?: IInfoMessage;
  audioUrl?: string | null;
  imageInfo?: IImageInfo | null;
}

interface IInfoMessage {
  userScore: number;
  errors: string[];
  message: string;
}

interface IImageInfo {
  url: string;
  alt?: string;
}
import { Episode } from './episode.entity';

export class Podcast {
  id: number;
  title: string;
  rating: number;
  episodes: Episode[];
}

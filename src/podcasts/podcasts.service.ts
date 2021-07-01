import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  getOnePodcast(podcastID: string): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === +podcastID);
    if (!podcast) {
      throw new NotFoundException(`podcast with ID: ${podcastID} not found.`);
    }
    return podcast;
  }

  createPodcast(podcastData: Podcast) {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      rating: 0,
      episodes: [],
      ...podcastData,
    });
  }

  deletePodcast(podcastID: string) {
    this.getOnePodcast(podcastID);
    this.podcasts = this.podcasts.filter(
      (podcast) => podcast.id !== +podcastID,
    );
  }

  updatePodcast(podcastID: string, updatePodcastData: Podcast) {
    const podcast = this.getOnePodcast(podcastID);
    this.deletePodcast(podcastID);
    this.podcasts.push({
      ...podcast,
      ...updatePodcastData,
    });
  }

  getAllEpisodes(podcastID: string): Episode[] {
    const podcast = this.getOnePodcast(podcastID);
    return podcast.episodes;
  }

  getOneEpisode(podcastID: string, episodeID: string): Episode {
    const podcast = this.getOnePodcast(podcastID);
    const episode = podcast.episodes.find(
      (episode) => episode.id === +episodeID,
    );
    if (!episode) {
      throw new NotFoundException(`Episode with ID: ${episodeID} not found.`);
    }
    return episode;
  }

  createEpisode(podcastID: string, episodeData: Episode) {
    const podcast = this.getOnePodcast(podcastID);
    podcast.episodes.push({
      id: podcast.episodes.length + 1,
      rating: 0,
      ...episodeData,
    });
  }

  deleteEpisode(podcastID: string, episodeID: string) {
    this.getOneEpisode(podcastID, episodeID);
    const podcast = this.getOnePodcast(podcastID);
    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== +episodeID,
    );
  }

  updateEpisode(
    podcastID: string,
    episodeID: string,
    updateEpisodeData: Episode,
  ) {
    const podcast = this.getOnePodcast(podcastID);
    const episode = this.getOneEpisode(podcastID, episodeID);
    this.deleteEpisode(podcastID, episodeID);
    podcast.episodes.push({
      ...episode,
      ...updateEpisodeData,
    });
  }
}


export class Post {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  upVoteCount: number;
  latitude: number;
  longitude: number;

  constructor(
    id: number,
    name?: string,
    title?: string,
    description?: string,
    image?: string,
    upVoteCount?: number,
    latitude?: number,
    longitude?: number
  ) {
    this.id = id;
    this.name = name ?? '';
    this.title = title ?? '';
    this.description = description ?? '';
    this.image = image ?? '';
    this.upVoteCount = upVoteCount ?? 0;
    this.latitude = latitude ?? 37.27;
    this.longitude = longitude ?? 49.53;
  }
}

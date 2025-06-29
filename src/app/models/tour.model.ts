export interface Tour {
  id?: number;
  name: string;
  description: string;
  fromLocation: string;
  toLocation: string;
  transportType: string;
  distance: number;
  estimatedTime: string; // bleibt als string zB "PT2H" weil Angular nicht Duration Typ kennt
  routeImageUrl: string;
  popularity: number;
  childFriendliness: number;
}

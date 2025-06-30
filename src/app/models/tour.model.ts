export interface Tour {
  id?: number;
  name: string;
  description: string;
  fromLocation: string;
  toLocation: string;
  transportType: string;
  // Diese Felder sind optional (werden vom Backend berechnet):
  distance?: number;
  estimatedTime?: string;
  routeImageUrl?: string;
  fromLat?: number;
  fromLon?: number;
  toLat?: number;
  toLon?: number;
  popularity?: number;
  childFriendliness?: number;
}

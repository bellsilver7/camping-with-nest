export interface Campsite {
  id: string;
  title: string;
  description: string;
  status: CampsiteStatus;
}

export enum CampsiteStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

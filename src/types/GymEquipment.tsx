export interface GymEquipment {
  id: string;
  name: string;
  imageUrl: string;
  videoUrl: string | undefined;
  description: string;
  activityType: ActivityType;
}

export enum ActivityType {
  RUN = "RUN",
  WALK = "WALK",
  CYCLING = "CYCLING",
  OTHER = "OTHER",
}

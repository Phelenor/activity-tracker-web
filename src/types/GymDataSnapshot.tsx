export interface GymDataSnapshot {
  type: string;
  duration: number;
  distance: number;
  speed: number;
  avgSpeed: number;
  maxSpeed: number;
  heartRate: number;
  avgHeartRate: number;
  maxHeartRate: number;
  elevationGain: number;
  calories: number;
  equipmentId: string;
  equipmentName: string;
  userName: string;
  userImageUrl: string;
}

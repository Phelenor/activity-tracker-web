import React, { useEffect, useState } from "react";
import { GymDataSnapshot } from "../types/GymDataSnapshot";
import { GymEquipmentFinish } from "../types/GymEquipmentFinish";
import { formatTime } from "../utils/time_format";
import EmptyState from "./EmptyState";

const Dashboard: React.FC<{ userId: string }> = ({ userId }) => {
  const [data, setData] = useState<GymDataSnapshot[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/ws/activity/gym-dashboard/${userId}`);

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if ((message as GymDataSnapshot).equipmentName) {
          const snapshot = message as GymDataSnapshot;
          setData((prevData) => {
            const index = prevData.findIndex((item) => item.equipmentId === snapshot.equipmentId);
            if (index !== -1) {
              return prevData.map((item) => (item.equipmentId === snapshot.equipmentId ? snapshot : item));
            } else {
              return [...prevData, snapshot];
            }
          });
        } else {
          const finishSignal = message as GymEquipmentFinish;
          setData((prevData) => prevData.filter((item) => item.equipmentId !== finishSignal.equipmentId));
        }
      } catch (error) {
        setError("Error parsing message");
      }
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  const roundsToDecimals = (num: number, decimals: number) =>
    Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      {data.length === 0 ? (
        <EmptyState text="No exercisers connected." />
      ) : (
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <div key={item.equipmentId} className="p-4 bg-white rounded-xl shadow-md border-2 border-primary-light">
            <div className="flex items-center mb-4">
              <img src={item.userImageUrl} alt={item.userName} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-bold">{item.userName}</h2>
                <p className="text-sm text-gray-600">
                  <strong>On:</strong> {item.equipmentName}
                </p>
              </div>
            </div>
            <div className="text-gray-800">
              <p>
                <strong>Duration:</strong> {formatTime(item.duration)}
              </p>
              <p>
                <strong>Distance:</strong> {roundsToDecimals(item.distance / 1000.0, 2)} km
              </p>
              <p>
                <strong>Speed:</strong> {roundsToDecimals(item.speed, 1)} km/s
              </p>
              <p>
                <strong>Avg Speed:</strong> {roundsToDecimals(item.avgSpeed, 1)} km/s
              </p>
              <p>
                <strong>Max Speed:</strong> {roundsToDecimals(item.maxSpeed, 1)} km/s
              </p>
              <p>
                <strong>Heart Rate:</strong> {item.heartRate} bpm
              </p>
              <p>
                <strong>Avg Heart Rate:</strong> {item.avgHeartRate} bpm
              </p>
              <p>
                <strong>Max Heart Rate:</strong> {item.maxHeartRate} bpm
              </p>
              <p>
                <strong>Elevation Gain:</strong> {item.elevationGain} meters
              </p>
              <p>
                <strong>Calories:</strong> {item.calories} kcal
              </p>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Dashboard;

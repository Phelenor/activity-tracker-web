import React, { useState, useEffect, useMemo } from "react";
import { getGymEquipment, createGymEquipment } from "../repositories/equipmentRepository";
import { GymEquipment as Equipment } from "../types/GymEquipment";
import { ActivityType } from "../types/GymEquipment";
import QRCode from "react-qr-code";
import EmptyState from "./EmptyState";

const GymEquipment: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, "id">>({
    name: "",
    imageUrl: "",
    videoUrl: undefined,
    description: "",
    activityType: ActivityType.OTHER,
  });

  const canAddEquipment = useMemo(
    () => newEquipment.name.length > 0 && newEquipment.description.length > 0 && newEquipment.imageUrl.length > 0,
    [newEquipment]
  );

  const [query, setQuery] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipment = await getGymEquipment(query);
        setEquipmentList(equipment);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchEquipment();
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewEquipment({ ...newEquipment, [id]: value });
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdEquipment = await createGymEquipment(newEquipment);
      setEquipmentList([...equipmentList, createdEquipment]);
      setNewEquipment({
        name: "",
        imageUrl: "",
        videoUrl: "",
        description: "",
        activityType: ActivityType.OTHER,
      });

      setIsFormVisible(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4 text-surface-on">
      {error && <p className="text-red-500">{error}</p>}
      {!isFormVisible && (
        <button
          className="px-4 mb-1 ms-4 bg-primary-light text-primary-on py-2 rounded hover:bg-primary-container hover:text-surface-on"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          Add Equipment
        </button>
      )}
      {isFormVisible && (
        <div className="bg-surface-light m-4 p-4 rounded-lg border-2 border-primary-light">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2 text-left">
              <input
                id="name"
                name="equipmentName"
                value={newEquipment.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 mb-2 w-full rounded focus:outline-primary-light"
              />
            </div>
            <div className="mb-2 text-left">
              <input
                id="imageUrl"
                name="imageUrl"
                value={newEquipment.imageUrl}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="border p-2 mb-2 w-full rounded focus:outline-primary-light"
              />
            </div>
            <div className="mb-2 text-left">
              <input
                id="videoUrl"
                name="videoUrl"
                value={newEquipment.videoUrl}
                onChange={handleInputChange}
                placeholder="Video URL"
                className="border p-2 mb-2 w-full rounded focus:outline-primary-light"
              />
            </div>
            <div className="text-left">
              <textarea
                id="description"
                name="description"
                value={newEquipment.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 mb-2 w-full rounded focus:outline-primary-light"
              ></textarea>
            </div>
            <div className="mb-4 text-left">
              <label className="mb-1 block text-surface-on">Equipment Activity Type</label>
              <select
                id="activityType"
                name="type"
                value={newEquipment.activityType}
                onChange={handleInputChange}
                className="border py-2 mb-2 w-full px-2"
              >
                {Object.values(ActivityType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                disabled={!canAddEquipment}
                className="px-4 bg-primary-light text-primary-on py-2 rounded hover:bg-primary-container hover:text-surface-on disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Equipment
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="px-4 ms-2 bg-error-light text-primary-on py-2 rounded hover:bg-error-container hover:text-surface-on"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="m-4">
        <input
          type="text"
          placeholder="Search equipment..."
          value={query}
          onChange={handleQueryChange}
          className="border p-2 mb-2 w-full rounded focus:outline-primary-light"
        />
      </div>
      {equipmentList.length === 0 ? (
        <EmptyState text="No equipment found." />
      ) : (
        <ul>
          {equipmentList.map((equipment) => (
            <li key={equipment.id} className="bg-surface-light m-4 p-4 rounded-xl border-2 border-primary-light">
              <h4 className="font-bold text-xl mb-4">{equipment.name}</h4>
              <div className="flex space-x-4">
                <img
                  src={equipment.imageUrl}
                  alt={equipment.name}
                  className="w-48 h-48 object-cover border-2 rounded-xl border-primary-light"
                />
                <p className="flex-grow text-lg max-h-48 text-ellipsis overflow-clip">{equipment.description}</p>
                <div className="flex items-center">
                  <div className="w-28 h-28 bg-white p-1 flex-shrink-0">
                    <QRCode className="w-full h-auto" value={"activity_tracker://gym_equipment/" + equipment.id} />
                  </div>
                </div>
              </div>
              {equipment.videoUrl && (
                <div className=" mt-2">
                  <a
                    href={equipment.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tertiary-light hover:underline"
                  >
                    Open video
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GymEquipment;

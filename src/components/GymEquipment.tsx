import React, { useState, useEffect } from "react";
import { getGymEquipment, createGymEquipment } from "../repositories/equipmentRepository";
import { GymEquipment as Equipment } from "../types/GymEquipment";
import { ActivityType } from "../types/GymEquipment";

const GymEquipment: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, "id">>({
    name: "",
    imageUrl: "",
    videoUrl: "",
    description: "",
    activityType: ActivityType.OTHER,
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipment = await getGymEquipment();
        setEquipmentList(equipment);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchEquipment();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewEquipment({ ...newEquipment, [id]: value });
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
          className="px-4 mb-4 bg-primary-light text-primary-on py-2 rounded hover:bg-primary-container hover:text-surface-on"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          Add Equipment
        </button>
      )}
      {isFormVisible && (
        <div className=" bg-surface-light m-4 p-4 rounded-lg border-2 border-primary-light">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2 text-left">
              <input
                id="name"
                name="equipmentName"
                value={newEquipment.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div className="mb-2 text-left">
              <input
                id="imageUrl"
                name="imageUrl"
                value={newEquipment.imageUrl}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div className="mb-2 text-left">
              <input
                id="videoUrl"
                name="videoUrl"
                value={newEquipment.videoUrl}
                onChange={handleInputChange}
                placeholder="Video URL"
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div className="text-left">
              <textarea
                id="description"
                name="description"
                value={newEquipment.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 mb-2 w-full"
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
                className="px-4 bg-primary-light text-primary-on py-2 rounded hover:bg-primary-container hover:text-surface-on"
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
      {equipmentList.length === 0 ? (
        <p>No equipment found.</p>
      ) : (
        <ul>
          {equipmentList.map((equipment) => (
            <li key={equipment.id} className="border p-2 mb-2 bg-surface-container-low">
              <h4 className="font-bold">{equipment.name}</h4>
              <img src={equipment.imageUrl} alt={equipment.name} className="w-32 h-32 object-cover" />
              <p>{equipment.description}</p>
              <a href={equipment.videoUrl} target="_blank" rel="noopener noreferrer" className="text-tertiary-light">
                Video
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GymEquipment;

import React, { useState } from "react";
import { GymEquipment } from "../types/GymEquipment";

const GymEquipmentAdmin: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<GymEquipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<GymEquipment>({
    name: "",
    imageUrl: "",
    videoUrl: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEquipment({ ...newEquipment, [name]: value });
  };

  const addEquipment = () => {
    setEquipmentList([...equipmentList, newEquipment]);
    setNewEquipment({ name: "", imageUrl: "", videoUrl: "", description: "" });
  };

  return (
    <div className="p-4 bg-surface-light text-surface-on">
      <h2 className="text-2xl font-bold mb-4 text-primary-light">Gym Equipment Admin</h2>
      <div className="mb-4">
        <input
          name="name"
          value={newEquipment.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          name="imageUrl"
          value={newEquipment.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="border p-2 mb-2 w-full"
        />
        <input
          name="videoUrl"
          value={newEquipment.videoUrl}
          onChange={handleInputChange}
          placeholder="Video URL"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          value={newEquipment.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 mb-2 w-full"
        ></textarea>
        <button
          onClick={addEquipment}
          className="bg-primary-light text-onPrimary-light py-2 px-4 rounded hover:bg-primary-container"
        >
          Add Equipment
        </button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-primary-light">Equipment List</h3>
        <ul>
          {equipmentList.map((equipment, index) => (
            <li key={index} className="border p-2 mb-2 bg-surface-container-low">
              <h4 className="font-bold">{equipment.name}</h4>
              <img src={equipment.imageUrl} alt={equipment.name} className="w-32 h-32 object-cover" />
              <p>{equipment.description}</p>
              <a href={equipment.videoUrl} target="_blank" rel="noopener noreferrer" className="text-tertiary-light">
                Video
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GymEquipmentAdmin;

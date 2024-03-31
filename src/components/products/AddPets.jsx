import React, { useState, useEffect } from "react";
import Input from "../lib/Input";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPets = () => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [selectedPet, setSelectedPet] = useState(null); // To store the pet selected for editing
  const petsPerPage = 8;

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    fetch("https://excited-cod-beret.cyclic.app/pet")
      .then((response) => response.json())
      .then((data) => setPets(data.pets))
      .catch((error) => console.error("Error fetching pet data:", error));
  };

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const filteredPets = pets.filter((pet) => {
    if (filterType && filterType !== "All" && pet.type !== filterType) return false;
    if (filterColor && filterColor !== "All" && pet.color !== filterColor) return false;
    if (searchTerm && !pet.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const handleColorFilterChange = (e) => {
    setFilterColor(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://excited-cod-beret.cyclic.app/pet/${selectedPet._id}`, selectedPet);
      fetchPets(); // Fetch updated pets
      toast.success("Pet updated successfully");
      setSelectedPet(null); // Close edit panel after updating
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Error updating pet");
    }
  };

  const handleEdit = (pet) => {
    setSelectedPet(pet);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://excited-cod-beret.cyclic.app/pet/${id}`);
      const updatedPets = pets.filter((pet) => pet._id !== id);
      setPets(updatedPets);
      toast.success("Pet deleted successfully");
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Error deleting pet");
    }
  };

  return (
    <div className="bg-gray " style={{ backgroundColor: "white" }}>
      {/* Edit panel */}
      {selectedPet && (
        <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "black", fontWeight: "bold" }}>Edit Pet</h2>
            <Input
              type="text"
              label="Name"
              value={selectedPet.name}
              onChange={(e) => setSelectedPet({ ...selectedPet, name: e.target.value })}
              style={{ color: "black" ,backgroundColor:"#A1A5A3",marginBottom:"5px",borderRadius:"5px" }}
            />
            <Input
              type="text"
              label="Type"
              value={selectedPet.type}
              style={{ color: "black" ,backgroundColor:"#A1A5A3",margin:"5px 0px" ,borderRadius:"5px"}}
              onChange={(e) => setSelectedPet({ ...selectedPet, type: e.target.value })}
            />
            <Input
              type="text"
              label="Color"
              value={selectedPet.color}
              style={{ color: "black" ,backgroundColor:"#A1A5A3",margin:"5px 0px",borderRadius:"5px" }}
              onChange={(e) => setSelectedPet({ ...selectedPet, color: e.target.value })}
            />
            <Input
              type="text"
              label="Description"
              value={selectedPet.description}
              style={{ color: "black" ,backgroundColor:"#A1A5A3" ,margin:"5px 0px",borderRadius:"5px"}}
              onChange={(e) => setSelectedPet({ ...selectedPet, description: e.target.value })}
            />
            <Input
              type="text"
              label="Gender"
              value={selectedPet.gender}
              style={{ color: "black" ,backgroundColor:"#A1A5A3",margin:"5px 0px",borderRadius:"5px" }}
              onChange={(e) => setSelectedPet({ ...selectedPet, gender: e.target.value })}
            />
            <Input
              type="number"
              label="Age"
              value={selectedPet.age}
              style={{ color: "black" ,backgroundColor:"#A1A5A3" ,marginTop:"5px",borderRadius:"5px"}}
              onChange={(e) => setSelectedPet({ ...selectedPet, age: e.target.value })}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleUpdate} style={{ backgroundColor: "black" }}>
              Update
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 ml-4" onClick={() => setSelectedPet(null)} style={{ backgroundColor: "#A0153E" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray py-8 px-5 rounded-md shadow-custom_secondary grid lg:grid-cols-4 gap-8">
        <div>
          <Input
            className="input_styles"
            type="text"
            place="Search by pet name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <select
            className="input_styles relative appearance-none focus:outline-none focus:border-blue-500 "
            name="Type"
            id="Type"
            value={filterType}
            onChange={handleTypeFilterChange}
          >
            <option value="All">All Types</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div>
          <select
            className="input_styles relative appearance-none focus:outline-none focus:border-blue-500"
            name="Color"
            id="Color"
            value={filterColor}
            onChange={handleColorFilterChange}
          >
            <option value="All">All Colors</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
            <option value="gray">Gray</option>
            <option value="cream">Cream</option>
            <option value="red">Red</option>
            {/* Add more color options as needed */}
          </select>
        </div>
        <br />
        {currentPets.map((pet) => (
          <div key={pet._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-64 object-cover" src={pet.url} alt={pet.name} />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
              <p className="text-gray-600 mb-2"><strong>Type:</strong> {pet.type}</p>
              <p className="text-gray-600 mb-2"><strong>Gender:</strong> {pet.gender}</p>
              <p className="text-gray-600 mb-2"><strong>Color: </strong>{pet.color}</p>
              <p className="text-gray-600 mb-2"><strong>Age:</strong> {pet.age}</p>
              <p className="text-gray-600 mb-2"><strong>Description:</strong> {pet.description}</p>
              <div className="flex justify-between">
                <button onClick={() => handleEdit(pet)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: "gray" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(pet._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: "#A0153E" }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredPets.length / petsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className="mx-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
            {i + 1}
          </button>
        ))}
      </div>
      <div className="absolute top-0 right-0 w-full bg-black">
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddPets;

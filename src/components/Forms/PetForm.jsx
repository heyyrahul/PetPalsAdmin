import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Input from "../lib/Input";
import URL from "../../../API";

const PetForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    color: "",
    name: "",
    age: "",
    url: "",
    gender: "",
    description: "",
    isAdopted: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`${URL}/pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({ ...prevState, [name]: inputValue }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            place="Name of pet"
            value={formData.name}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block font-medium mb-2">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input_styles"
          >
            <option value="">Select type</option>
            <option value="dog">dog</option>
            <option value="cat">cat</option>
            <option value="rabbit">rabbit</option>
            <option value="bird">bird</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block font-medium mb-2">
            Color
          </label>
          <select
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="input_styles"
          >
            <option value="">Select color</option>
            <option value="black">black</option>
            <option value="white">white</option>
            <option value="brown">brown</option>
            <option value="gray">gray</option>
            <option value="gray">cream</option>
            <option value="gray">red</option>
          </select>
        </div>
       
        <div className="mb-4">
          <label htmlFor="age" className="block font-medium mb-2">
            Age
          </label>
          <Input
            type="number"
            id="age"
            name="age"
            place="Age of pet"
            value={formData.age}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block font-medium mb-2">
            Image URL
          </label>
          <Input
            type="text"
            id="url"
            name="url"
            place="URL of pet image"
            value={formData.url}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Description of pet"
            value={formData.description}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block font-medium mb-2">
            Gender
          </label>
          <div className="flex space-x-2">
            <Input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
            <label htmlFor="male">Male</label>
            <Input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
            <label htmlFor="female">Female</label>
            <Input type="radio" id="other" name="gender" value="other" onChange={handleChange} />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdopted"
              name="isAdopted"
              checked={formData.isAdopted}
              onChange={handleChange}
              className="mr-2 focus:outline-none focus:ring focus:ring-secondary-500"
            />
            <label htmlFor="isAdopted" className="font-medium">
              Is Adopted
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{backgroundColor: "#A0153E", color: "white",borderRadius: "5px", width: "5rem" }}>
          Add Pet
        </button>
      </form>

      {/* show successful message */}
      <Transition
        show={showSuccessMessage}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-4 bg-primary-100 text-primary-700 p-4 rounded-md">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <p>Form submitted successfully!</p>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default PetForm;

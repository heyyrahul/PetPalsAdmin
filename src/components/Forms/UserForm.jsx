import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Input from "../lib/Input";
import URL from "../../../API";

const UserForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pass: "",
    age: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-2">
            Username
          </label>
          <Input
            type="text"
            id="username"
            name="username"
            place="Username"
            value={formData.username}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            place="Email"
            value={formData.email}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pass" className="block font-medium mb-2">
            Password
          </label>
          <Input
            type="password"
            id="pass"
            name="pass"
            place="Password"
            value={formData.pass}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block font-medium mb-2">
            Age
          </label>
          <Input
            type="number"
            id="age"
            name="age"
            place="Age"
            value={formData.age}
            onChange={handleChange}
            className="input_styles"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block font-medium mb-2">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input_styles"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{backgroundColor: "#A0153E", color: "white",borderRadius: "5px", width: "5rem"}}>
          Register
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
            <p>User registered successfully!</p>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default UserForm;

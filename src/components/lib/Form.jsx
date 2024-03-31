import React from "react";
import PetForm from "../Forms/PetForm";
import UserForm from "../Forms/UserForm";

const Form = () => {
  return (
    <div className="w-full  p-0 lg:p-8 rounded-lg shadow-md space-y-8">
      <h2 className="text-4xl font-semibold mb-6 inline-block border-b-2 border-primary-400">Pets</h2>
      <div className="shadow-custom p-8 rounded-lg">
        <h2 className="text-xl font-medium mb-6">Elements</h2>
        <PetForm />
      </div>

      <h2 className="text-4xl font-semibold mb-6 inline-block border-b-2 border-primary-400">Users</h2>
      <div className="shadow-custom p-8 rounded-lg">
        <h2 className="text-xl font-medium mb-6">Elements</h2>
        <UserForm />
      </div>
    </div>
  );
};

export default Form;

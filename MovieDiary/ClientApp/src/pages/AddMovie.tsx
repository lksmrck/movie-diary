import React from "react";
import Input from "../components/Input";
import { Theme } from "../common/theme";

const AddMovie = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-5">
        <Input color={Theme.color.primary} />
      </div>
    </div>
  );
};

export default AddMovie;

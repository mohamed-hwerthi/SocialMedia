import React from "react";

const notFound = () => {
  return (
    <div>
      <h2
        style={{
          color: "red",
          fontSize: "35px",

          transform: "translateY(150px)",
          marginLeft: "350px",
        }}
      >
        Erreur 404 !!! Page not Found{" "}
      </h2>
    </div>
  );
};

export default notFound;

import React from "react";

export const AboutUs = () => {
  return (
    <div className="w-full h-full pb-20">
      <div className="grid items-center justify-center w-full h-full grid-flow-col grid-rows-3 gap-4 p-10 mt-20 ">
        <div className="justify-start row-span-3 align-middle">
          <div className="items-center justify-center hidden w-full mt-1 mb-1 md:flex h-70">
            <img
              className="flex w-full h-full mt-1 mb-1 rounded-full drop-shadow-lg"
              src="https://images.unsplash.com/photo-1496054967538-14294f2376b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1248&q=80"
              alt="Edificio empresa"
            />
          </div>
        </div>
        <div className="col-span-2">
          <h3 className="text-center text-5xl text-[#3196DA] font-bold border-b-4 border-[#3196DA] ">
            Mejor Postor
          </h3>
        </div>
        <div className="col-span-2 row-span-2">
          <h6 className="text-xl text-center text-[#3196DA] font-bold mt-1">
            Una empresa con trayectoria y experiencia
          </h6>
          <p className="px-5 mt-5 text-lg font-bold text-justify text-blue-400">
            En "Mejor Postor" buscamos conectar a vendedores y compradores de
            forma sencilla, garantizando transacciones seguras. Nuestra
            trayectoria como empresa es una garantía de la capacidad de la
            aplicación, siendo ésta en la mejor del mercado.
          </p>
        </div>
      </div>
    </div>
  );
};

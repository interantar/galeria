import React, { useState } from "react";
import "./scss/picture.scss";

type PictureProps = {
  photo: {
    pais: string;
    submissionTime: string;
    endereco: string;
    email: string;
    telefone: string;
    url: string;
    _id: string;
    _owner: string;
    _createdDate: string;
    aprovado: boolean;
    respostaCurta: string;
    _updatedDate: string;
    numero: number;
    codigoPostalCep: string;
    menuDropdown2: string;
    lastName: string;
    respostaLonga: string;
    firstName: string;
    menuDropdown: string;
    cidade: string;
    numero2: number;
    termosECondicoes: boolean;
    regiaoEstadoProvincia: string;
  };
};

const Picture: React.FC<PictureProps> = ({ photo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updatedDate: Date = new Date(photo._updatedDate);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="picture">
      <img
        src={photo.url}
        alt={photo.respostaLonga}
        className="picture__img"
        onClick={openModal}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="picture__overlay bg-gray-900 opacity-75 fixed inset-0"
            onClick={closeModal}
          ></div>

          <div className="picture__modal relative z-10">
            <div className="picture__modal-photo w-70%">
              <img
                src={photo.url}
                alt={photo.respostaLonga}
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="picture__modal-info w-30% opacity-100">
              <h2 className="title">
                {photo.respostaCurta} (por {photo.firstName} {photo.lastName})
              </h2>
              <p className="description">{photo.respostaLonga}</p>
              <div className="tags">
                <p className="tag region">{photo.menuDropdown}</p>
                <p className="tag category">{photo.menuDropdown2}</p>
                <p className="tag year">
                  {new Date(photo._updatedDate).getFullYear()}
                </p>
              </div>
              {/* <button onClick={closeModal} className="button">
                Fechar
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Picture;

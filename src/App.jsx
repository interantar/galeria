import { useState, useEffect } from "react";
import axios from "axios";
import Picture from "./components/picture/Picture.tsx";
import NavBar from "./components/navbar/NavBar.tsx";

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Todas");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://interantar.com/_functions/gallery"
        );
        setPhotos(
          response.data.data.filter((picture) => picture.aprovado === true)
        );
      } catch (error) {
        console.error("Erro ao obter as fotos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const filterPhotos = () => {
    let filteredPhotos = [...photos];

    if (selectedRegion !== "Todas") {
      filteredPhotos = filteredPhotos.filter((photo) => {
        const normalizedSelectedRegion = selectedRegion
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const normalizedPhotoRegion = photo.menuDropdown
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedPhotoRegion === normalizedSelectedRegion;
      });
    }

    if (selectedCategory !== "Todas") {
      filteredPhotos = filteredPhotos.filter(
        (photo) => photo.menuDropdown2 === selectedCategory
      );
    }

    return filteredPhotos;
  };

  const regions = ["Todas", "Ántártica", "Ártico", "Patagônica"];
  const categories = ["Todas", "Paisagem", "Animal", "Ciência"];

  return (
    <div className="content">
      <NavBar />
      <div className="dropdown-container">
        <div className="drop">
          <label htmlFor="region">Região: </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="dropdown" id="region"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        
        <div className="drop">
        <label htmlFor="category">Categoria: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="dropdown" id="category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        </div>
      </div>
      <div className="pictures__grid">
        {filterPhotos().map((photo) => (
          <Picture key={photo._id} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default App;

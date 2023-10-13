import './App.scss';
import imagesJson from './images.json';
import {useEffect, useState} from "react";

function App() {
  const [selectedImageKeys, setSelectedImageKeys] = useState([]);
  const [availableImageKeys, setAvailableImageKeys] = useState([]);

  useEffect(() => {
    setAvailableImageKeys(Object.keys(imagesJson.images))
    selectNewImages();
  }, []);

  useEffect(() => {
    if(availableImageKeys.length === Object.keys(imagesJson.images).length) {
      selectNewImages();
    }
  }, [availableImageKeys]);

  function selectNewImages() {
    if(availableImageKeys.length < 3) {
      setAvailableImageKeys(Object.keys(imagesJson.images));
    }

    let selectedKeys = [];

    while (selectedKeys.length < 3 && availableImageKeys.length >= 3) {
      const newKey = getRandomItem(availableImageKeys);
      if(!selectedKeys.includes(newKey)) selectedKeys.push(newKey);
    }

    setAvailableImageKeys((prevState) => prevState.filter((k) => !selectedKeys.includes(k)));
    setSelectedImageKeys(selectedKeys);
  }

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  return (
    <div className="App">
      <div className={"image-container"}>
        {selectedImageKeys.map(i => {
          return <img src={imagesJson.images[i]} alt={i} className={"image"}/>
        })}
      </div>
      <button className={"button"} onClick={selectNewImages}>shuffle</button>
    </div>
  );
}

export default App;

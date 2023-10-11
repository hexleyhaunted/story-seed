import './App.scss';
import imagesJson from './images.json';
import {useEffect, useState} from "react";

function App() {
  const [selectedImageKeys, setSelectedImageKeys] = useState([]);
  let availableImages = Object.keys(imagesJson.images);

  useEffect(() => {
    selectNewImages();
  }, []);

  function selectNewImages() {
    if(availableImages.length < 3) {
      availableImages = Object.keys(imagesJson.images);
    }

    let selectedKeys = [];

    while (selectedKeys.length < 3) {
      const newKey = getRandomItem(availableImages);
      availableImages = availableImages.filter(i => i !== newKey);
      selectedKeys.push(newKey);
    }

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

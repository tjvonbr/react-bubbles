import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(response => {
        setColorList(response.data)
      })
      .catch(error => console.log(error.response))
  }, [])

  const saveEdit = color => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(response => {
        console.log(response)
        let newColorList = colorList.map(color => {
          if (color.id === response.data.id) {
            return response.data
          } else {
            return color
          }
        })
        setColorList(newColorList);
      })
      .catch(error => console.log(error.response))
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(response => {
        console.log(response)
        let listAfterDelete = colorList.map(color => {
          if (color.id === response.data) {
            return response.data
          } else {
            return color
          }
        })
        setColorList(listAfterDelete);
      })
      .catch(error => console.log(error.response));
  };

  return (
    <>
      <ColorList colors={colorList}
                  updateColors={setColorList} 
                  saveEdit={saveEdit} 
                  removeColor={deleteColor} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

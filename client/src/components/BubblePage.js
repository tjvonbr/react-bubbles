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

  const deleteColor = deleteColor => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${deleteColor.id}`)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error.response));
  };

  return (
    <>
      <ColorList colors={colorList}
                  updateColors={setColorList} 
                  saveEdit={saveEdit} 
                  deleteColor={deleteColor} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

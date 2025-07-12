import React, { useState } from 'react';
import Table from './components/Table/Table';
import './App.scss';

const initialData = [
  {
    "id": "electronics",
    "label": "Electronics",
    "value": 1400, //this value needs to be calculated from the children values (800+700)
    "children": [
      {
        "id": "phones",
        "label": "Phones",
        "value": 800
      },
      {
        "id": "laptops",
        "label": "Laptops",
        "value": 700
      }
    ]
  },
  {
    "id": "furniture",
    "label": "Furniture",
    "value": 1000, //this need to be calculated from the children values (300+700)
    "children": [
      {
        "id": "tables",
        "label": "Tables",
        "value": 300
      },
      {
        "id": "chairs",
        "label": "Chairs",
        "value": 700
      }
    ]
  }
];

function App() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Hierarchical Table</h2>
      <Table data={initialData} />
    </div>
  );
}

export default App;

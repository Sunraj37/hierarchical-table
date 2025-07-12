import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';
import './Table.scss';
import { calculateTotalAndVariance, distributeTotal } from '../../utils/calculateUtils';

export default function Table({ data }) {
  const [rows, setRows] = useState([]);
  const [original, setOriginal] = useState({});

  useEffect(() => {
    const flat = {};
    const buildTree = (items) =>
      items.map(item => {
        const value = item.value ?? item.children?.reduce((a, c) => a + c.value, 0);
        const node = { ...item, value, original: value };
        flat[item.id] = value;
        if (item.children) {
          node.children = buildTree(item.children);
        }
        return node;
      });

    const updatedRows = buildTree(data);
    setRows(updatedRows);
    setOriginal(flat);
  }, [data]);

  const handleUpdate = (id, type, inputVal) => {
    const updatedRows = JSON.parse(JSON.stringify(rows));
    const updateNode = (nodes) => {
      for (const node of nodes) {
        if (node.id === id) {
          const oldValue = node.value;
          const newValue = type === 'percentage'
            ? oldValue + (oldValue * (parseFloat(inputVal) / 100))
            : parseFloat(inputVal);

          if (!isNaN(newValue)) {
            node.value = newValue;
            node.variance = ((newValue - node.original) / node.original) * 100;
          }

          return true;
        }

        if (node.children && updateNode(node.children)) {
          // Recalculate parent total
          node.value = node.children.reduce((sum, c) => sum + c.value, 0);
          node.variance = ((node.value - node.original) / node.original) * 100;
        }
      }
      return false;
    };

    if (updateNode(updatedRows)) {
      setRows(updatedRows);
    }
  };

  const handleDistribute = (id, newVal) => {
    const updatedRows = JSON.parse(JSON.stringify(rows));
    distributeTotal(updatedRows, id, parseFloat(newVal));
    setRows(updatedRows);
  };

  const flatAllValues = (items) => items.flatMap(item => item.children || []).reduce((a, b) => a + b.value, 0);
  const grandTotal = flatAllValues(rows);

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <TableRow key={row.id} node={row} level={0} onUpdate={handleUpdate} onDistribute={handleDistribute} />
        ))}
        <tr className="table-info">
          <td><strong>Grand Total</strong></td>
          <td colSpan="5"><strong>{grandTotal.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>
  );
}

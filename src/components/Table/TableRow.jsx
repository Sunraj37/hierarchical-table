import React, { useState } from 'react';

export default function TableRow({ node, level, onUpdate, onDistribute }) {
  const [inputVal, setInputVal] = useState('');

  const indent = { paddingLeft: `${level * 20}px` };
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <tr className={node.updated ? 'updated-row' : ''}>
        <td style={indent}>{hasChildren ? <strong>{node.label}</strong> : node.label}</td>
        <td data-testid={`value-${node.id}`}>{node.value.toFixed(2)}</td>
        <td>
          <input
            type="number"
            className="form-control"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </td>
        <td>
          <button className="btn btn-sm btn-outline-primary" onClick={() => onUpdate(node.id, 'percentage', inputVal)}>%</button>
        </td>
        <td>
          <button className="btn btn-sm btn-outline-success" onClick={() => hasChildren ? onDistribute(node.id, inputVal) : onUpdate(node.id, 'value', inputVal)}>=</button>
        </td>
        <td>{node.variance ? `${node.variance.toFixed(2)}%` : '0%'}</td>
      </tr>
      {hasChildren &&
        node.children.map(child => (
          <TableRow
            key={child.id}
            node={child}
            level={level + 1}
            onUpdate={onUpdate}
            onDistribute={onDistribute}
          />
        ))}
    </>
  );
}

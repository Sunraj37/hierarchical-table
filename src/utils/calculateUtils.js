export const distributeTotal = (tree, id, totalValue) => {
  const findNode = (nodes) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const result = findNode(node.children);
        if (result) return result;
      }
    }
    return null;
  };

  const node = findNode(tree);
  if (!node || !node.children) return;

  const currentSum = node.children.reduce((a, b) => a + b.value, 0);
  node.children.forEach(child => {
    const proportion = child.value / currentSum;
    child.value = totalValue * proportion;
    child.variance = ((child.value - child.original) / child.original) * 100;
  });

  node.value = node.children.reduce((a, b) => a + b.value, 0);
  node.variance = ((node.value - node.original) / node.original) * 100;
};

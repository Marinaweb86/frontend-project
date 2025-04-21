const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return String(value);
  };
  
  const buildPath = (currentPath, key) => 
    currentPath ? `${currentPath}.${key}` : key;
  
  const formatPlain = (diff, parentPath = '') => {
    const lines = diff.flatMap((node) => {
      const currentPath = buildPath(parentPath, node.key);
  
      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'nested':
          return formatPlain(node.children, currentPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });
  
    return lines.join('\n');
  };
  
  export default formatPlain;
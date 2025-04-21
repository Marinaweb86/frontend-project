const formatJson = (diff) => {
    const buildJsonDiff = (nodes) => nodes.map((node) => {
      const { key, type } = node;
      const base = { key, type };
  
      switch (type) {
        case 'nested':
          return { ...base, children: buildJsonDiff(node.children) };
        case 'added':
          return { ...base, value: node.value };
        case 'removed':
          return { ...base, value: node.value };
        case 'updated':
          return { ...base, oldValue: node.oldValue, newValue: node.newValue };
        case 'unchanged':
          return { ...base, value: node.value };
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  
    return JSON.stringify(buildJsonDiff(diff), null, 2);
  };
  
  export default formatJson;
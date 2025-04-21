import _ from 'lodash';

const formatValue = (value, indent = '    ') => {
  if (_.isPlainObject(value)) {
    const lines = Object.entries(value).map(
      ([k, v]) => `${indent}${k}: ${formatValue(v, indent + '    ')}`
    );
    return `{\n${lines.join('\n')}\n${indent}}`;
  }
  if (value === '') return ' ';
  return value;
};

const formatStylish = (diff, indent = '  ') => {
  const lines = diff.flatMap((node) => {
    const makeLine = (sign, key, value) => (
      `${indent}${sign} ${key}: ${formatValue(value, indent + '    ')}`
    );

    switch (node.type) {
      case 'added':
        return makeLine('+', node.key, node.value);
      case 'removed':
        return makeLine('-', node.key, node.value);
      case 'updated':
        return [
          makeLine('-', node.key, node.oldValue),
          makeLine('+', node.key, node.newValue),
        ];
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, indent + '    ')}`;
      case 'unchanged':
        return makeLine(' ', node.key, node.value);
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  // Фиксированное форматирование закрывающих скобок
  return `{\n${lines.join('\n')}\n}`;
};

export default formatStylish;
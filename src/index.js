import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getAbsolutePath = (filename) => {
  const fixturesPath = path.join(process.cwd(), '__fixtures__', filename);
  if (fs.existsSync(fixturesPath)) {
    return fixturesPath;
  }
  if (fs.existsSync(filename)) {
    return filename;
  }
  throw new Error(`File '${filename}' not found.`);
};

const readFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(content);
};

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: buildDiff(data1[key], data2[key]), type: 'nested' };
    }
    return {
      key,
      oldValue: data1[key],
      newValue: data2[key],
      type: 'updated',
    };
  });
};

const formatValue = (value, indent = '    ') => {
  if (_.isPlainObject(value)) {
    const lines = Object.entries(value).map(
      ([k, v]) => `${indent}${k}: ${formatValue(v, indent + '    ')}`
    );
    return `{\n${lines.join('\n')}\n${indent.slice(0, -4)}}`;
  }
  if (value === '') return ' '; // Специальная обработка пустой строки
  return value;
};

const formatDiff = (diff, indent = '  ') => {
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
        return `${indent}  ${node.key}: ${formatDiff(node.children, indent + '    ')}`;
      case 'unchanged':
        return makeLine(' ', node.key, node.value);
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default (filepath1, filepath2) => {
  try {
    const absolutePath1 = getAbsolutePath(filepath1);
    const absolutePath2 = getAbsolutePath(filepath2);

    const data1 = readFile(absolutePath1);
    const data2 = readFile(absolutePath2);

    const diff = buildDiff(data1, data2);
    return formatDiff(diff);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
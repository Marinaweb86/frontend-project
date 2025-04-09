import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }
  return fs.readFileSync(absolutePath, 'utf-8');
};

const getFileFormat = (filename) => {
  const ext = path.extname(filename).slice(1).toLowerCase();
  return ext === 'yml' ? 'yaml' : ext;
};

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  
  return keys.map((key) => {
    if (!_.has(obj2, key)) return { key, value: obj1[key], status: 'removed' };
    if (!_.has(obj1, key)) return { key, value: obj2[key], status: 'added' };
    if (_.isEqual(obj1[key], obj2[key])) return { key, value: obj1[key], status: 'unchanged' };
    return { key, oldValue: obj1[key], newValue: obj2[key], status: 'updated' };
  });
};

const formatValue = (value) => {
  if (_.isBoolean(value)) return value.toString();
  return _.isObject(value) ? '[complex value]' : value;
};

const formatStylish = (diff) => {
  const lines = diff.map((item) => {
    switch (item.status) {
      case 'added': return `  + ${item.key}: ${formatValue(item.value)}`;
      case 'removed': return `  - ${item.key}: ${formatValue(item.value)}`;
      case 'unchanged': return `    ${item.key}: ${formatValue(item.value)}`;
      case 'updated': 
        return `  - ${item.key}: ${formatValue(item.oldValue)}\n  + ${item.key}: ${formatValue(item.newValue)}`;
      default: return '';
    }
  });
  return `{\n${lines.join('\n')}\n}`;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);
  
  const data1 = parse(content1, getFileFormat(filepath1));
  const data2 = parse(content2, getFileFormat(filepath2));
  
  const diff = buildDiff(data1, data2);
  
  switch (format) {
    case 'stylish': return formatStylish(diff);
    case 'json': return JSON.stringify(diff, null, 2);
    default: throw new Error(`Unknown output format: ${format}`);
  }
};
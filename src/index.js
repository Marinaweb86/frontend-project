import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

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

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8');
  const format = getFileFormat(filepath);
  return parse(content, format);
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

export default (filepath1, filepath2, formatName = 'stylish') => {
  try {
    const absolutePath1 = getAbsolutePath(filepath1);
    const absolutePath2 = getAbsolutePath(filepath2);

    const data1 = readFile(absolutePath1);
    const data2 = readFile(absolutePath2);

    const diff = buildDiff(data1, data2);
    return formatDiff(diff, formatName);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
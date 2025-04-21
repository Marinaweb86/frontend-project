import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// Определяем пути к файлам один раз в начале
const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');
const stylishResult = readFixture('resultStylish.txt');
const plainResult = readFixture('resultPlain.txt');

describe('gendiff', () => {
  test('stylish format with JSON', () => {
    const result = gendiff(file1Json, file2Json, 'stylish');
    // Для отладки:
    console.log('=== ACTUAL RESULT ===');
    console.log(result);
    console.log('=== EXPECTED RESULT ===');
    console.log(stylishResult);
    console.log('=====================');
    
    // Сравниваем нормализованные строки
    expect(result.replace(/\s+/g, ' ')).toBe(stylishResult.replace(/\s+/g, ' '));
  });

  test('plain format with JSON', () => {
    const result = gendiff(file1Json, file2Json, 'plain');
    expect(result).toBe(plainResult);
  });
});

test('json format with JSON', () => {
  const result = JSON.parse(gendiff(file1Json, file2Json, 'json'));
  expect(result).toEqual(expect.arrayContaining([
    expect.objectContaining({
      key: expect.any(String),
      type: expect.stringMatching(/^(added|removed|updated|unchanged|nested)$/)
    })
  ]));
});
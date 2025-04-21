# frontend-project

# Gendiff

[![Tests](https://github.com/yourname/gendiff/actions/workflows/nodejs.yml
/badge.svg)](https://github.com/yourname/gendiff/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/your-badge-id/maintainability)](https://codeclimate.com/github/yourname/gendiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/your-badge-id/test_coverage)](https://codeclimate.com/github/yourname/gendiff/test_coverage)

## Установка
npm ci 
make install

## 🎥 Демонстрация работы

[![ascicast](https://asciinema.org/a/FxvoBKs6H0olTN9Xr4GN54Pta
.svg)](https://asciinema.org/a/FxvoBKs6H0olTN9Xr4GN54Pta
)

сравнение формата plain [![ascicast](https://asciinema.org/a/7shFGQFOpsYtkyIYOj0PEdmmd
.svg)](https://asciinema.org/a/7shFGQFOpsYtkyIYOj0PEdmmd
)

### Пример вызова
gendiff -h

### Вывод 
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (stylish|plain) (default: "stylish")
  -h, --help           display help for command


### Пример вызова
gendiff file1.json file2.json

### Вывод 

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
          key5: value5
          }
        setting6: {
            doge: {
              - wow:  
              + wow: so much
}
            key: value
          + ops: vops
}
}
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
          key: value
          }
      + nest: str
}
  - group2: {
      abc: 12345
      deep: {
          id: 45
          }
      }
  + group3: {
      deep: {
          id: {
              number: 45
              }
          }
      fee: 100500
      }
}


### Пример вызова
gendiff --format plain file1.json file2.json

### Вывод 
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]

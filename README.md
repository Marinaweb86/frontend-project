# frontend-project

# Gendiff

[![Tests](https://github.com/yourname/gendiff/actions/workflows/nodejs.yml
/badge.svg)](https://github.com/yourname/gendiff/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/your-badge-id/maintainability)](https://codeclimate.com/github/yourname/gendiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/your-badge-id/test_coverage)](https://codeclimate.com/github/yourname/gendiff/test_coverage)

## Установка

```bash
npm install -g gendiff

## 🎥 Демонстрация работы

[![ascicast](https://asciinema.org/a/FxvoBKs6H0olTN9Xr4GN54Pta
.svg)](https://asciinema.org/a/FxvoBKs6H0olTN9Xr4GN54Pta
)

### Пример вызова
```bash
gendiff file1.json file2.json
```

### Пример вывода
```diff
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}                                    
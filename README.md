# frontend-project

# Gendiff
![ESLint Status](https://github.com/Marinaweb86/frontend-project/workflows/CI/badge.svg?branch=main&event=push)  
[![Maintainability](https://qlty.sh/badges/291e0b7f-a3f4-42ca-a436-8fb27a13b773/maintainability.svg)](https://qlty.sh/gh/Marinaweb86/projects/frontend-project)   
[![Code Coverage](https://qlty.sh/badges/291e0b7f-a3f4-42ca-a436-8fb27a13b773/test_coverage.svg)](https://qlty.sh/gh/Marinaweb86/projects/frontend-project)    

## Установка
npm ci  


## 🎥 Демонстрация работы

### 1. SYMPLE 
 [![asciicast](https://asciinema.org/a/FxvoBKs6H0olTN9Xr4GN54Pta.svg)](https://asciinema.org/a/FxvoBKs6H0olTN9Xr4GN54Pta)

### 2. STYLISH Format
 [![asciicast](https://asciinema.org/a/PTEkmL9zWvyBB6QUXPAzr1ciZ.svg)](https://asciinema.org/a/PTEkmL9zWvyBB6QUXPAzr1ciZ)

### 3. PLAIN Format
 [![ascicast](https://asciinema.org/a/7shFGQFOpsYtkyIYOj0PEdmmd.svg)]
(https://asciinema.org/a/7shFGQFOpsYtkyIYOj0PEdmmd)

### 4. JSON Format
 [![asciicast](https://asciinema.org/a/k2vvJt9zwN0QCGC8GOlmBZcAi.svg)](https://asciinema.org/a/k2vvJt9zwN0QCGC8GOlmBZcAi)

### Пример вызова
gendiff -h

### Вывод 
Usage: gendiff [options] <filepath1> <filepath2>  

Compares two configuration files and shows a difference.  

Options:
  -V, --version        output the version number  
  -f, --format <type>  output format (stylish|plain) (default:   "stylish")
  -h, --help           display help for command  


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

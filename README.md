# japanese-fullhalf-convert

A JavaScript package for converting Japanese characters between full-width (全角) and half-width (半角) formats.

## Features

- Convert full-width Katakana to half-width Katakana (カタカナ ↔ ｶﾀｶﾅ)
- Convert full-width numbers to half-width numbers (１２３ ↔ 123)
- Convert full-width punctuation and symbols to half-width
- Convert full-width spaces to half-width spaces
- Bidirectional conversion support

## Installation

### Method 1: npm install (Recommended)

```bash
npm install japanese-fullhalf-convert
```

### Method 2: Import from CDN (Browser)

```html
<!-- Using unpkg -->
<script src="https://unpkg.com/japanese-fullhalf-convert@latest/index.js"></script>
<script>
  // Available as global variable: jpFullhalfConvert
  const { toHalfWidth, toFullWidth } = jpFullhalfConvert;
</script>

<!-- Using jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/japanese-fullhalf-convert@latest/index.js"></script>
```

### Method 3: ES6 Import (with bundler)

```javascript
import { toHalfWidth, toFullWidth } from 'japanese-fullhalf-convert';
```

## Usage

### CommonJS (Node.js)

```javascript
const { toHalfWidth, toFullWidth } = require('japanese-fullhalf-convert');

// Convert full-width to half-width
const fullWidth = 'カタカナ１２３';
const halfWidth = toHalfWidth(fullWidth);
console.log(halfWidth); // Output: ｶﾀｶﾅ123

// Convert half-width to full-width
const halfWidth2 = 'ｶﾀｶﾅ123';
const fullWidth2 = toFullWidth(halfWidth2);
console.log(fullWidth2); // Output: カタカナ１２３

// Examples with different character types
console.log(toHalfWidth('ＨＥＬＬＯ')); // Output: HELLO
console.log(toFullWidth('hello')); // Output: ｈｅｌｌｏ
console.log(toHalfWidth('　')); // Full-width space -> half-width space
console.log(toFullWidth(' ')); // Half-width space -> full-width space
```

### ES6 Modules

```javascript
import { toHalfWidth, toFullWidth } from 'japanese-fullhalf-convert';

const result = toHalfWidth('カタカナ１２３');
console.log(result); // Output: ｶﾀｶﾅ123
```

### Browser (CDN)

```html
<script src="https://unpkg.com/japanese-fullhalf-convert@latest/index.js"></script>
<script>
  // Access via global variable
  const { toHalfWidth, toFullWidth } = jpFullhalfConvert;
  
  // Or use window object
  const result = window.jpFullhalfConvert.toHalfWidth('カタカナ１２３');
  console.log(result); // Output: ｶﾀｶﾅ123
</script>
```

### Direct File Import (Browser)

```html
<!-- Download index.js from npm and include locally -->
<script src="./path/to/index.js"></script>
<script>
  const { toHalfWidth, toFullWidth } = jpFullhalfConvert;
</script>
```

## API

### `toHalfWidth(str)`

Converts full-width Japanese characters to half-width.

**Parameters:**
- `str` (string): Input string with full-width characters

**Returns:**
- (string): String with half-width characters

**Example:**
```javascript
toHalfWidth('カタカナ１２３'); // Returns: 'ｶﾀｶﾅ123'
```

### `toFullWidth(str)`

Converts half-width Japanese characters to full-width.

**Parameters:**
- `str` (string): Input string with half-width characters

**Returns:**
- (string): String with full-width characters

**Example:**
```javascript
toFullWidth('ｶﾀｶﾅ123'); // Returns: 'カタカナ１２３'
```

## Supported Conversions

### Katakana
- Full-width Katakana (ア-ン, ァ-ォ, ャ-ョ, ッ, ー) ↔ Half-width Katakana (ｱ-ﾝ, ｧ-ｫ, ｬ-ｮ, ｯ, ｰ)

### Numbers
- Full-width numbers (０-９) ↔ Half-width numbers (0-9)

### Letters
- Full-width uppercase (Ａ-Ｚ) ↔ Half-width uppercase (A-Z)
- Full-width lowercase (ａ-ｚ) ↔ Half-width lowercase (a-z)

### Punctuation and Symbols
- Full-width punctuation and symbols ↔ Half-width equivalents

### Spaces
- Full-width space (　) ↔ Half-width space ( )

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


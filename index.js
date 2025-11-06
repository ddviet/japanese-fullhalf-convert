// Complete katakana mapping table: full-width -> half-width
// Regular katakana sequence: ア, イ, ウ, エ, オ, カ, キ, ク, ケ, コ, サ, シ, ス, セ, ソ, タ, チ, ツ, テ, ト, ナ, ニ, ヌ, ネ, ノ, ハ, ヒ, フ, ヘ, ホ, マ, ミ, ム, メ, モ, ヤ, ユ, ヨ, ラ, リ, ル, レ, ロ, ワ, ヲ, ン
const katakanaFullToHalf = {
  // Small katakana
  0x30A1: 0xFF67, // ァ -> ｧ
  0x30A3: 0xFF68, // ィ -> ｨ
  0x30A5: 0xFF69, // ゥ -> ｩ
  0x30A7: 0xFF6A, // ェ -> ｪ
  0x30A9: 0xFF6B, // ォ -> ｫ
  0x30E3: 0xFF6C, // ャ -> ｬ
  0x30E5: 0xFF6D, // ュ -> ｭ
  0x30E7: 0xFF6E, // ョ -> ｮ
  0x30C3: 0xFF6F, // ッ -> ｯ
  // Long vowel
  0x30FC: 0xFF70, // ー -> ｰ
  // Regular katakana (ア-ン)
  0x30A2: 0xFF71, // ア -> ｱ
  0x30A4: 0xFF72, // イ -> ｲ
  0x30A6: 0xFF73, // ウ -> ｳ
  0x30A8: 0xFF74, // エ -> ｴ
  0x30AA: 0xFF75, // オ -> ｵ
  0x30AB: 0xFF76, // カ -> ｶ
  0x30AD: 0xFF77, // キ -> ｷ
  0x30AF: 0xFF78, // ク -> ｸ
  0x30B1: 0xFF79, // ケ -> ｹ
  0x30B3: 0xFF7A, // コ -> ｺ
  0x30B5: 0xFF7B, // サ -> ｻ
  0x30B7: 0xFF7C, // シ -> ｼ
  0x30B9: 0xFF7D, // ス -> ｽ
  0x30BB: 0xFF7E, // セ -> ｾ
  0x30BD: 0xFF7F, // ソ -> ｿ
  0x30BF: 0xFF80, // タ -> ﾀ
  0x30C1: 0xFF81, // チ -> ﾁ
  0x30C4: 0xFF82, // ツ -> ﾂ
  0x30C6: 0xFF83, // テ -> ﾃ
  0x30C8: 0xFF84, // ト -> ﾄ
  0x30CA: 0xFF85, // ナ -> ﾅ
  0x30CB: 0xFF86, // ニ -> ﾆ
  0x30CC: 0xFF87, // ヌ -> ﾇ
  0x30CD: 0xFF88, // ネ -> ﾈ
  0x30CE: 0xFF89, // ノ -> ﾉ
  0x30CF: 0xFF8A, // ハ -> ﾊ
  0x30D2: 0xFF8B, // ヒ -> ﾋ
  0x30D5: 0xFF8C, // フ -> ﾌ
  0x30D8: 0xFF8D, // ヘ -> ﾍ
  0x30DB: 0xFF8E, // ホ -> ﾎ
  0x30DE: 0xFF8F, // マ -> ﾏ
  0x30DF: 0xFF90, // ミ -> ﾐ
  0x30E0: 0xFF91, // ム -> ﾑ
  0x30E1: 0xFF92, // メ -> ﾒ
  0x30E2: 0xFF93, // モ -> ﾓ
  0x30E4: 0xFF94, // ヤ -> ﾔ
  0x30E6: 0xFF95, // ユ -> ﾕ
  0x30E8: 0xFF96, // ヨ -> ﾖ
  0x30E9: 0xFF97, // ラ -> ﾗ
  0x30EA: 0xFF98, // リ -> ﾘ
  0x30EB: 0xFF99, // ル -> ﾙ
  0x30EC: 0xFF9A, // レ -> ﾚ
  0x30ED: 0xFF9B, // ロ -> ﾛ
  0x30EF: 0xFF9C, // ワ -> ﾜ
  0x30F2: 0xFF9D, // ヲ -> ﾝ
  0x30F3: 0xFF9D, // ン -> ﾝ (Note: both ン and ヲ map to ﾝ, but ン is more common)
};

// Helper function to convert full-width katakana to half-width
function katakanaToHalfWidth(code) {
  if (katakanaFullToHalf[code]) {
    return String.fromCharCode(katakanaFullToHalf[code]);
  }
  // Handle ヴ, ヵ, ヶ (these might not have direct half-width equivalents)
  if (code === 0x30F4) return '\uFF73\uFF9E'; // ヴ -> ｳﾞ (u + dakuten)
  if (code === 0x30F5) return '\u30F5'; // ヵ -> keep as-is (no half-width equivalent)
  if (code === 0x30F6) return '\u30F6'; // ヶ -> keep as-is (no half-width equivalent)
  return null;
}

/**
 * Convert full-width Japanese characters to half-width
 * @param {string} str - Input string with full-width characters
 * @returns {string} - String with half-width characters
 */
function toHalfWidth(str) {
  if (typeof str !== 'string') {
    return str;
  }

  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = char.charCodeAt(0);

    // Full-width space (U+3000) -> half-width space (U+0020)
    if (code === 0x3000) {
      result += String.fromCharCode(0x0020);
    }
    // Full-width numbers (U+FF10-U+FF19) -> half-width numbers (U+0030-U+0039)
    else if (code >= 0xFF10 && code <= 0xFF19) {
      result += String.fromCharCode(code - 0xFEE0);
    }
    // Full-width uppercase letters (U+FF21-U+FF3A) -> half-width (U+0041-U+005A)
    else if (code >= 0xFF21 && code <= 0xFF3A) {
      result += String.fromCharCode(code - 0xFEE0);
    }
    // Full-width lowercase letters (U+FF41-U+FF5A) -> half-width (U+0061-U+007A)
    else if (code >= 0xFF41 && code <= 0xFF5A) {
      result += String.fromCharCode(code - 0xFEE0);
    }
    // Full-width Katakana (includes special characters like ー)
    // Check katakana mapping first (includes ー at 0x30FC)
    else if ((code >= 0x30A1 && code <= 0x30F6) || code === 0x30FC) {
      const converted = katakanaToHalfWidth(code);
      if (converted !== null) {
        result += converted;
      } else {
        result += char;
      }
    }
    // Full-width punctuation and symbols
    else if (code >= 0xFF01 && code <= 0xFF5E) {
      // Full-width ASCII-like characters -> half-width
      result += String.fromCharCode(code - 0xFEE0);
    }
    // Full-width brackets and other symbols
    else if (code === 0xFF5F) result += '\u005F'; // ＿ -> _
    else if (code === 0xFF60) result += '\u0060'; // ｀ -> `
    else {
      result += char;
    }
  }
  return result;
}

// Reverse katakana mapping: half-width -> full-width
const katakanaHalfToFull = {
  // Small katakana
  0xFF67: 0x30A1, // ｧ -> ァ
  0xFF68: 0x30A3, // ｨ -> ィ
  0xFF69: 0x30A5, // ｩ -> ゥ
  0xFF6A: 0x30A7, // ｪ -> ェ
  0xFF6B: 0x30A9, // ｫ -> ォ
  0xFF6C: 0x30E3, // ｬ -> ャ
  0xFF6D: 0x30E5, // ｭ -> ュ
  0xFF6E: 0x30E7, // ｮ -> ョ
  0xFF6F: 0x30C3, // ｯ -> ッ
  // Long vowel
  0xFF70: 0x30FC, // ｰ -> ー
  // Regular katakana (ｱ-ﾝ)
  0xFF71: 0x30A2, // ｱ -> ア
  0xFF72: 0x30A4, // ｲ -> イ
  0xFF73: 0x30A6, // ｳ -> ウ
  0xFF74: 0x30A8, // ｴ -> エ
  0xFF75: 0x30AA, // ｵ -> オ
  0xFF76: 0x30AB, // ｶ -> カ
  0xFF77: 0x30AD, // ｷ -> キ
  0xFF78: 0x30AF, // ｸ -> ク
  0xFF79: 0x30B1, // ｹ -> ケ
  0xFF7A: 0x30B3, // ｺ -> コ
  0xFF7B: 0x30B5, // ｻ -> サ
  0xFF7C: 0x30B7, // ｼ -> シ
  0xFF7D: 0x30B9, // ｽ -> ス
  0xFF7E: 0x30BB, // ｾ -> セ
  0xFF7F: 0x30BD, // ｿ -> ソ
  0xFF80: 0x30BF, // ﾀ -> タ
  0xFF81: 0x30C1, // ﾁ -> チ
  0xFF82: 0x30C4, // ﾂ -> ツ
  0xFF83: 0x30C6, // ﾃ -> テ
  0xFF84: 0x30C8, // ﾄ -> ト
  0xFF85: 0x30CA, // ﾅ -> ナ
  0xFF86: 0x30CB, // ﾆ -> ニ
  0xFF87: 0x30CC, // ﾇ -> ヌ
  0xFF88: 0x30CD, // ﾈ -> ネ
  0xFF89: 0x30CE, // ﾉ -> ノ
  0xFF8A: 0x30CF, // ﾊ -> ハ
  0xFF8B: 0x30D2, // ﾋ -> ヒ
  0xFF8C: 0x30D5, // ﾌ -> フ
  0xFF8D: 0x30D8, // ﾍ -> ヘ
  0xFF8E: 0x30DB, // ﾎ -> ホ
  0xFF8F: 0x30DE, // ﾏ -> マ
  0xFF90: 0x30DF, // ﾐ -> ミ
  0xFF91: 0x30E0, // ﾑ -> ム
  0xFF92: 0x30E1, // ﾒ -> メ
  0xFF93: 0x30E2, // ﾓ -> モ
  0xFF94: 0x30E4, // ﾔ -> ヤ
  0xFF95: 0x30E6, // ﾕ -> ユ
  0xFF96: 0x30E8, // ﾖ -> ヨ
  0xFF97: 0x30E9, // ﾗ -> ラ
  0xFF98: 0x30EA, // ﾘ -> リ
  0xFF99: 0x30EB, // ﾙ -> ル
  0xFF9A: 0x30EC, // ﾚ -> レ
  0xFF9B: 0x30ED, // ﾛ -> ロ
  0xFF9C: 0x30EF, // ﾜ -> ワ
  0xFF9D: 0x30F3, // ﾝ -> ン (Note: ﾝ can represent both ン and ヲ, but ン is more common)
};

// Helper function to convert half-width katakana to full-width
function katakanaToFullWidth(code) {
  if (katakanaHalfToFull[code]) {
    return String.fromCharCode(katakanaHalfToFull[code]);
  }
  return null;
}

/**
 * Convert half-width Japanese characters to full-width
 * @param {string} str - Input string with half-width characters
 * @returns {string} - String with full-width characters
 */
function toFullWidth(str) {
  if (typeof str !== 'string') {
    return str;
  }

  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = char.charCodeAt(0);

    // Half-width space (U+0020) -> full-width space (U+3000)
    if (code === 0x0020) {
      result += String.fromCharCode(0x3000);
    }
    // Half-width numbers (U+0030-U+0039) -> full-width numbers (U+FF10-U+FF19)
    else if (code >= 0x0030 && code <= 0x0039) {
      result += String.fromCharCode(code + 0xFEE0);
    }
    // Half-width uppercase letters (U+0041-U+005A) -> full-width (U+FF21-U+FF3A)
    else if (code >= 0x0041 && code <= 0x005A) {
      result += String.fromCharCode(code + 0xFEE0);
    }
    // Half-width lowercase letters (U+0061-U+007A) -> full-width (U+FF41-U+FF5A)
    else if (code >= 0x0061 && code <= 0x007A) {
      result += String.fromCharCode(code + 0xFEE0);
    }
    // Half-width Katakana (U+FF66-U+FF9F) -> full-width Katakana
    else if (code >= 0xFF66 && code <= 0xFF9F) {
      const converted = katakanaToFullWidth(code);
      if (converted !== null) {
        result += converted;
      } else {
        result += char;
      }
    }
    // Half-width punctuation and symbols -> full-width
    else if (code >= 0x0021 && code <= 0x007E) {
      result += String.fromCharCode(code + 0xFEE0);
    }
    else {
      result += char;
    }
  }
  return result;
}

// Export for Node.js (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toHalfWidth,
    toFullWidth
  };
}

// Export for Browser (Global variable)
if (typeof window !== 'undefined') {
  window.jpFullhalfConvert = {
    toHalfWidth,
    toFullWidth
  };
}


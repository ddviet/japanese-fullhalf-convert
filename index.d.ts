/**
 * Japanese Full-width / Half-width Converter Library
 * TypeScript type definitions
 */

declare namespace japaneseFullhalfConvert {
  /**
   * Convert full-width Japanese characters to half-width
   * @param str - Input string with full-width characters
   * @returns String with half-width characters
   */
  function toHalfWidth(str: string): string;

  /**
   * Convert half-width Japanese characters to full-width
   * @param str - Input string with half-width characters
   * @returns String with full-width characters
   */
  function toFullWidth(str: string): string;
}

export = japaneseFullhalfConvert;


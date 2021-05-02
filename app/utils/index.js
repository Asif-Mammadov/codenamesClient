class Utils {
  /**
   * Check if an element is in viewport
   *
   * @param {Object} [elementRef]
   * @returns {boolean}
   */
  static isInViewport(elementRef) {
    if (!elementRef) return false;

    const rect = elementRef.current.getBoundingClientRect();
    const inViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    return inViewport;
  }
}

export default Utils;

class Utils {
  /**
   * Check if an element is in viewport
   *
   * @param {Object} elementRef - Reference to the element
   * @returns {boolean} If the element is in viewport or not
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

  /**
   * Check validity of a form control based on the rules provided
   *
   * @param {string} value - Value of the form control
   * @param {Object} rules - Rules for validation
   * @returns {boolean} If the control is value or not
   */
  static checkValidity(value, rules) {
    let isValid = true;
    let error = '';

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
      error = 'This field is required';
      // No need to check other rules if empty
      if (!isValid) return { isValid, error };
    }

    if (rules.email) {
      const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      isValid = pattern.test(value) && isValid;
      error = 'Please enter a valid email';
    }

    if (rules.id) {
      const pattern = /^[0-9]+$/;
      isValid = pattern.test(value) && isValid;
      error = 'Please enter a valid ID';
    }

    if (rules.min) {
      isValid = value.trim().length > rules.min && isValid;
      error = `Password length must be greater than ${rules.min}`;
    }

    return { isValid, error };
  }

  /**
   * Update and return an object with values provided
   *
   * @param {Object} oldObject - The object that needs to be updated
   * @param {Object} updatedValues - Values to update
   * @returns {Object} Updated object
   */
  static updateObject(oldObject, updatedValues) {
    return {
      ...oldObject,
      ...updatedValues
    };
  }

  /**
   * Update and return a form based on changes of an input
   *
   * @param {Object} form - The object that contains the form state
   * @param {string} itemId - ID of the control in object
   * @param {Event} value - Changed value of form control
   * @returns {Object} Updated form object and form validity status
   */
  static valueChangedHandler(form, itemId, value) {
    const { isValid, error } = this.checkValidity(
      value,
      form[itemId].validation
    );

    const updatedFormElement = {
      ...form[itemId],
      ...{
        value: value,
        valid: isValid,
        error: error,
        touched: true
      }
    };
    const updatedForm = this.updateObject(form, {
      [itemId]: updatedFormElement
    });

    let formValid = true;
    for (let id in updatedForm) {
      formValid = updatedForm[id].valid && formValid;
    }
    return { updatedForm, formValid };
  }
}

export default Utils;

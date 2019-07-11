export default {
  phoneNumber: {
    presence: { allowEmpty: false, message: 'is required' },
    // phoneNumber: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

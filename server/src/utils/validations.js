import { body, check } from 'express-validator';

export const loginValidation = [
  body('phone', 'Invalid phone number').matches(/^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/),
  body('password', 'Password must be at least 8 characters long').isLength({
    min: 8,
  }),
  body('password', 'Password can\'t contain more than 20 characters').isLength({
    max: 20,
  }),
];

const userCommonRules = [
  check('name').matches(/^[A-Z][a-zA-Z]*$/).withMessage('Name must start with a capital letter and contain only alphabet letters')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  check('gender', 'Gender must be either "man" or "woman"').isIn(['man', 'woman']),
  check('age').isInt({ min: 14 }).withMessage('Age must be at least 14')
    .isInt({ max: 99 })
    .withMessage('Age can\'t be bigger than 99'),
  check('phone', 'Invalid phone number').matches(/^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/),
  check('interests').isJSON().withMessage('Interests must be a JSON object'),
];

export const registerValidation = [
  ...userCommonRules,
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .isLength({ max: 20 })
    .withMessage('Password can\'t contain more than 20 characters'),
];

export const userUpdateValidation = [
  ...userCommonRules,
];

export const receiverFriendRequestValidation = [
  body('receiverId').isInt().withMessage('Invalid receiver ID'),
];

export const senderFriendRequestValidation = [
  body('senderId').isInt().withMessage('Invalid sender ID'),
];

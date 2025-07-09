const bcrypt = require('bcryptjs');
const passwordFromUser = "password145"; // Simulate user input
const storedHashedPassword = "$2a$10$Q7aoNRtUxXsbZ.t1kXHxvOEZxhWbwE3qBRUhGGs6RNwekj6UwgF.m"; // Example stored hash

bcrypt.compare(passwordFromUser, storedHashedPassword)
  .then(result => {
      console.log('Password match result:', result); // Should be true if the passwords match
  })
  .catch(error => {
      console.error('Error comparing passwords:', error);
  });

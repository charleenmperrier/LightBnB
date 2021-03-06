const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
`, [email])
.then(res => {
  
  return res.rows[0]; // || NULL
});
// .catch not needed here, over in userRoutes.js

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [id])
  .then(res => {
    return res.rows[0]; // || NULL
});
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);

  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.name, user.email, user.password])
  .then(res => {
    return res.rows[0];
  });


}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT properties.*, reservations.*, AVG(property_reviews.rating) as ave_rating
  FROM properties
  JOIN reservations ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2
  `, [guest_id, limit])
  .then(res => {
    return res.rows
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
 
  const queryParams = [];
 
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  // adding WHERE no matter which search field is used
  if (options.city || options.owner_id || options.minimum_price_per_night || options.maximum_price_per_night || options.minimum_rating) {
    queryString += 'WHERE ';
  }

  
  if (options.city) {
    queryParams.push(`%${options.city.toLowerCase()}%`);
    queryString += `lower(city) LIKE $${queryParams.length} AND `;
  }

 
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `owner_id = $${queryParams.length} AND `;
  }

 
  if (options.minimum_price_per_night) {
    queryParams.push(`${parseInt(options.minimum_price_per_night)*100}`);
    queryString += `cost_per_night >= $${queryParams.length} AND `;
  }

 
  if (options.maximum_price_per_night) {
    queryParams.push(`${parseInt(options.maximum_price_per_night)*100}`);
    queryString += `cost_per_night <= $${queryParams.length} AND `;
  }


  // takes off AND from end of last string
  if (options.city || options.owner_id || options.minimum_price_per_night || options.maximum_price_per_night || options.minimum_rating) {
    queryString = queryString.slice(0, -5);
  }
  
 
  queryString += ` GROUP BY properties.id`;


  if (options.minimum_rating) {
    queryParams.push(`${parseInt(options.minimum_rating)}`);
    queryString += ` HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }


  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  
  console.log(queryString, queryParams);

  
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *
  ;
  `, [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, (property.cost_per_night)*100, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.province, property.city, property.country, property.street, property.post_code])
  .then(res => { 
    return res.rows;
  });
}
exports.addProperty = addProperty;

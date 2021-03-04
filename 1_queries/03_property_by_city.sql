SELECT properties.*, AVG(property_reviews.rating) as rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ncouv%'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;
INSERT INTO users (name, email, password)
VALUES ('Neil Young', 'neil_young@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Brian Adams', 'brian_adams@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Celine Dion', 'celime_dion@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Nelly Furtado', 'nelly_furtado@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jann Arden', 'jan_arden@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Neils House', 'This is a description This is a description This is a description This is a description', 'fake photo url', 'another fake photo url', 350, 2, 3, 4, 'Canada', '1 street', 'Quebec City', 'QC', '02020', true),
(1, 'Neils Other House', 'This is a description This is a description This is a description This is a description', 'fake photo url', 'another fake photo url', 650, 3, 5, 6, 'Canada', '2 street', 'Toronto', 'ON', '2uo0i0', true),
(4, 'Nellys House', 'This is a description This is a description This is a description This is a description', 'fake photo url', 'another fake photo url', 450, 1, 2, 2, 'Canada', '3 street', 'Vancouver', 'BC', '9f98r8', true),
(5, 'Janns House', 'This is a description This is a description This is a description This is a description', 'fake photo url', 'another fake photo url', 450, 2, 5, 6, 'Canada', '4 street', 'Calgary', 'AB', '4d4ddd', true),
(5, 'Janns Other House', 'This is a description This is a description This is a description This is a description', 'fake photo url', 'another fake photo url', 650, 1, 1, 3, 'Canada', '5 street', 'Montreal', 'QC', '2uo0i0', true);


INSERT INTO reservations (start_date, end_date, guest_id, property_id)
VALUES ('2021-09-11', '2021-09-26', 2, 2),
('2021-04-01', '2021-04-10', 3, 4),
('2021-08-14', '2021-08-09', 1, 5),
('2021-10-10', '2021-11-10', 5, 1),
('2021-12-23', '2021-12-26', 4, 2);

INSERT INTO property_reviews (message, rating, reservation_id, guest_id, property_id)
VALUES ('LOVED IT!', 5, 1, 2, 2),
('Ok stay', 3, 2, 3, 4),
('Great Location', 4, 3, 1, 5),
('Needs more towels!', 2, 4, 5, 1),
('Will be coming back soon', 5, 5, 4, 2);
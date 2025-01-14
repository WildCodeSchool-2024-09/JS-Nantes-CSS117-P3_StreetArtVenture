CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  zipcode VARCHAR(10) NOT NULL,
  city VARCHAR(100) NOT NULL,
  adress VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  points INT NOT NULL DEFAULT 0,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_connection TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE art_piece (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  adress VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  coordinates POINT NOT NULL,
  is_validated BOOLEAN DEFAULT FALSE NOT NULL,
  is_covered BOOLEAN DEFAULT FALSE NOT NULL,
  description VARCHAR(255),
  points_value INT DEFAULT NULL,
  picture_path VARCHAR(255) NOT NULL
);

CREATE TABLE viewed_art_piece (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  art_piece_id INT UNSIGNED,
  user_id INT UNSIGNED,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (art_piece_id) REFERENCES art_piece(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE reported_art_piece (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  art_piece_id INT UNSIGNED,
  user_id INT UNSIGNED,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (art_piece_id) REFERENCES art_piece(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO user(name, firstname, lastname, email, zipcode, city, adress, password, points, is_admin, creation_date, last_connection) VALUES
('Kertzmann', 'Maddison', 'Kreiger', 'Dewayne21@hotmail.com', '29177-3438', 'Angers', '6501 W North Street', '$argon2id$v=19$m=65536,t=3,p=4$TTMj2Hg8pdN4/z19TChASw$Jv3ly5Ir+lqP9OLanvlpK2aXjSClQvZdkLEPPYqOo48', 1276, true, '2023-01-14 13:22:26', '2024-05-10 00:46:34'),
('Cronin-OReilly', 'Brennon', 'Grant', 'Blaze_Konopelski@yahoo.com', '67946', 'Nantes', '3387 Auer Estate', '$argon2id$v=19$m=65536,t=3,p=4$wtwGeUcr5I58Rhk+17nS3g$1bKMjIB0AoiAI9vKUTXAMcJ3ag7s2yi5eD9J2oS7OuE', 1754, true, '2024-01-10 20:38:10', '2024-08-26 19:03:58'),
('Predovic', 'Armando', 'Jast', 'Garrick_MacGyver@hotmail.com', '10226', 'Angers', '442 Heller Path', '$argon2id$v=19$m=65536,t=3,p=4$P8x2hT4ioiQabs6c7By3gA$lWmfgaNmn0u3HI7a3Q7BdYYsHiLQG3fageV1iiC9ASg', 1578, true, '2024-02-28 10:06:58', '2024-12-07 10:18:33'),
('Sipes', 'Mallory', 'Donnelly', 'Janelle10@hotmail.com', '72333-9054', 'Nantes', '67182 Oak Street', '$argon2id$v=19$m=65536,t=3,p=4$skuhyf7JngwdhDS9GjmdLA$LJX2zC0uIAd4Jb7cAUcrZKZ6UoLZDeW50+w+lRL4wMw', 351, true, '2020-07-31 23:33:24', '2023-04-24 08:38:34'),
('Auer', 'Diego', 'Cremin', 'Myriam96@gmail.com', '91903-0033', 'Angers', '11981 Fausto Fords', '$argon2id$v=19$m=65536,t=3,p=4$tnVDec4xD8cr0WTd07G3hQ$+JBRSlMc89sSFt99KUY0gN0xU6WTyT+jbYo2mtT7yQU', 652, true, '2020-07-19 01:15:57', '2023-11-26 09:11:06'),
('Nienow', 'Adell', 'Runolfsson', 'Lillie.Robel40@yahoo.com', '61139-8425', 'Nantes', '5312 Hunter Falls', '$argon2id$v=19$m=65536,t=3,p=4$xe6vgWDzu0OatLFoB/ZWLQ$G+GQ8TIgDMbDnQVLt0rD1UDaN3TieWYiQsu4EhGHSdE', 1665, true, '2021-04-22 03:19:40', '2022-12-02 16:39:18'),
('Kunze', 'Meggie', 'Pagac', 'Eldon61@gmail.com', '76173', 'Angers', '71400 Rose Manors', '$argon2id$v=19$m=65536,t=3,p=4$Ca/IbRmAGW1aIxp0+oykaA$E0vA0SKQOyB1cqNBJRtSmToluhpLGfjCIC5a74RcgOc', 1836, true, '2024-04-03 05:05:46', '2024-09-26 20:31:17'),
('Larkin', 'Jaunita', 'Lakin', 'Dusty_Luettgen@yahoo.com', '33420-1872', 'Nantes', '728 Mann Coves', '$argon2id$v=19$m=65536,t=3,p=4$7ANFkfinGzmZ4WkaB3vBbg$PSnqgpBLNPQ+UfZCbMOZtmjkBRLjkUXCi3TpQmFVkVk', 1122, true, '2020-05-08 23:22:03', '2024-01-26 20:21:10'),
('Goyette', 'River', 'Lynch', 'Jordyn_Nader@yahoo.com', '71033', 'Angers', '8203 Doyle Cove', '$argon2id$v=19$m=65536,t=3,p=4$Z8P9hVC2pkBUi1PVL82JBQ$9xt4USz0HYPsfyQTUSkvrDh52Ey8z7X/YW/Zv/PlPCo', 1856, true, '2021-03-21 18:34:08', '2024-12-15 07:45:52'),
('Wiegand', 'Destini', 'Stanton-Rosenbaum', 'Lonnie.Cruickshank9@yahoo.com', '74392-0978', 'Nantes', '256 Trudie Valley', '$argon2id$v=19$m=65536,t=3,p=4$2mWZc8TXEt5V2WmmiSwFYA$xrpy9krQF5r5EjsjVXl1t9FxOVw9IhnQZ7xJLWPANyU', 472, true, '2021-07-23 16:52:05', '2021-09-06 02:23:42'),
('McGlynn', 'Austen', 'Labadie-McKenzie', 'Emie.Hane16@hotmail.com', '18009-8931', 'Angers', '2311 Cindy Square', '$argon2id$v=19$m=65536,t=3,p=4$oTpAb/rV8SJfjIpVfRIlmw$JRgZ1MM1AdaZK27zOOnqAaNgtA0DpNGj1cv0O9tRC6k', 1406, false, '2021-10-16 22:34:51', '2022-12-29 05:45:58'),
('Conner-Cummings', 'Fermin', 'Kirlin', 'Jeramie.Rosenbaum22@hotmail.com', '81434-0776', 'Nantes', '761 Monahan Shoals', '$argon2id$v=19$m=65536,t=3,p=4$1jps9/Var0zFIH1OkkMisA$K9LstlodGliYfU+FoSlEhiufvNYIFaOWqfr+XzqWjeA', 1201, false, '2023-06-11 07:01:19', '2023-12-13 07:13:58'),
('Bednar', 'Keshaun', 'Tremblay', 'Heloise.Bartoletti89@yahoo.com', '12029', 'Angers', '94621 Wood Street', '$argon2id$v=19$m=65536,t=3,p=4$8oG2ZUxzfWx2ukq2WBf0fg$54tVun5IiBaqtTUgE88b2c7Q5cyvn0q2LUKXkTes80Y', 1993, false, '2020-05-11 07:17:50', '2023-04-26 13:49:02'),
('Rohan', 'Noe', 'Macejkovic', 'David63@hotmail.com', '66706-1154', 'Nantes', '1321 Smith Freeway', '$argon2id$v=19$m=65536,t=3,p=4$/edMhjdnRSFJtS/pBjbm7g$1hC/5htGDP+3RVMKn5tibJ8aRIvv1AbfjJvHeLu1ar0', 1501, false, '2022-03-03 15:24:33', '2024-09-08 02:58:32'),
('Ledner', 'Ericka', 'Bosco', 'Minerva88@yahoo.com', '79444-7379', 'Angers', '2575 Adrien Valley', '$argon2id$v=19$m=65536,t=3,p=4$XWHHncurTQhArL8YHhXLOw$+D+4A6aGlf19nhTSkwcNkSvwd2yNZfOowvBNWImgpYE', 337, false, '2021-12-30 23:01:57', '2024-10-09 16:51:34'),
('Kautzer', 'Liana', 'Boehm', 'Hunter_Rogahn71@yahoo.com', '28874-7848', 'Nantes', '2313 Spruce Street', '$argon2id$v=19$m=65536,t=3,p=4$BbPwb7DTr4rwHDVdQ4EmzA$CznrT+NdIWhsDlVQhkQGOViLaahOyGyG0NOFAiGT7dI', 1857, false, '2021-06-07 08:34:44', '2022-03-13 18:36:55'),
('Skiles', 'Karina', 'Kautzer', 'Dusty60@yahoo.com', '55135-9621', 'Angers', '8882 Jenkins Groves', '$argon2id$v=19$m=65536,t=3,p=4$sagJCoCRjoKj5RyoBoqhXQ$7TV5K3lAezobpEzEC6WwTnYVberB1sC4+rlIPhfz+s4', 1538, false, '2023-12-27 23:54:09', '2024-01-10 18:53:06'),
('Kassulke', 'Celia', 'Strosin-Hyatt', 'Presley_Kiehn8@yahoo.com', '50397', 'Nantes', '978 Senger View', '$argon2id$v=19$m=65536,t=3,p=4$C5Mp4uK3SCYkxhB+w+MBTw$W4RHb9Ih9KVzn/6D/6Kao5slV30hYqpPp9AEavY+qv0', 216, false, '2024-02-13 09:38:16', '2024-05-30 10:18:57'),
('Klein', 'Julien', 'Schmeler', 'Delia51@yahoo.com', '08886', 'Angers', '537 Maple Drive', '$argon2id$v=19$m=65536,t=3,p=4$jP0H4wH/E+Bp+SzYmxvAXw$sZq3f1HL8yH1lCszfUS1L4fiTY+9QzPMiiRQJhhtcs4', 1586, false, '2023-05-13 14:56:20', '2024-12-05 08:23:50'),
('Towne', 'Kim', 'Hamill', 'Clint_Pouros41@yahoo.com', '25784', 'Nantes', '306 Beech Grove', '$argon2id$v=19$m=65536,t=3,p=4$RBMQTqtpgiNtzxOHyIW35A$Lq+grGNTg/Au0SQRCHYrH13PakUhNKv0fuuWdNm+Rno', 298, false, '2024-05-24 10:35:53', '2024-09-29 06:49:10'),
('Barrows', 'Hyman', 'Ondricka', 'Ricky_Metz14@hotmail.com', '37479', 'Angers', '239 Imogene Fields', '$argon2id$v=19$m=65536,t=3,p=4$25BdxBX3CQJUBBRNfUY9TA$/dczePCxfTJh22vYCX55I7VLPJFQvUu70akup1yQb6Y', 752, false, '2020-01-03 19:49:19', '2021-11-14 01:13:48'),
('Prosacco', 'Liam', 'Spencer', 'Phoebe_Bode56@gmail.com', '25500', 'Nantes', '169 Lester Point', '$argon2id$v=19$m=65536,t=3,p=4$Pxq9xErZTVx6HjlJ/k5LEQ$8D93Ndz9OmkrEDBPLFxNL3e/Z83QGhjkS95/74usOMc', 619, false, '2021-12-09 18:47:17', '2022-08-03 04:48:45'),
('Baumbach', 'Abbie', 'Bernhard', 'Keshaun_Witting@hotmail.com', '80038', 'Angers', '73703 Cherry Close', '$argon2id$v=19$m=65536,t=3,p=4$OlHxDDIDU0qlActGl2yY3w$ifTc5PPNC/WR+/Jh14dxUeGb3BleoB7OfFYnWDTe2pI', 1304, false, '2023-10-13 23:04:10', '2024-03-02 06:06:18'),
('Skiles', 'Sterling', 'Upton', 'Tatyana.Schmeler13@gmail.com', '03752', 'Nantes', '6688 Lurline Orchard', '$argon2id$v=19$m=65536,t=3,p=4$pTKyM+Kfk/9qa0M+Yo0dNA$OQU4NycPCqwKcH7hKvrloib0TKl5YatyQGw6oZt6VQQ', 1820, false, '2020-04-08 20:26:58', '2021-11-06 15:15:22'),
('Heaney', 'Sandy', 'Ryan', 'Leopoldo_Cole@gmail.com', '65007-0890', 'Angers', '661 Smith Rest', '$argon2id$v=19$m=65536,t=3,p=4$O19VDcEFg4n1LaxxW8mUew$Rgwma3fHIaYIdJkct27rdFaNz+d3uw9ShZYV4OBU0JI', 817, false, '2020-10-05 14:17:11', '2023-12-01 09:54:53'),
('Cole', 'Eusebio', 'McLaughlin', 'Kelli.Keeling@gmail.com', '75773', 'Nantes', '139 Gwendolyn Gardens', '$argon2id$v=19$m=65536,t=3,p=4$jCn4kuAVXh2nLgxtmviBlw$W2UO5S8x8+YQZO0EkAfsS8TZyAKtG1nciQ5rcu0PHyo', 1596, false, '2020-10-03 12:58:04', '2022-01-19 12:06:19'),
('Legros', 'Wilburn', 'Von', 'Mikel_Goodwin@gmail.com', '06209-5877', 'Angers', '2776 Edmond Garden', '$argon2id$v=19$m=65536,t=3,p=4$aeJU3kMh+0P8Xbe6g/h/Eg$0UW6u76QdMn6e78R9idl6X6D/FEBOAl5QTyk6h8TpQw', 72, false, '2022-10-29 07:44:37', '2023-05-06 08:35:13'),
('Spinka', 'Bertrand', 'Crist', 'Stanton.Corwin63@gmail.com', '99977', 'Nantes', '170 Gregg Mews', '$argon2id$v=19$m=65536,t=3,p=4$GjkLX4nuDAP0HupfwGGb1A$yLpLRo7kzwlM2JjCKTrVyg6WzxcAIkeMNfmxkK8JW7s', 1231, false, '2021-05-17 02:34:21', '2022-07-20 14:06:10'),
('Stroman', 'Ora', 'Schuppe', 'Newton81@hotmail.com', '77984', 'Angers', '8312 Franklin Road', '$argon2id$v=19$m=65536,t=3,p=4$0FGURvE99vnXSevipLlE+Q$NbqW4I/YISs4L5l08IguJh04MjH5TPjESk9OYXN2JRk', 991, false, '2024-04-24 17:03:13', '2024-07-03 14:51:27'),
('McKenzie', 'Maeve', 'Hand', 'Lyric_Weissnat87@yahoo.com', '22266-7814', 'Nantes', '11089 Gaetano Fall', '$argon2id$v=19$m=65536,t=3,p=4$8xoxhbb2MUW0uyhZSSFoqw$d8WNYH4n2NdbcsNFg0xtFTghMEyFXuBQ8lOFViWBFk0', 1290, false, '2023-11-27 16:32:08', '2024-07-29 02:40:57'),
('Pouros', 'Elton', 'Lynch', 'Frederik.OConnell99@yahoo.com', '90688-4834', 'Angers', '479 Antonio Lodge', '$argon2id$v=19$m=65536,t=3,p=4$pgCjqyoT1IgLuKCXciQxhQ$TVyS4W7MhdyLEt9aZyMMlFHpTirMMCOVgB2R3zWS4zU', 309, false, '2021-05-30 15:13:16', '2023-05-23 15:17:10'),
('Kozey', 'Allie', 'Daugherty', 'Electa_Kertzmann2@gmail.com', '53666', 'Nantes', '90079 Silver Street', '$argon2id$v=19$m=65536,t=3,p=4$8HCduQXowJDZIxCOlARjUA$LYlvlTlJP1FeRnaw3voX8cZzq5Vd3hjxmgsnIynRHq0', 137, false, '2021-04-10 20:05:32', '2023-10-20 01:27:57'),
('Thiel', 'Abby', 'Hilpert', 'Demond59@gmail.com', '37408-7376', 'Angers', '432 Koss Squares', '$argon2id$v=19$m=65536,t=3,p=4$si52znl4M90PetcKRePaFA$tCv5o/tGkDdkOquTw01k7bqZ7JGyV2MMt7jaYctSiFQ', 1936, false, '2021-03-13 19:32:09', '2021-11-09 03:31:55'),
('Ritchie', 'Herbert', 'Satterfield', 'Ludwig_Ebert@yahoo.com', '51867-7258', 'Nantes', '35040 Roberts Walk', '$argon2id$v=19$m=65536,t=3,p=4$ewb0TVnymkQAb5lhEenzFw$uIWkQqwTYq3SksppJAx4m7wN4pi85UC12KU+RCgGVdM', 511, false, '2022-04-04 17:35:41', '2023-11-28 11:19:21'),
('Lebsack', 'Nakia', 'Fritsch', 'Vivien_Corkery34@hotmail.com', '81693', 'Angers', '509 1st Avenue', '$argon2id$v=19$m=65536,t=3,p=4$QXUgnaF7/pa4SiPNq4UCNA$ivi/vIcom1yWaCKUHip1k42TmLDo1DHT8dPJv20ix9E', 1542, false, '2021-07-03 20:37:26', '2024-04-26 22:19:58'),
('Klocko', 'Marc', 'Rice', 'Meaghan24@yahoo.com', '08283-1120', 'Nantes', '9010 Shaniya Place', '$argon2id$v=19$m=65536,t=3,p=4$f3C02M1yvh2kJArAl41p6Q$rMpMogXKj1g40yx5qRK5wXhYJiPFtGeJt9Xo3+bFI2U', 245, false, '2020-04-30 22:13:08', '2020-10-03 14:59:05'),
('Cole', 'Kenna', 'Altenwerth', 'Amani_Cummings2@gmail.com', '77171', 'Angers', '7906 Howell Canyon', '$argon2id$v=19$m=65536,t=3,p=4$6kIALDlgIlRn2o4A7ugeCg$xUAvniT4s8tJ1B1DrlBWe6mewMZmsk9E2oEdPcaOSqA', 1120, false, '2022-01-30 15:01:03', '2022-08-19 06:47:39'),
('Abshire', 'Teresa', 'Jones', 'Beaulah42@gmail.com', '42428', 'Nantes', '307 Sycamore Avenue', '$argon2id$v=19$m=65536,t=3,p=4$XSXfjA5IGbypJSiX5QNuyg$TAGqqAxHLqxd/H5I20LwZl8bA34lru6QWQtSuktBNYQ', 853, false, '2023-08-21 23:15:10', '2023-11-18 16:29:52'),
('Bechtelar', 'Katrine', 'Tromp', 'Devon24@gmail.com', '85089', 'Angers', '704 Kiehn Dale', '$argon2id$v=19$m=65536,t=3,p=4$ym35K8PKdmlFa13X5CYGgA$0EwWTlTV1gFtwZjonyGMa0+HK4kQEReaNSdaPi6Y5OI', 1383, false, '2024-05-03 19:59:11', '2024-05-19 08:15:28'),
('Rath', 'Jarret', 'Pfannerstill', 'Zella_Koepp17@yahoo.com', '40890', 'Nantes', '26548 Bergnaum Bridge', '$argon2id$v=19$m=65536,t=3,p=4$PAIAdSNtOn2v1wJU/OzV+A$DgDIn/m/3FRqquLAqeVduCuL279zjqTVOIDAtznTTLc', 1437, false, '2024-03-13 09:38:53', '2024-08-16 14:41:16'),
('OConner', 'Ernestine', 'Altenwerth', 'Ophelia_Hilll@gmail.com', '11731', 'Angers', '3312 Cremin Flats', '$argon2id$v=19$m=65536,t=3,p=4$XjhWmUPTmc45L6ssf99KKw$rIgE9tGp6SZ26mifOgJioXofpsIJjpapg4GsVZE0Wjk', 571, false, '2021-05-24 19:17:27', '2022-08-24 07:33:48'),
('Hermann', 'Irwin', 'Kertzmann', 'Calista63@yahoo.com', '14667', 'Nantes', '8310 Ash Road', '$argon2id$v=19$m=65536,t=3,p=4$kBLIxyozz81RC+3xF7gYXA$W5q5GzsB7l4XAOtnp0ua2ONeOHf9tfW5kW9cOA7L1lw', 327, false, '2020-08-01 22:59:48', '2021-08-01 01:26:49'),
('VonRueden', 'Mose', 'Mayer', 'Janessa26@yahoo.com', '81731', 'Angers', '78938 Price Street', '$argon2id$v=19$m=65536,t=3,p=4$taYxdi/gy0uCqRA0dQJpJA$WAlAooXhsMd3RCdY+UW8cN1fXED3UyWGtYKKGmgSjb4', 1678, false, '2024-10-01 02:40:46', '2024-10-05 18:05:39'),
('Bashirian', 'Jamison', 'Fahey', 'Betty_Moore44@yahoo.com', '47475', 'Nantes', '8179 Alexys Well', '$argon2id$v=19$m=65536,t=3,p=4$9Hf/zRTAtmXcByqFMhWwdA$3aqakxXaOzdQyyU3d07PHwTv8PEADu1XsJRL/iyZdHE', 1856, false, '2020-02-20 05:23:12', '2023-03-17 20:38:02'),
('Effertz', 'Jeanie', 'Hilpert', 'Donald_Rodriguez-Bauch@gmail.com', '60923', 'Angers', '4923 Main Street N', '$argon2id$v=19$m=65536,t=3,p=4$j5IblrSMo+pvlckds3FarQ$kLjenGGnXVrgPmWjfbrO2TBhAiGLKOa9onu8Y0gfcYk', 560, false, '2021-10-23 00:21:55', '2023-06-24 18:06:29'),
('Hoppe-DAmore', 'Sheila', 'Gulgowski', 'Brody26@yahoo.com', '00350', 'Nantes', '287 Moises Rest', '$argon2id$v=19$m=65536,t=3,p=4$iPMDw9L5EUPykRaP+vZ6Aw$TaUrRPAgwedup2RylUuxqTHDYYZr4lVQmoOu+Tw+1l8', 815, false, '2023-10-29 23:46:12', '2024-04-25 10:20:56'),
('Emard', 'Scot', 'Vandervort', 'Anissa_Schuppe7@gmail.com', '66336-6953', 'Angers', '75533 Chestnut Grove', '$argon2id$v=19$m=65536,t=3,p=4$bod6qyklgWYTZFyXVHp6nQ$EjiyhrrLXkuhau+G940K6p1l1oVjEEhjg4R+Q0WVoGA', 1505, false, '2021-01-16 21:45:18', '2022-07-05 03:03:26'),
('Abbott', 'Zion', 'Kling', 'Marjorie.Reichert5@gmail.com', '46240', 'Nantes', '1276 Springfield Close', '$argon2id$v=19$m=65536,t=3,p=4$tDftKLC+OsA4kLnjLU+4gw$HWeOanRjx01Dm4m4f1s55zseM9Bksf9tdNdXVvusnCw', 622, false, '2021-03-08 10:58:46', '2022-06-14 20:05:07'),
('Stoltenberg', 'Cornelius', 'DAmore', 'Emilio_Boyer@gmail.com', '89463-0219', 'Angers', '3768 Ryan Cliff', '$argon2id$v=19$m=65536,t=3,p=4$DH+238RRXMVbXS/IrctN5g$QNzjh2J2RAOo9/jI356ERZDYOWUcc5KeNnQ7Au71shk', 446, false, '2023-09-02 13:20:57', '2023-10-09 09:08:51'),
('Schimmel', 'Alexandra', 'Crist-Bins', 'Edmund19@yahoo.com', '31325', 'Nantes', '805 McKenzie Junctions', '$argon2id$v=19$m=65536,t=3,p=4$7esW4Fmc9kAonhieVZSktg$ywSTOmJ3Z3Wgudud2CI8kU0yJjAFT+CYdn1dVpkDCjE', 160, false, '2022-04-02 20:50:56', '2023-04-21 06:15:33'),
('Tromp', 'Abbey', 'Glover', 'Anais_Schmeler24@hotmail.com', '10128', 'Angers', '555 Cali Trail', '$argon2id$v=19$m=65536,t=3,p=4$4yO5o70CXC2GT5I1Ho1UHQ$2hrZoKLce6KClgy5Qcb/urPB8xLbXSiENjLxtG6dAK8', 1442, false, '2020-12-13 11:20:32', '2021-11-18 21:38:20'),
('Kunze', 'Regan', 'Greenfelder', 'Herminia92@hotmail.com', '59087-0018', 'Nantes', '99789 Lucy Village', '$argon2id$v=19$m=65536,t=3,p=4$7Gn9Te5iuZ95ee3qvsqXrw$vt1MejC62nbXWDvsgi5ThB3GoDxekJjtIq3S6SE2/2Y', 1640, false, '2021-04-17 20:41:17', '2022-03-16 08:06:12'),
('Reinger', 'Janis', 'Kuhic', 'Briana.Weber2@gmail.com', '34180', 'Angers', '536 Forest Road', '$argon2id$v=19$m=65536,t=3,p=4$2UgIglbC+jT3BUVKLu5XzA$6mQ0VpfgWE0dT/GcvKgo/xisCKp7wuhE6P3X+o5Dej0', 305, false, '2023-11-20 16:14:34', '2024-11-05 02:06:49'),
('Aufderhar', 'Devyn', 'Kertzmann', 'Sophia.Rau@hotmail.com', '17053', 'Nantes', '4280 The Spinney', '$argon2id$v=19$m=65536,t=3,p=4$PxMn/KI17fAf3IIPwDJqAw$H2nxdZipMhn+qsDryGsQ6R8dvxorLZrqruQqAmZNIfk', 1613, false, '2021-06-24 22:38:59', '2024-05-04 01:48:34'),
('Barrows', 'Ima', 'Wintheiser', 'Toby.Marks91@gmail.com', '69430', 'Angers', '968 W 12th Street', '$argon2id$v=19$m=65536,t=3,p=4$/tnbKsVoLzPtHsyarcPlrQ$R6CC+neIBGKo3wOUvDO9lCh0tIkaHW0WX8Guwz6I9W4', 1618, false, '2022-01-23 09:46:26', '2023-04-21 19:10:17'),
('Gottlieb', 'Linda', 'Runte', 'Daija.Ziemann16@gmail.com', '01249-5090', 'Nantes', '51800 Hoppe Light', '$argon2id$v=19$m=65536,t=3,p=4$F9uE/dQBzM+m7WZsFMZcGA$8J5DTeFW/VT2dYtMg10vnPv7VVy+XyT7ft8KC4ThBnU', 690, false, '2024-11-05 23:43:14', '2024-11-27 17:45:27'),
('Doyle', 'Beth', 'Boehm', 'Winona_Labadie@hotmail.com', '29529-2883', 'Angers', '862 Blanda Branch', '$argon2id$v=19$m=65536,t=3,p=4$ubDc5nlQehkouldS6Heklg$EYxsfqFySf6jxd+njZ0WJGldR8ksJ/hk8UyBhAyFx9k', 1859, false, '2022-03-29 15:31:05', '2022-05-23 05:00:52'),
('Ullrich', 'Nels', 'Buckridge', 'Turner35@gmail.com', '40315', 'Nantes', '884 Glover Park', '$argon2id$v=19$m=65536,t=3,p=4$w9hcItH9mepa49p3KjOUhA$8RblJP9L65Uh2apOjaoutVteUJsISFb6xD3Tm3HzE30', 1594, false, '2022-10-30 22:55:35', '2022-12-16 17:40:53'),
('OConnell', 'Gaetano', 'Farrell', 'Tillman72@gmail.com', '70694', 'Angers', '69173 Mraz Union', '$argon2id$v=19$m=65536,t=3,p=4$vqfmUBYEwI7dVSvJMaWQRA$7OsGuIXrrNnqLBXowF5MDqCYQcADlmMtZuCZjqjX7AU', 360, false, '2020-08-12 15:46:58', '2021-12-24 16:07:40'),
('Casper', 'Dorian', 'Fahey', 'Rogers.Zboncak@gmail.com', '03475-4143', 'Nantes', '9708 Mraz Lock', '$argon2id$v=19$m=65536,t=3,p=4$fd27YxWvULx6i/AArh0APQ$9rVTpilje6wBpTE5E3ZdYS9xZ+prTI1mKQcpmrexla0', 754, false, '2021-02-24 21:59:31', '2022-11-16 09:18:38'),
('McLaughlin', 'Kira', 'Yost-Schuppe', 'Holden_Greenholt@gmail.com', '78198-9727', 'Angers', '562 Highland Avenue', '$argon2id$v=19$m=65536,t=3,p=4$IUGQncMREj2BHdj42MH+lg$sAJqBxA/iCSzGRAAi9wOu0lCGy+wSpCMu5f1LKMAI+A', 1513, false, '2020-07-13 04:58:04', '2024-10-28 12:42:48'),
('Hintz', 'Renee', 'Kutch', 'Winifred.Ebert@yahoo.com', '24454-5500', 'Nantes', '18634 Graham Extensions', '$argon2id$v=19$m=65536,t=3,p=4$ngSeSaoPvvPuN5t/q8N1yw$ECmIn+Vcyz+3DeheOXC+h9/be5HRyy+YIjYlcf9oXF0', 323, false, '2023-02-05 01:20:19', '2024-01-14 07:59:28'),
('Emard', 'Mandy', 'Wintheiser', 'Roslyn_Armstrong82@yahoo.com', '00217-9023', 'Angers', '62750 Moss Lane', '$argon2id$v=19$m=65536,t=3,p=4$D7APLqWx4nRjsnNBfSpgQQ$6w/8Kt0fvbF6mxsbPShhhfNm79buTBub22KgcDzLgEg', 1010, false, '2022-03-12 02:05:41', '2022-08-30 09:49:58'),
('Bernier', 'Jeremie', 'Hintz', 'Julius_Wunsch98@gmail.com', '58666-7523', 'Nantes', '228 Rafael Crossing', '$argon2id$v=19$m=65536,t=3,p=4$fGSF67mYw/xQrESrvI5KXg$EiMli39uGeS3G+xghcgz4YmuufxS65BBBGY8ZgfqYIk', 174, false, '2020-07-13 15:50:12', '2022-12-06 04:30:23'),
('Doyle-Yost', 'Ally', 'Rosenbaum', 'Lilla28@gmail.com', '12511-2177', 'Angers', '4505 Beatty Corners', '$argon2id$v=19$m=65536,t=3,p=4$FUbXl3xMUcuyCjZGfsH/sg$m7NCd8GHc3jvTGOx7flq6UUhG8eMVsqa0bw/otd571o', 538, false, '2021-09-30 01:34:34', '2022-07-24 09:09:39'),
('Reichert', 'Grady', 'Rogahn', 'Joe23@hotmail.com', '41093-6112', 'Nantes', '2938 Schmeler Ramp', '$argon2id$v=19$m=65536,t=3,p=4$ZPGUEm7j5JopA7K5e01tEQ$L76Vw2EwijNPFnwsfJM6GTVJ5mc3cVjXfoYpj3xXaN8', 378, false, '2022-11-06 18:39:44', '2024-10-07 19:55:13'),
('Mayert', 'Dereck', 'Wiza-Bradtke', 'Bettye_Heathcote@hotmail.com', '52707-5849', 'Angers', '14237 Schumm Trace', '$argon2id$v=19$m=65536,t=3,p=4$VPTSztONt7QGyBEZjXbUag$XCooAnnR2p1l/2snkT+EeuIcR9xJp9y69LLhvh4nl+E', 956, false, '2021-10-19 03:49:30', '2022-08-19 04:46:50'),
('Feest', 'Destiny', 'Smith', 'Kane_Kautzer86@yahoo.com', '61847-5849', 'Nantes', '41855 Church Close', '$argon2id$v=19$m=65536,t=3,p=4$rPGQ9D1VMdd/4LKqP+AqeA$ASM++svMOYwoYdG5cMEtH2f/Nt4GcT6UdladsSZI+/g', 1853, false, '2023-11-16 18:27:30', '2024-03-18 08:51:59'),
('Kohler', 'Estefania', 'Rosenbaum', 'Verona85@gmail.com', '84424', 'Angers', '399 Orval Pass', '$argon2id$v=19$m=65536,t=3,p=4$cE05VzCV9JM3oeu4qCMJRg$gyEV5I1huHP2CF7QQKCS5Zl1TTZzjzcqvqR+YupAkrA', 519, false, '2022-04-25 10:55:11', '2023-04-04 06:39:14'),
('Towne', 'Fredy', 'Abernathy', 'Bethany.Kessler@gmail.com', '77803', 'Nantes', '1021 Main Street W', '$argon2id$v=19$m=65536,t=3,p=4$UEeOrzVavi85qYbjI83+oQ$yaLRJbhdIPhRxdqOnCGu/asbsakhDjz+NenEy4P7le0', 1660, false, '2021-08-04 03:57:36', '2022-09-16 06:25:38'),
('Balistreri-Thompson', 'Shanie', 'Bruen', 'Brant_Heller@hotmail.com', '97488-4633', 'Angers', '6502 Osborne Underpass', '$argon2id$v=19$m=65536,t=3,p=4$3H+pBBUSQOMCq1S2c+vCkw$KkZRQXOnJP02kOIaeJNkFF0Tg1gaJbmh6Xifu90bOzE', 57, false, '2021-09-27 16:55:40', '2022-08-02 15:28:57'),
('Rogahn', 'Annette', 'Heidenreich', 'Merle.McCullough@yahoo.com', '51660', 'Nantes', '25506 Ernser Port', '$argon2id$v=19$m=65536,t=3,p=4$z+FTi8liknSuFioeQX6p8A$c0vZrUbypZsCHeUi9+YysdRjPbQTWrPdNYYMlIcWYE4', 120, false, '2022-07-06 06:15:45', '2024-04-22 09:35:20'),
('Mitchell', 'Ethelyn', 'Bogan', 'Hannah52@gmail.com', '34146', 'Angers', '814 Jaren Run', '$argon2id$v=19$m=65536,t=3,p=4$bzQOh4hCf7TUn3yqJ11Huw$9O66WN3qToh9rR/Ok4XYQNGE2fRk3BMvP3ONUgYriHU', 1381, false, '2021-06-11 19:18:55', '2023-02-15 02:13:35'),
('Corkery', 'Stacey', 'Witting', 'Kade_Herman@yahoo.com', '98194-6553', 'Nantes', '50056 Alexa Cove', '$argon2id$v=19$m=65536,t=3,p=4$fUpEeZiwruU7nhDX5T03iw$eYM6Z78VIVKgZH9ojf9c7a8E0v6fog3pTR4vMuXdcI4', 1497, false, '2020-07-05 10:03:07', '2024-01-03 12:04:39'),
('Armstrong', 'Jolie', 'Sauer', 'Wilburn34@yahoo.com', '78515-7016', 'Angers', '24197 Conroy Fall', '$argon2id$v=19$m=65536,t=3,p=4$2nibxMVfICFw1N1SnI4vhA$X6KQDNUGj1va6Xrw0HtS3etCSfZdhek67dqFss3CGkg', 1409, false, '2023-08-15 17:56:14', '2023-12-19 18:45:44'),
('Hermann', 'Hulda', 'McLaughlin-Schmeler', 'Ryann.Gorczany@gmail.com', '88866-2257', 'Nantes', '154 Gordon Street', '$argon2id$v=19$m=65536,t=3,p=4$akI4LnO26tOcqKDO0Reumg$eYOvkmK7zdRsjR3Ruvzm6NweGJgJyFvZO4nj6jkHTnc', 1568, false, '2022-08-11 20:25:31', '2024-08-27 14:07:31'),
('Hermiston', 'Thurman', 'Veum', 'Rick63@gmail.com', '24877-4603', 'Angers', '8015 Streich Valleys', '$argon2id$v=19$m=65536,t=3,p=4$IGU0XhxZ/v0DWZl5AIQb1w$DRqMFeXzfcVrg7ENT+z40EdXi/9oVdWknvQMIA9+ClY', 952, false, '2021-05-16 15:15:01', '2022-09-14 22:04:26'),
('Stroman', 'Seamus', 'Gleason', 'Daron98@hotmail.com', '92948-6824', 'Nantes', '49525 Tara Underpass', '$argon2id$v=19$m=65536,t=3,p=4$a24vGTcr+Z9PhX9yPpyXog$rG1HUN2C3xH2dFZXgjkmhkRLmbBZDVJjvjlEiK7legA', 1800, false, '2021-10-01 14:13:40', '2022-10-24 08:07:49'),
('Paucek', 'Carmella', 'Bartoletti', 'Josefa98@hotmail.com', '56212-7299', 'Angers', '9395 Kenyatta Spurs', '$argon2id$v=19$m=65536,t=3,p=4$oMF0P8CnRIS59O9bKnoDnA$lgqu6Oc1H9s6DDn1ofOavIdmfQVoNGRhthNSFYHriZs', 1990, false, '2023-01-04 06:21:39', '2023-06-21 16:56:10'),
('Donnelly', 'Marcella', 'Cartwright', 'Kaitlin_Gerhold72@gmail.com', '45107-3477', 'Nantes', '88745 E Central Avenue', '$argon2id$v=19$m=65536,t=3,p=4$urBF/d1buJprZcgtbfep0Q$qKkTSmNgb3mQhn6Yuw0enu518P0uP5ShdKxVPwwP6XA', 1866, false, '2024-06-25 01:48:15', '2024-10-23 12:38:27'),
('Steuber', 'Hortense', 'Bergstrom', 'Beth25@yahoo.com', '08569-5192', 'Angers', '2908 Botsford Spring', '$argon2id$v=19$m=65536,t=3,p=4$2OSFFtlzhKS15nkrboFj5Q$+ChgE1lU8GGdUa6DzHQpheOVynctJOD0y3+Y4yBqsnI', 1393, false, '2020-11-27 18:17:18', '2023-09-26 17:57:00'),
('Casper', 'Juanita', 'Christiansen', 'Stephania53@yahoo.com', '24625', 'Nantes', '51379 Clifton Point', '$argon2id$v=19$m=65536,t=3,p=4$0t8dLJgx/sqiqr94OOy7tQ$NiUcVo7uXsxZM16VsZmt0GwJy/IIDYN8VVdf8hC5tBY', 871, false, '2020-09-30 09:18:22', '2022-09-09 09:28:46'),
('McGlynn', 'Arturo', 'Lynch', 'Rex8@gmail.com', '54006', 'Angers', '43365 N Center Street', '$argon2id$v=19$m=65536,t=3,p=4$j9DE1hsKCIhO4Cpn7XGTRw$PHDsXBmDck1ET6X1mT3oEMa/goB+6UIOq1IS/fB9jzk', 307, false, '2021-01-12 12:37:02', '2022-08-08 19:46:19'),
('Glover', 'Celestine', 'DuBuque', 'Tamia45@hotmail.com', '17919', 'Nantes', '50226 Brown Meadows', '$argon2id$v=19$m=65536,t=3,p=4$uCphVa4GTuRyCw2XQ92jkQ$PoCVnlbdPLBD6wMraSYaQ9Val6cpXYFdxxnsEIMg2VY', 380, false, '2021-04-04 18:48:08', '2024-09-04 14:57:43'),
('Bartell', 'Bridget', 'Herzog', 'Geovany56@hotmail.com', '53147', 'Angers', '839 Michael Ridge', '$argon2id$v=19$m=65536,t=3,p=4$5o87jR1NGBWRXTL2ZA2iSg$qud6T3zTgBssftrg79OO9Z1PdCSXLBn7qOnLilMR1Xw', 1368, false, '2020-09-19 23:10:35', '2022-02-22 05:43:43'),
('Dooley', 'Kennith', 'Herzog', 'Armand72@gmail.com', '45237-1345', 'Nantes', '437 Gardner Fords', '$argon2id$v=19$m=65536,t=3,p=4$oeN7W/hH0jJw9lTOpFlIbA$tMoCHaUdFdb1s2OVVZ1LgAwnZMe1FgSdy8h9x7XK23s', 243, false, '2022-10-17 06:48:22', '2023-07-07 01:50:26'),
('Beer', 'Patricia', 'Bosco', 'Alisa.Baumbach40@gmail.com', '29499', 'Angers', '9550 Yessenia Junction', '$argon2id$v=19$m=65536,t=3,p=4$A/oH5+PkkiLS7f2t+sYgeA$RIO3926M54cyPrfX4XcZwZyCWL0pCdV7vq8NqCAK0sU', 610, false, '2022-03-22 18:28:56', '2023-11-03 12:23:46'),
('Schumm', 'Verda', 'Bradtke', 'Daija.Wiza54@gmail.com', '72573', 'Nantes', '3961 St Georges Road', '$argon2id$v=19$m=65536,t=3,p=4$5zwEPAjlOOd4mvxA3nva/g$L3pc7DhyJPrrhAmQ16dIAnh6V3t5SBnZQpIkCndKjwM', 820, false, '2021-04-08 18:15:45', '2021-09-11 15:48:30'),
('Robel', 'Laverne', 'Lindgren', 'Grover73@hotmail.com', '87748-6050', 'Angers', '372 W Front Street', '$argon2id$v=19$m=65536,t=3,p=4$DcdWa5G7cmrFsS8K2Zym7A$JtigByKkSH3IF8GBMNNkhSuR7VeV/fJY6Z1ZjeCN36c', 884, false, '2023-08-16 01:52:27', '2024-04-03 05:48:34'),
('Schinner', 'Ruby', 'Powlowski', 'Lucile_Mayert@hotmail.com', '73276-7509', 'Nantes', '603 Paucek Ferry', '$argon2id$v=19$m=65536,t=3,p=4$uFeuTJR1z+M9XvRkesgeHA$5T1m8Rx2IefCYXZNWIgMOQtK9vUvkADTtVY/+te8Ep4', 1724, false, '2022-06-25 21:53:55', '2023-05-05 15:46:31'),
('Moen', 'Clementina', 'Walter', 'Jalen7@hotmail.com', '94496', 'Angers', '28915 Braun Lake', '$argon2id$v=19$m=65536,t=3,p=4$EjaKKFrikIgeulggcI8piw$ZO6IRz5Xs+kR4rlHWOdPGx4KPHWa+QQbB4G7S3TEjGU', 669, false, '2021-08-08 09:18:18', '2022-08-04 12:27:14'),
('Simonis', 'Maryjane', 'Schuster', 'Favian12@yahoo.com', '96958-3623', 'Nantes', '98109 Gottlieb Islands', '$argon2id$v=19$m=65536,t=3,p=4$3nqrmZlaIchUhonRp9VCBQ$7yLXtA/iKgANsP98l8+LOGIYPhD/7e/TwggpDfOoatM', 1731, false, '2020-03-09 02:19:08', '2020-12-16 18:42:55'),
('Block', 'Claire', 'Rowe', 'Billie.Nikolaus90@gmail.com', '06257', 'Angers', '38267 Cedar Street', '$argon2id$v=19$m=65536,t=3,p=4$xQTPkmgMYcs86c/wD44PJQ$1l4+YGK98Qs9C70VsTgPFAPX990ydVi/cR+vDjwC7J0', 1805, false, '2023-10-10 00:53:48', '2024-05-05 16:14:39'),
('Hilll', 'Marlin', 'Lakin', 'Eldridge_Homenick42@yahoo.com', '28561', 'Nantes', '668 Cedar Avenue', '$argon2id$v=19$m=65536,t=3,p=4$syIZ2Oaq1r3Byigdn0cfLw$b/CiS8l2tP2MagwGzwmiOiH7sZ3AyxWDgpbnOjWuZT0', 22, false, '2024-09-14 03:23:52', '2024-10-01 13:00:58'),
('Abbott-Spencer', 'Arnulfo', 'Trantow', 'Milo.Crona76@yahoo.com', '92955-7828', 'Angers', '17857 Lake Road', '$argon2id$v=19$m=65536,t=3,p=4$gbIynXwOg1jn06OxxnQoiA$cPKHQemSS+qS4YCRcM1/8QS06MhALmu3URNknWq0ekE', 1755, false, '2023-07-17 00:39:57', '2023-08-28 12:24:50'),
('Heaney', 'Camren', 'Marquardt', 'Helen_Wiegand@hotmail.com', '65868', 'Nantes', '75034 Tamara Course', '$argon2id$v=19$m=65536,t=3,p=4$hAoG5UG/d7QwDw5z2VZAWg$bJZ0dhrEW6GThFjl6TUbN0YFHKXAgknjfb+eEe1a1Hc', 250, false, '2023-04-13 21:05:50', '2024-06-04 17:14:43'),
('Windler', 'Gordon', 'Graham', 'Emilio_Purdy@gmail.com', '41930-6638', 'Angers', '98244 Schroeder Cliff', '$argon2id$v=19$m=65536,t=3,p=4$xMmKLJjJs8g4MCGX63EKFw$k40Q2UGSmFBbdvqf330nVjPUDwz4ocYDT3gFFXWcqvo', 652, false, '2023-09-18 06:57:00', '2023-12-19 22:44:29'),
('Wunsch', 'Jesus', 'Stokes', 'Kole_Denesik@yahoo.com', '83148-1860', 'Nantes', '346 Cloyd Expressway', '$argon2id$v=19$m=65536,t=3,p=4$fwD1KLRLTY6EmdNPW2lt/Q$8ItFUB8JWrJ1zJS6Z3Kz/p6LeXI8Z4BFnpQ3MiGUvlg', 845, false, '2022-08-23 10:28:26', '2023-03-21 20:59:37'),
('Walter', 'Brain', 'Gislason', 'Keely20@hotmail.com', '65144-2179', 'Angers', '2871 Marquardt Stream', '$argon2id$v=19$m=65536,t=3,p=4$O4UShHhPcGHe2D4n60EUzg$pO4O3+vASeVKjY5SsdmxiWMVlVvIeUB66mDVHaB+wJ8', 429, false, '2022-10-19 04:18:03', '2023-05-30 08:49:52'),
('Lang', 'Mylene', 'Kub', 'Kayley5@gmail.com', '41643', 'Nantes', '512 Marlon Trafficway', '$argon2id$v=19$m=65536,t=3,p=4$AWaJ+cMkvIbktfOAmJbx+Q$jPXe6FUFCwsSDDlqhF3wi6jVjEqqZw8PRslf0L4Omxo', 1102, false, '2023-10-23 19:43:10', '2024-01-30 01:51:16');

INSERT INTO art_piece (name, picture_path , adress, city, coordinates, is_validated, is_covered, description, points_value)
VALUES
  ('Révolte des Couleurs', "/assets/images/art_piece_1.jpg", 'Rue de la Liberté', "Nantes" , POINT(47.218637, -1.553616), TRUE, FALSE, 'Oeuvre vibrante qui évoque la lutte pour la liberté.', 10),
  ('Aube Nouvelle', "/assets/images/art_piece_1.jpg", 'Boulevard de la République', "Nantes", POINT(47.210244, -1.554298), FALSE, FALSE, 'Mural représentant un lever de soleil avec des tons chauds.', 20),
  ('Fragment du Temps', "/assets/images/art_piece_1.jpg", 'Place du Commerce', "Nantes", POINT(47.214348, -1.556412), TRUE, TRUE, 'Street art en 3D, une immersion dans évolution du temps.', 50),
  ('Racines Urbaines', "/assets/images/art_piece_1.jpg", 'Quai des Tuileries', "Nantes", POINT(47.220347, -1.547512), TRUE, FALSE, 'Graffiti inspiré par les racines des arbres entrelacées avec la ville.', 10),
  ('Silence Électrique', "/assets/images/art_piece_1.jpg", 'Avenue de la République', "Nantes", POINT(47.211111, -1.561111), FALSE, FALSE, 'Mural qui donne une impression de calme dans un monde bruyant.', 100),
  ('Le Dernier Souffle', "/assets/images/art_piece_1.jpg", 'Rue de la Gare', "Nantes", POINT(47.211889, -1.565298), TRUE, FALSE, 'Street art illustrant les équilibres fragile de la nature.', 20),
  ('Ombre des Murs', "/assets/images/art_piece_1.jpg", 'Rue du Bouffay', "Nantes", POINT(47.213221, -1.561444), FALSE, TRUE, 'Oeuvre représentant des silhouettes perdues dans les ombres.', 50),
  ('Évasion Électrique', "/assets/images/art_piece_1.jpg", 'Rue du Port', "Nantes", POINT(47.218234, -1.560222), TRUE, TRUE, 'Peinture murale futuriste, évasion dans une société trop normée.', 100),
  ('Regard Perçant', "/assets/images/art_piece_1.jpg", 'Place des Halles', "Nantes", POINT(47.210635, -1.564292), FALSE, FALSE, 'Graffiti qui capte avec des yeux percants.', 50),
  ('Unité des Contraires', "/assets/images/art_piece_1.jpg", 'Rue des Chantiers', "Nantes", POINT(47.215577, -1.552344), TRUE, FALSE, 'Oeuvre sur les opposés : lumière et obscurité, mouvement et calme.', 10),
  ('Esprit de la Rue', "/assets/images/art_piece_1.jpg", 'Place du Ralliement', "Angers", POINT(47.473474, -0.552174), TRUE, FALSE, 'Graffiti célébrant la rue et des artistes de passage.', 10),
  ('Le Poids des Mots', "/assets/images/art_piece_1.jpg", 'Rue de la Maine', "Angers", POINT(47.474002, -0.551231), FALSE, FALSE, 'Mural sur les paroles et les silences, et leur poids dans la société.', 20),
  ('Mélancolie Acier', "/assets/images/art_piece_1.jpg", 'Rue du Boulevard', "Angers",  POINT(47.476254, -0.553448), TRUE, TRUE, 'Street art représentant des pièces de métal et acier, symbole industrialisation.', 50),
  ('Voix du Passé', "/assets/images/art_piece_1.jpg", 'Avenue de la Gare', "Angers",  POINT(47.470319, -0.557824), TRUE, FALSE, 'Mural représentant les anciens habitants de la ville et leur influence sur le présent.', 100),
  ('Vagues de Révolte', "/assets/images/art_piece_1.jpg", 'Rue des Violettes', "Angers",  POINT(47.475883, -0.550438), FALSE, FALSE, 'Oeuvre qui exprime des idées de révolte contre les normes sociales à travers des vagues.', 20),
  ('Sous la Peau de la Ville', "/assets/images/art_piece_1.jpg", 'Rue des Ponts', "Angers",  POINT(47.473312, -0.548576), TRUE, TRUE, 'Street art qui dévoile les structures cachées et oubliées de la ville.', 50),
  ('Oeil du Cyclone', "/assets/images/art_piece_1.jpg", 'Hôtel de Ville', "Angers",  POINT(47.474834, -0.549197), FALSE, FALSE, 'Graffiti représentant un œil immense, vision du monde moderne vu comme un cyclone.', 10),
  ('Dans le Vent', "/assets/images/art_piece_1.jpg", 'Rue de la Croix de Lorette', "Angers",  POINT(47.472874, -0.552905), TRUE, FALSE, 'Oeuvre inspirée par la légèreté du vent, avec des formes abstraites.', 100),
  ('Ultime Danse', "/assets/images/art_piece_1.jpg", 'Place du Général Leclerc', "Angers",  POINT(47.470958, -0.553544), FALSE, FALSE, 'Peinture murale qui capture un mouvement de danse effréné.', 20),
  ('Changement des Époques', "/assets/images/art_piece_1.jpg", 'Rue de la Fonderie', "Angers",  POINT(47.472273, -0.551391), TRUE, FALSE, 'Graffiti qui dépeint les changements sociaux et les transitions culturelles.', 50);

INSERT INTO reported_art_piece (art_piece_id, user_id, timestamp)
VALUES
  (3, 45, '2020-03-15 09:23:00'),
  (18, 29, '2021-07-21 14:12:00'),
  (10, 72, '2022-01-09 17:45:00'),
  (8, 11, '2022-11-05 11:30:00'),
  (1, 58, '2023-04-10 16:05:00'),
  (15, 93, '2023-08-18 13:22:00'),
  (7, 16, '2020-06-25 10:40:00'),
  (5, 63, '2021-10-03 18:55:00'),
  (12, 87, '2022-12-17 15:10:00'),
  (20, 34, '2024-01-15 08:20:00');

INSERT INTO viewed_art_piece (art_piece_id, user_id, timestamp)
VALUES
  (7, 42, '2020-03-15 09:23:00'),
  (2, 56, '2021-07-21 14:12:00'),
  (13, 89, '2022-01-09 17:45:00'),
  (5, 12, '2022-11-05 11:30:00'),
  (1, 33, '2023-04-10 16:05:00'),
  (8, 24, '2023-08-18 13:22:00'),
  (15, 67, '2020-06-25 10:40:00'),
  (3, 99, '2021-10-03 18:55:00'),
  (10, 8, '2022-12-17 15:10:00'),
  (18, 53, '2024-01-15 08:20:00');
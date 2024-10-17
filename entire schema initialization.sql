DROP SCHEMA `cozyfirm`;
CREATE SCHEMA `cozyfirm`;

CREATE TABLE `cozyfirm`.`user` (
`user_id` INT AUTO_INCREMENT NOT NULL,
`username` VARCHAR(60) NOT NULL,
`password` VARCHAR(60) NOT NULL,
`first_name` VARCHAR(60) NOT NULL,
`last_name` VARCHAR(60) NOT NULL,
PRIMARY KEY (`user_id`));

CREATE TABLE `cozyfirm`.`user_admin`(
    `admin_level` INT NOT NULL,
     `user_id` INT NOT NULL,
    CONSTRAINT `fk_user`
        FOREIGN KEY (`user_id`)
        REFERENCES user(`user_id`)
);

CREATE TABLE `cozyfirm`.`blog`(
    `blog_id` INT AUTO_INCREMENT NOT NULL,
    `blog_title` varchar(255) NOT NULL,
    `blog_date` date NOT NULL,
    `blog_description` TEXT NOT NULL,
    `blog_tag` varchar(255) NOT NULL,
    `blog_image_path` VARCHAR(255),
    `user_id` int NOT NULL,
    PRIMARY KEY (`blog_id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
);

CREATE TABLE `cozyfirm`.`wishlist`(
    `wishlist_id` INT AUTO_INCREMENT NOT NULL,
    `item_count` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`wishlist_id`),
    CONSTRAINT `fk_wishlist`
        FOREIGN KEY (`user_id`)
        REFERENCES `cozyfirm`.`user`(`user_id`)
);

CREATE TABLE `cozyfirm`.`furniture` (
`furniture_id` INT AUTO_INCREMENT NOT NULL,
`furniture_name` VARCHAR(60) NOT NULL,
`brand` VARCHAR(60) NOT NULL,
`description` VARCHAR(255) NOT NULL,
`furniture_image_path` VARCHAR(255),
`furniture_buy_link` VARCHAR(255) NOT NULL,
`length` DOUBLE NOT NULL,
`height` DOUBLE NOT NULL,
`width` DOUBLE NOT NULL,
`price` DOUBLE NOT NULL,
`material` VARCHAR(60) NOT NULL,
`color` VARCHAR(60) NOT NULL,
PRIMARY KEY (`furniture_id`, `furniture_name`));




CREATE TABLE `cozyfirm`.`recommend`(
    `user_id` int NOT NULL,
    `furniture_id` int NOT NULL,
    `furniture_name` VARCHAR(60) NOT NULL,
    `recommend_date` date NOT NULL,
    CONSTRAINT `fk_admin`
        FOREIGN KEY (`user_id`)
        REFERENCES `cozyfirm`.`user` (`user_id`),
    CONSTRAINT `fk_furniture`
        FOREIGN KEY (`furniture_id`, `furniture_name`)
        REFERENCES `cozyfirm`.`furniture` (`furniture_id`, `furniture_name`)
);

CREATE TABLE `cozyfirm`.`write`(
    `user_id` INT NOT NULL,
    `blog_id` INT NOT NULL,
    `update_time` date,
    CONSTRAINT `fk_user2`
		FOREIGN KEY (`user_id`)
		REFERENCES `cozyfirm`.`user`(`user_id`),
    CONSTRAINT `fk_blog`
		FOREIGN KEY (`blog_id`)
		REFERENCES `cozyfirm`.`blog`(`blog_id`)
);

CREATE TABLE `cozyfirm`.`about`(
    `blog_id` INT NOT NULL,
    `furniture_id` int NOT NULL,
    `furniture_name` varchar(60) NOT NULL,
    CONSTRAINT `fk_blog2`
		FOREIGN KEY (`blog_id`)
		REFERENCES `cozyfirm`.`blog`(`blog_id`),
    CONSTRAINT `fk_furniture2`
		FOREIGN KEY (`furniture_id`, `furniture_name`)
		REFERENCES `cozyfirm`.`furniture` (`furniture_id`, `furniture_name`)
);

CREATE TABLE `cozyfirm`.`contain` (
    `wishlist_id` INT NOT NULL,
    `furniture_id` INT NOT NULL,
    `furniture_name` varchar(60) NOT NULL,
    CONSTRAINT `fk_wishlist2`
		FOREIGN KEY (`wishlist_id`)
		REFERENCES `cozyfirm`.`wishlist`(`wishlist_id`),
	CONSTRAINT `fk_furniture3`
		FOREIGN KEY (`furniture_id`, `furniture_name`)
		REFERENCES `cozyfirm`.`furniture` (`furniture_id`, `furniture_name`)
);

CREATE TABLE `cozyfirm`.`CREATE` (
    `user_id` INT NOT NULL,
    `wishlist_id` INT NOT NULL,
    `add_date` date NOT NULL,
    CONSTRAINT `fk_user3`
		FOREIGN KEY (`user_id`)
		REFERENCES `cozyfirm`.`user`(`user_id`),
    CONSTRAINT `fk_wishlist3`
		FOREIGN KEY (`wishlist_id`)
		REFERENCES `cozyfirm`.`wishlist`(`wishlist_id`)
);





INSERT INTO `cozyfirm`.`user` (`user_id`, `username`, `password`, `first_Name`, `last_Name`)
VALUES
  (1, 'johnDoe', 'password123', 'John', 'Doe'),
  (2, 'janeSmith', 'ilovecats', 'Jane', 'Smith'),
  (3, 'bobJohnson', 'qwertyuiop', 'Bob', 'Johnson'),
  (4, 'aliceBrown', 'letmein', 'Alice', 'Brown'),
  (5, 'mikeDavis', 'mike123', 'Mike', 'Davis'),
  (6, 'emilyTaylor', 'emily88', 'Emily', 'Taylor'),
  (7, 'sarahLee', 'sarah123', 'Sarah', 'Lee'),
  (8, 'kevinWhite', 'kevin99', 'Kevin', 'White'),
  (9, 'lisaHall', 'lisa123', 'Lisa', 'Hall'),
  (10, 'tomHarris', 'tom1234', 'Tom', 'Harris');
  
INSERT INTO `cozyfirm`.`user_admin` (`admin_level`, `user_id`)
VALUES
  (1, 1),  -- John Doe is an admin
  (0, 2),  -- Jane Smith is not an admin
  (1, 3),  -- Bob Johnson is an admin
  (0, 4),  -- Alice Brown is not an admin
  (1, 5),  -- Mike Davis is an admin
  (0, 6),  -- Emily Taylor is not an admin
  (1, 7),  -- Sarah Lee is an admin
  (0, 8),  -- Kevin White is not an admin
  (1, 9),  -- Lisa Hall is an admin
  (0, 10);  -- Tom Harris is not an admin
    
INSERT INTO `cozyfirm`.`blog` (`blog_id`, `blog_title`, `blog_tag`, `blog_date`, `blog_description`, `blog_image_path`, `user_id`)
VALUES
(1, 'My Experience with Herman Miller Embody Chair', 'office chair', '2022-01-01', 
"I recently purchased the Herman Miller Embody chair, and I must say, it has completely transformed my workspace experience. The first thing that struck me about this chair is its remarkable comfort level, which I would easily rate as a 10/10. From the moment I sat down, I could feel the meticulous design and engineering that went into making this chair. The Embody chair is specifically crafted to promote good posture and reduce strain on your back, making it an ideal choice for anyone who spends long hours at their desk. The seat and backrest are incredibly supportive, adjusting to your movements to ensure continuous comfort throughout the day. 
Moreover, the aesthetics of the Herman Miller Embody chair are just as impressive as its functionality. The sleek design and high-quality materials make it a standout piece in any office setting. The chair’s ergonomic features, such as the pixelated support system and adjustable settings, cater to a wide range of body types and preferences, ensuring that every user can customize their seating experience to their liking. Since using this chair, I've noticed a significant improvement in my posture and a reduction in the fatigue and discomfort I used to experience with my previous office chair. Overall, the Herman Miller Embody chair is a fantastic investment for anyone looking to enhance their comfort and productivity in the workspace.", 
'/furniture_images/herman_miller_embody_chair.jpg', 1),
(2, 'Working in Style with Steelcase Leap Chair', 'office chair', '2022-01-05', 
"The Steelcase Leap V2 chair is a standout in the realm of ergonomic office furniture, designed to provide exceptional comfort and support for extended periods of use. One of its key features is the LiveBack technology, which allows the backrest to mimic the natural movement of the spine, ensuring continuous support as you shift positions throughout the day. The adjustable lumbar support and customizable seat depth cater to a wide range of body types, making it an ideal choice for diverse office environments. Additionally, the Leap V2 offers a flexible seat edge that reduces pressure on the back of the legs, promoting better circulation and reducing discomfort during long hours of sitting.
Another notable aspect of the Leap V2 is its sustainability. Steelcase has incorporated eco-friendly materials and processes into the chair's design, ensuring that it meets stringent environmental standards. The chair is up to 98% recyclable by weight, and its modular design makes it easy to replace individual components rather than discarding the entire chair if something wears out. Users also appreciate the Leap V2 for its quiet, smooth-rolling casters and sleek, modern aesthetic, which fits seamlessly into a variety of office decors. Overall, the Steelcase Leap V2 stands out as a top-tier ergonomic chair, balancing comfort, support, and sustainability to enhance any workspace.", 
'/furniture_images/steelcase_leap.jpg', 2),
(3, 'Dining in Style with West Elm Dining Table', 'table', '2022-01-10', 
"The West Elm Parsons table has been a great addition to my dining room. Its modern design and sturdy build are truly impressive. From the moment I set it up, the table has been a centerpiece of style and functionality. The sleek lines and high-quality finish complement a variety of dining room decors, making it versatile and timeless.
Not only does it look fantastic, but it also stands up well to daily use. The solid construction ensures durability, and the spacious surface is perfect for both everyday meals and special gatherings. The West Elm Parsons table strikes a perfect balance between form and function, making it a valuable addition to any home looking to combine elegance with practicality.", 
'/furniture_images/west_elm_dining_table.jpg', 3),
(4, 'My Experience with Herman Miller Sayl Chair', 'office chair', '2022-01-15', 
"I upgraded to the Herman Miller Sayl chair, and it has significantly improved my productivity. From the unique design to the exceptional support, this chair has exceeded my expectations. The Sayl chair's ergonomic design promotes good posture, which has greatly reduced the back pain I used to experience with my old chair.
The innovative suspension backrest provides flexibility and support, adapting to my movements and ensuring comfort throughout the day. The design is not only functional but also visually striking, adding a modern touch to my workspace. Highly recommend it to anyone looking to enhance their office setup.", 
'/furniture_images/herman_miller_sayl_chair.jpg', 4),
(5, 'Working from Home with the Steelcase Gesture Chair', 'office chair', '2022-01-20', 
"I recently purchased the Steelcase Gesture chair, and it has helped me stay focused and productive while working from home. The chair’s design is sleek and modern, fitting perfectly into my home office. The Gesture chair offers unparalleled support with its adjustable armrests and backrest, which adapt to various postures and activities.
Since using the Gesture chair, I've noticed a significant improvement in my comfort and concentration levels. The chair’s ability to support my body in multiple positions allows me to work longer hours without feeling fatigued. It is a worthwhile investment for anyone serious about creating an ergonomic home office.", 
'/furniture_images/steelcase_gesture_chair.jpg', 5),
(6, 'Dining in Style with Pottery Barn Benchwright Table', 'table', '2022-01-22', 
"The Pottery Barn Benchwright table is a standout piece in my dining room. The modern design and sturdy build are impressive, offering both style and durability. The table's craftsmanship is evident in its robust construction and fine detailing, making it a focal point for family meals and gatherings.
What I love most about the Benchwright table is its versatility. It fits seamlessly with both contemporary and traditional decor, adding a touch of elegance to any setting. The table is spacious and comfortable, providing ample space for dining and entertaining. It's a fantastic addition that enhances both the functionality and aesthetics of my dining space.", 
'/furniture_images/pottery_barn_benchwright_table.jpg', 6),
(7, 'My Experience with the Ergohuman High-Back Chair', 'office chair', '2022-01-25', 
"I recently purchased the Ergohuman High-Back chair, and it has made a significant difference in my comfort and focus during long work hours. The chair’s ergonomic design is tailored to support the spine, reducing strain and promoting better posture. The high-back feature provides excellent neck and back support, which is crucial for extended periods of sitting.
The chair is not only functional but also stylish, with a sleek design that enhances my office decor. Its adjustable settings allow for a customized seating experience, ensuring maximum comfort throughout the day. Overall, the Ergohuman High-Back chair is a great investment for anyone looking to improve their workspace ergonomics.", 
'/furniture_images/ergohuman_high-back_chair.jpg', 7),
(8, 'Working in Style with the Haworth Zody Chair', 'office chair', '2022-01-28', 
"I recently purchased the Haworth Zody chair, and it has exceeded my expectations. The ergonomic design is a game-changer, providing outstanding support and comfort throughout the workday. The Zody chair’s unique asymmetrical lumbar support allows for personalized adjustments, ensuring that my back is well-supported in any position.
In addition to its ergonomic benefits, the Zody chair features a sleek, modern design that fits perfectly in my office. The quality materials and construction make it a durable and reliable choice. Overall, the Zody chair has significantly improved my work comfort and productivity, making it an excellent addition to any office.", 
'/furniture_images/haworth_zody_chair.jpg', 8),
(9, 'Ergonomic Excellence with the Humanscale Freedom Chair', 'office chair', '2022-01-30', 
"I recently purchased the Humanscale Freedom chair, and it has taken my productivity to the next level. The ergonomic design is exceptional, offering excellent support and comfort. The chair’s automatic recline mechanism adjusts to my weight and movement, providing a seamless and comfortable sitting experience.
The Freedom chair’s minimalist design is both stylish and functional, making it a perfect fit for my office. The high-quality materials and craftsmanship ensure durability and longevity. Since using this chair, I’ve experienced a significant reduction in back pain and discomfort, allowing me to focus more on my work. The Humanscale Freedom chair is a top-notch choice for anyone seeking ergonomic excellence in their workspace.", 
'/furniture_images/humanscale_freedom_chair.jpg', 9),
(10, 'Dining in Style with the Room & Board Parsons Table', 'table', '2022-02-01', 
"The Room & Board Parsons table is a fantastic addition to my dining room. The modern design and sturdy build are truly impressive. The table’s clean lines and high-quality construction make it a versatile piece that complements a variety of decor styles.
One of the standout features of the Parsons table is its durability. It is built to withstand daily use while maintaining its elegant appearance. The spacious surface is perfect for both everyday meals and larger gatherings. Overall, the Room & Board Parsons table combines style and functionality, making it a valuable addition to any dining space.", 
'/furniture_images/room_&_board_parsons_table.jpg', 10);

  
INSERT INTO `cozyfirm`.`wishlist` (wishlist_ID, item_count, user_id)
VALUES
  (1, 3, 1),
  (2, 2, 2),
  (3, 5, 3),
  (4, 1, 1),
  (5, 4, 4),
  (6, 2, 2),
  (7, 3, 3),
  (8, 1, 1),
  (9, 5, 4),
  (10, 4, 2);
  
INSERT INTO `cozyfirm`.`furniture` (furniture_id, furniture_name, brand, description, furniture_image_path, furniture_buy_link, length, height, width, price, material, color)
VALUES
  (1, 'Herman Miller Embody Chair', 'Herman Miller', 'Ergonomic office chair', '/furniture_images/herman_miller_embody_chair.jpg', 
  "https://store.hermanmiller.com/office-chairs-ergonomic-chairs/embody-chair/4737.html?lang=en_US&sku=100147357", 45, 30, 25, 1499.99, 'Mesh', 'Black'),
  (2, 'Steelcase Leap Chair', 'Steelcase', 'Ergonomic office chair', '/furniture_images/steelcase_leap.jpg', 
  "https://store.steelcase.com/leap", 45, 30, 25, 1299.99, 'Fabric', 'Gray'),
  (3, 'West Elm Dining Table', 'West Elm', 'Modern dining table', '/furniture_images/west_elm_dining_table.jpg', 
  "https://www.westelm.com/products/ainsley-dining-table-h12769/?pkey=cdining-tables&position=0", 72, 30, 36, 999.99, 'Wood', 'Walnut'),
  (4, 'Herman Miller Sayl Chair', 'Herman Miller', 'Ergonomic office chair', '/furniture_images/herman_miller_sayl_chair.jpg', 
  "https://store.hermanmiller.com/office-chairs-ergonomic-chairs/sayl-chair/2294.html?lang=en_US&sku=100077501", 45, 30, 25, 999.99, 'Mesh', 'Black'),
  (5, 'Steelcase Gesture Chair', 'Steelcase', 'Ergonomic office chair', '/furniture_images/steelcase_gesture_chair.jpg', 
  "https://store.steelcase.com/gesture?cclcl=en_US", 45, 30, 25, 1499.99, 'Fabric', 'Gray'),
  (6, 'Pottery Barn Benchwright Table', 'Pottery Barn', 'Modern dining table', '/furniture_images/pottery_barn_benchwright_table.jpg', 
  "https://www.potterybarn.com/products/benchwright-extending-dining-table-blackened-oak/?pkey=cbenchwright-dining-collection&subGroupId=benchwright-extending-dining-table-blackened-oak-SPAF-finish-gray-wash-wood-finish&position=0", 72, 30, 36, 1299.99, 'Wood', 'Walnut'),
  (7, 'Ergohuman High-Back Chair', 'Ergohuman', 'Ergonomic office chair', '/furniture_images/ergohuman_high-back_chair.jpg', 
  "https://ergohuman.store/products/ergohuman-office-chair-black-black", 45, 30, 25, 999.99, 'Mesh', 'Black'),
  (8, 'Haworth Zody Chair', 'Haworth', 'Ergonomic office chair', '/furniture_images/haworth_zody_chair.jpg', 
  "https://store.haworth.com/products/zody-upholstered-office-chair", 45, 30, 25, 1299.99, 'Fabric', 'Gray'),
  (9, 'Humanscale Freedom Chair', 'Humanscale', 'Ergonomic office chair', '/furniture_images/humanscale_freedom_chair.jpg', 
  "https://www.humanscale.com/products/freedom-task-chair-headrest-configurator.cfm?configuration=F211GCF57XFSHNSC", 45, 30, 25, 1499.99, 'Mesh', 'Black'),
  (10, 'Room & Board Parsons Table', 'Room & Board', 'Modern dining table', '/furniture_images/room_&_board_parsons_table.jpg', 
  "https://www.roomandboard.com/catalog/dining-and-kitchen/tables/parsons-tables", 72, 30, 36, 999.99, 'Wood', 'Walnut');
  
INSERT INTO `cozyfirm`.`recommend` (`user_id`, `furniture_id`, `furniture_name`, `recommend_date`)
VALUES
  (1, 1, 'Herman Miller Embody Chair', '2022-01-01'),
  (2, 2, 'Steelcase Leap Chair', '2022-01-05'),
  (3, 3, 'West Elm Dining Table', '2022-01-10'),
  (4, 4, 'Herman Miller Sayl Chair', '2022-01-15'),
  (5, 5, 'Steelcase Gesture Chair', '2022-01-20'),
  (6, 6, 'Pottery Barn Benchwright Table', '2022-01-22'),
  (7, 7, 'Ergohuman High-Back Chair', '2022-01-25'),
  (8, 8, 'Haworth Zody Chair', '2022-01-28'),
  (9, 9, 'Humanscale Freedom Chair', '2022-01-30'),
  (10, 10, 'Room & Board Parsons Table', '2022-02-01');
  
INSERT INTO `cozyfirm`.`write` (`user_id`, `blog_id`, `update_time`)
VALUES
  (1, 1, '2022-01-01'),
  (2, 2, '2022-01-05'),
  (3, 3, '2022-01-10'),
  (1, 4, '2022-01-12'),
  (2, 5, '2022-01-15'),
  (3, 6, '2022-01-18'),
  (1, 7, '2022-01-20'),
  (2, 8, '2022-01-22'),
  (3, 9, '2022-01-25'),
  (1, 10, '2022-01-28');
  
INSERT INTO `cozyfirm`.`about` (`blog_id`, `furniture_id`, `furniture_name`)
VALUES
  (1, 1, 'Herman Miller Embody Chair'),
  (2, 2, 'Steelcase Leap Chair'),
  (3, 3, 'West Elm Dining Table'),
  (4, 4, 'Herman Miller Sayl Chair'),
  (5, 5, 'Steelcase Gesture Chair'),
  (6, 6, 'Pottery Barn Benchwright Table'),
  (7, 7, 'Ergohuman High-Back Chair'),
  (8, 8, 'Haworth Zody Chair'),
  (9, 9, 'Humanscale Freedom Chair'),
  (10, 10, 'Room & Board Parsons Table');

INSERT INTO `cozyfirm`.`contain` (`wishlist_id`, `furniture_id`, `furniture_name`)
VALUES
  (1, 1, 'Herman Miller Embody Chair'),
  (2, 2, 'Steelcase Leap Chair'),
  (3, 3, 'West Elm Dining Table'),
  (4, 4, 'Herman Miller Sayl Chair'),
  (5, 5, 'Steelcase Gesture Chair'),
  (6, 6, 'Pottery Barn Benchwright Table'),
  (7, 7, 'Ergohuman High-Back Chair'),
  (8, 8, 'Haworth Zody Chair'),
  (9, 9, 'Humanscale Freedom Chair'),
  (10, 10, 'Room & Board Parsons Table');
  
INSERT INTO `cozyfirm`.`CREATE` (`user_id`, `wishlist_id`, `add_date`)
VALUES
  (1, 1, '2022-01-01'),
  (2, 2, '2022-01-05'),
  (3, 3, '2022-01-10'),
  (1, 4, '2022-01-12'),
  (2, 5, '2022-01-15'),
  (3, 6, '2022-01-18'),
  (1, 7, '2022-01-20'),
  (2, 8, '2022-01-22'),
  (3, 9, '2022-01-25'),
  (1, 10, '2022-01-28');
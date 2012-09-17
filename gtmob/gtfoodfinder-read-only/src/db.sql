-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(20) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `xing` int(11), 
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

--
-- Table structure for table `meals`
--

CREATE TABLE IF NOT EXISTS `meals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float(11) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `ingredients` text NOT NULL,
  `star1` int(11) DEFAULT 0,
  `star2` int(11) DEFAULT 0,
  `star3` int(11) DEFAULT 0,
  `star4` int(11) DEFAULT 0,
  `star5` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `timestamp` datetime NOT NULL,
  `mid` int(11) NOT NULL, 
  `uid` varchar(20) NOT NULL,
  `helpful`  int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;


--
-- Table structure for table `dininghall`
--

CREATE TABLE IF NOT EXISTS `dininghall` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lat` double NOT NULL,
  `lgn` double NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;


--
-- Table structure for table `friendlist`
--

CREATE TABLE IF NOT EXISTS `friendlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) NOT NULL,
  `fid` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Table structure for table `usermeals`
--

CREATE TABLE IF NOT EXISTS `usermeal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) NOT NULL,
  `fid` int(11) NOT NULL,
  `cid` int(11),
  `rating` int(11),
  `bookmarked` boolean DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Table structure for table `usercomments`
--

CREATE TABLE IF NOT EXISTS `usercomment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) NOT NULL,
  `cid` int(11) NOT NULL,
  `helped` boolean DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;


--
-- Table structure for table `userbookmarks`
--

CREATE TABLE IF NOT EXISTS `userbookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) NOT NULL,
  `mid` int(11) NOT NULL,
  `disabled` boolean DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;


--
-- Table structure for table `chefrecommand`
--

CREATE TABLE IF NOT EXISTS `recommand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL,
  `timestamp` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;



--
-- Dumping data for table `comments`
--
INSERT INTO `users` (`id`, `picture`) VALUES
('yfeng38', '../pic/user/1.jpg'),
('rfeng8', '../pic/user/2.jpg');

INSERT INTO `meals` (`name`, `price`, `picture`, `ingredients`) VALUES
('Black Forest Ham', 6.99, '../pic/food/1.jpeg', 'Simply delicious. This flavorful sandwich is packed with lean Black Forest ham and served on your favorite freshly baked bread, like 9 grain wheat or Italian. All this mouthwatering greatness for less than 6g of fat. Can’t beat that.'),
('Pepperoni Pizza', 7.99, '../pic/food/2.jpeg', 'Drain pineapple. Save the juice. Wash, peel and grate the carrots. Add raisins and mix. Mix yogurt, salad dressing and pineapple juice. Pour over salad, stir, chill and serve.'),
('Veggie Pizza', 8.29, '../pic/food/3.jpeg', 'Tuna Pesto Salad Wrap Sandwiches is an easy and flavorful recipe perfect for lunchboxes. Make Pesto Tuna Salad and serve it in tortillas for quick and easy wrap sandwiches.'),
('Meat Pizza', 3.99, '../pic/food/4.jpeg', 'Ham Salad Wraps are a quick and easy sandwich recipes that is freezable for school lunches. Simple Ham Salad Wrap sandwiches can be made ahead of time and frozen.'),
('Super Supreme Pizza', 10.99, '../pic/food/5.jpeg', 'Tomato Brie Basil Sandwich is an easy and luscious five ingredient summer sandwich recipe. Make this easy sandwich recipe using fresh summer tomatoes and basil leaves.'),
('Country Italian', 6.45, '../pic/food/6.jpeg', 'Chicken Bacon Pita Sandwiches are delicious, quick and easy no cook recipe. Easy sandwich recipe uses chicken, pita breads, bacon, mayo, tomatoes, and avocado.'),
('Cheese Pizza', 7.99, '../pic/food/7.jpeg', 'Broccoli Slaw Wraps are quick and easy sandwiches that start with broccoli slaw. Easy five ingredient recipe using broccoli slaw in a wrap sandwich.'),
('Beef Sandwich', 4.5, '../pic/food/8.jpeg', 'Turkey Cobb Salad Wrap Sandwiches is a quick and easy recipe using leftover turkey or chicken. Simple wrap sandwich recipe using turkey, bacon, blue cheese, and avocado.');


INSERT INTO `dininghall` (`lat`, `lgn`, `address`) VALUES
(33.777720, -84.397531, 'Georgia Tech');

INSERT INTO `comments` (`comment`, `timestamp`, `mid`, `uid`) VALUES
('This is awesome', LOCALTIMESTAMP(), 1, 1);

INSERT INTO `recommand` (`mid`, `date`) VALUES
(1, LOCALTIMESTAMP()),
(2, LOCALTIMESTAMP());
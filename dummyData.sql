--Dummy data
INSERT INTO "public"."state_level_organization"("state_level_organization_id","name","state")
VALUES
(5,E'Department of Public Instruction',E'VT'),
(4,E'Agency of Education',E'VT'),
(6,E'Superintendent of Public Instruction',E'OH'),
(3,E'Ohio State Board of Education',E'OH'),
(1,E'Dept. of Education',E'MN');

--
INSERT INTO "public"."requirements"("requirements_id","name","description","duration","notification_1_time","notification_2_time")
VALUES
(1,E'Initial TTT Workshop',E'the initial Train the Trainer workshop',0,0,0),
(2,E'Sign TTT Terms of Agreement',E'Sign Papers',10,3,7),
(3,E'Observed/Coached Training Session',NULL,330,150,270),
(4,E'Certification Workshop',E'Get certified',365,160,340),
(5,E'Check And Connect Training 1',E'Get trained',365,160,340),
(6,E'Check And Connect Training 2',E'Get trained',730,540,670),
(7,E'Recertification',E'Get recertified',730,540,670);

--
INSERT INTO "public"."national_trainer"("national_trainer_id","first_name","last_name","user_name","password","email","title","status","pw_reset_token","pw_reset_time")
VALUES
(4,E'Ross',E'Qualey',E'Ross',E'$2b$10$B0roQhtvdf313ohA99Tyru4aU20LS7.cs0mDZmH.Vkbbr3m9rw.4m',E'qualeyro@gmail.com',NULL,TRUE,NULL,E'2018-09-12 22:28:53.477423'),
(5,E'Nate',E'Carroll',E'Nate',E'$2b$10$CKWXVCTp/5NxVnit8exy5uHa0DT7mbBJaiORC907kK1Zbn99k9l8y',E'ntc238@gmail.com',E'Software Engineer',TRUE,NULL,E'2018-09-12 22:28:53.477423'),
(6,E'Grace',E'Kasahara',E'Grace',E'$2b$10$EFdD1/h14NZmkLk/P1Rcz.Y4L24fsAha5qx1.ICMRnkkeXqQ1F6eC',E'gracekasahara@gmail.com',E'Software Engineer',TRUE,NULL,E'2018-09-12 22:28:53.477423'),
(7,E'Isaac',E'Negatu',E'Isaac',E'$2b$10$NsUPjAdJsZxBiQLPAB9SseQzZ7zJVt2dnFx1taKKAx7uttHpZQO2u',E'isaac.negatu@gmail.com',E'Software Engineer',TRUE,NULL,E'2018-09-12 22:28:53.477423');


--
INSERT INTO "public"."local_trainers_requirements"("local_trainers_requirements_id","local_trainers_ref_id","cohort_requirements_ref_id","national_trainer_ref_id","completed","notes","scheduled_date","notification_1_sent","notification_2_sent")
VALUES
(1,13,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(2,13,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(3,13,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(4,13,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(5,13,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(6,13,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(7,14,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(8,14,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(9,14,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(10,14,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(11,14,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(12,14,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(13,15,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(14,15,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(15,15,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(16,15,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(17,15,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(18,15,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(19,16,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(20,16,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(21,16,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(22,16,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(23,16,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(24,16,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(25,17,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(26,17,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(27,17,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(28,17,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(29,17,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(30,17,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(31,18,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(32,18,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(33,18,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(34,18,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(35,18,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(36,18,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(37,19,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(38,19,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(39,19,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(40,19,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(41,19,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(42,19,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(43,20,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(44,20,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(45,20,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(46,20,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(47,20,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(48,20,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(49,21,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(50,21,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(51,21,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(52,21,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(53,21,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(54,21,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(55,22,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(56,22,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(57,22,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(58,22,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(59,22,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(60,22,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(61,23,2,NULL,NULL,NULL,NULL,FALSE,FALSE),
(62,23,3,NULL,NULL,NULL,NULL,FALSE,FALSE),
(63,23,1,NULL,NULL,NULL,NULL,FALSE,FALSE),
(64,23,5,NULL,NULL,NULL,NULL,FALSE,FALSE),
(65,23,4,NULL,NULL,NULL,NULL,FALSE,FALSE),
(66,23,6,NULL,NULL,NULL,NULL,FALSE,FALSE),
(67,24,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(68,24,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(69,24,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(70,24,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(71,24,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(72,24,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(73,25,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(74,25,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(75,25,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(76,25,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(77,25,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(78,25,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(79,26,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(80,26,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(81,26,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(82,26,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(83,26,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(84,26,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(85,27,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(86,27,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(87,27,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(88,27,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(89,27,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(90,27,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(91,28,13,NULL,NULL,NULL,NULL,FALSE,FALSE),
(92,28,15,NULL,NULL,NULL,NULL,FALSE,FALSE),
(93,28,14,NULL,NULL,NULL,NULL,FALSE,FALSE),
(94,28,18,NULL,NULL,NULL,NULL,FALSE,FALSE),
(95,28,16,NULL,NULL,NULL,NULL,FALSE,FALSE),
(96,28,17,NULL,NULL,NULL,NULL,FALSE,FALSE),
(97,29,13,NULL,NULL,NULL,NULL,FALSE,FALSE),
(98,29,18,NULL,NULL,NULL,NULL,FALSE,FALSE),
(99,29,14,NULL,NULL,NULL,NULL,FALSE,FALSE),
(100,29,15,NULL,NULL,NULL,NULL,FALSE,FALSE),
(101,29,16,NULL,NULL,NULL,NULL,FALSE,FALSE),
(102,29,17,NULL,NULL,NULL,NULL,FALSE,FALSE),
(103,30,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(104,30,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(105,30,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(106,30,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(107,30,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(108,30,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(109,31,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(110,31,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(111,31,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(112,31,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(113,31,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(114,31,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(115,32,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(116,32,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(117,32,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(118,32,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(119,32,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(120,32,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(121,33,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(122,33,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(123,33,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(124,33,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(125,33,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(126,33,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(127,34,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(128,34,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(129,34,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(130,34,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(131,34,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(132,34,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(133,35,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(134,35,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(135,35,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(136,35,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(137,35,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(138,35,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(139,36,13,NULL,NULL,NULL,NULL,FALSE,FALSE),
(140,36,14,NULL,NULL,NULL,NULL,FALSE,FALSE),
(141,36,18,NULL,NULL,NULL,NULL,FALSE,FALSE),
(142,36,15,NULL,NULL,NULL,NULL,FALSE,FALSE),
(143,36,16,NULL,NULL,NULL,NULL,FALSE,FALSE),
(144,36,17,NULL,NULL,NULL,NULL,FALSE,FALSE),
(145,37,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(146,37,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(147,37,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(148,37,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(149,37,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(150,37,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(151,38,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(152,38,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(153,38,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(154,38,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(155,38,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(156,38,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(157,39,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(158,39,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(159,39,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(160,39,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(161,39,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(162,39,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(163,40,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(164,40,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(165,40,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(166,40,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(167,40,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(168,40,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(169,41,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(170,41,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(171,41,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(172,41,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(173,41,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(174,41,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(175,42,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(176,42,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(177,42,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(178,42,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(179,42,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(180,42,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(181,43,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(182,43,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(183,43,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(184,43,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(185,43,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(186,43,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(187,44,7,NULL,NULL,NULL,NULL,FALSE,FALSE),
(188,44,9,NULL,NULL,NULL,NULL,FALSE,FALSE),
(189,44,8,NULL,NULL,NULL,NULL,FALSE,FALSE),
(190,44,10,NULL,NULL,NULL,NULL,FALSE,FALSE),
(191,44,12,NULL,NULL,NULL,NULL,FALSE,FALSE),
(192,44,11,NULL,NULL,NULL,NULL,FALSE,FALSE),
(193,45,13,NULL,NULL,NULL,NULL,FALSE,FALSE),
(194,45,18,NULL,NULL,NULL,NULL,FALSE,FALSE),
(195,45,15,NULL,NULL,NULL,NULL,FALSE,FALSE),
(196,45,17,NULL,NULL,NULL,NULL,FALSE,FALSE),
(197,45,14,NULL,NULL,NULL,NULL,FALSE,FALSE),
(198,45,16,NULL,NULL,NULL,NULL,FALSE,FALSE),
(199,46,13,NULL,NULL,NULL,NULL,FALSE,FALSE),
(200,46,18,NULL,NULL,NULL,NULL,FALSE,FALSE),
(201,46,15,NULL,NULL,NULL,NULL,FALSE,FALSE),
(202,46,16,NULL,NULL,NULL,NULL,FALSE,FALSE),
(203,46,14,NULL,NULL,NULL,NULL,FALSE,FALSE),
(204,46,17,NULL,NULL,NULL,NULL,FALSE,FALSE),
(205,47,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(206,47,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(207,47,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(208,47,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(209,47,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(210,47,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(211,48,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(212,48,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(213,48,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(214,48,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(215,48,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(216,48,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(217,49,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(218,49,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(219,49,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(220,49,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(221,49,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(222,49,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(223,50,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(224,50,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(225,50,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(226,50,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(227,50,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(228,50,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(229,51,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(230,51,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(231,51,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(232,51,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(233,51,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(234,51,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(235,52,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(236,52,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(237,52,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(238,52,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(239,52,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(240,52,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(241,53,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(242,53,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(243,53,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(244,53,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(245,53,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(246,53,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(247,54,19,NULL,NULL,NULL,NULL,FALSE,FALSE),
(248,54,24,NULL,NULL,NULL,NULL,FALSE,FALSE),
(249,54,20,NULL,NULL,NULL,NULL,FALSE,FALSE),
(250,54,23,NULL,NULL,NULL,NULL,FALSE,FALSE),
(251,54,21,NULL,NULL,NULL,NULL,FALSE,FALSE),
(252,54,22,NULL,NULL,NULL,NULL,FALSE,FALSE),
(253,55,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(254,55,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(255,55,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(256,55,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(257,55,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(258,55,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(259,56,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(260,56,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(261,56,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(262,56,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(263,56,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(264,56,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(265,57,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(266,57,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(267,57,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(268,57,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(269,57,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(270,57,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(271,58,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(272,58,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(273,58,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(274,58,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(275,58,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(276,58,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(277,59,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(278,59,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(279,59,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(280,59,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(281,59,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(282,59,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(283,60,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(284,60,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(285,60,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(286,60,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(287,60,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(288,60,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(289,61,25,NULL,NULL,NULL,NULL,FALSE,FALSE),
(290,61,30,NULL,NULL,NULL,NULL,FALSE,FALSE),
(291,61,27,NULL,NULL,NULL,NULL,FALSE,FALSE),
(292,61,26,NULL,NULL,NULL,NULL,FALSE,FALSE),
(293,61,29,NULL,NULL,NULL,NULL,FALSE,FALSE),
(294,61,28,NULL,NULL,NULL,NULL,FALSE,FALSE),
(295,62,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(296,62,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(297,62,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(298,62,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(299,62,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(300,62,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(301,63,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(302,63,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(303,63,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(304,63,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(305,63,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(306,63,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(307,64,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(308,64,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(309,64,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(310,64,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(311,64,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(312,64,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(313,65,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(314,65,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(315,65,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(316,65,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(317,65,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(318,65,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(319,66,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(320,66,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(321,66,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(322,66,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(323,66,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(324,66,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(325,67,31,NULL,NULL,NULL,NULL,FALSE,FALSE),
(326,67,33,NULL,NULL,NULL,NULL,FALSE,FALSE),
(327,67,34,NULL,NULL,NULL,NULL,FALSE,FALSE),
(328,67,32,NULL,NULL,NULL,NULL,FALSE,FALSE),
(329,67,36,NULL,NULL,NULL,NULL,FALSE,FALSE),
(330,67,35,NULL,NULL,NULL,NULL,FALSE,FALSE),
(331,68,37,NULL,NULL,NULL,NULL,FALSE,FALSE),
(332,68,39,NULL,NULL,NULL,NULL,FALSE,FALSE),
(333,68,40,NULL,NULL,NULL,NULL,FALSE,FALSE),
(334,68,41,NULL,NULL,NULL,NULL,FALSE,FALSE),
(335,68,42,NULL,NULL,NULL,NULL,FALSE,FALSE),
(336,68,38,NULL,NULL,NULL,NULL,FALSE,FALSE),
(337,69,37,NULL,NULL,NULL,NULL,FALSE,FALSE),
(338,69,39,NULL,NULL,NULL,NULL,FALSE,FALSE),
(339,69,40,NULL,NULL,NULL,NULL,FALSE,FALSE),
(340,69,41,NULL,NULL,NULL,NULL,FALSE,FALSE),
(341,69,42,NULL,NULL,NULL,NULL,FALSE,FALSE),
(342,69,38,NULL,NULL,NULL,NULL,FALSE,FALSE),
(343,70,37,NULL,NULL,NULL,NULL,FALSE,FALSE),
(344,70,39,NULL,NULL,NULL,NULL,FALSE,FALSE),
(345,70,41,NULL,NULL,NULL,NULL,FALSE,FALSE),
(346,70,38,NULL,NULL,NULL,NULL,FALSE,FALSE),
(347,70,40,NULL,NULL,NULL,NULL,FALSE,FALSE),
(348,70,42,NULL,NULL,NULL,NULL,FALSE,FALSE),
(349,71,37,NULL,NULL,NULL,NULL,FALSE,FALSE),
(350,71,41,NULL,NULL,NULL,NULL,FALSE,FALSE),
(351,71,42,NULL,NULL,NULL,NULL,FALSE,FALSE),
(352,71,38,NULL,NULL,NULL,NULL,FALSE,FALSE),
(353,71,39,NULL,NULL,NULL,NULL,FALSE,FALSE),
(354,71,40,NULL,NULL,NULL,NULL,FALSE,FALSE),
(355,72,37,NULL,NULL,NULL,NULL,FALSE,FALSE),
(356,72,42,NULL,NULL,NULL,NULL,FALSE,FALSE),
(357,72,38,NULL,NULL,NULL,NULL,FALSE,FALSE),
(358,72,40,NULL,NULL,NULL,NULL,FALSE,FALSE),
(359,72,39,NULL,NULL,NULL,NULL,FALSE,FALSE),
(360,72,41,NULL,NULL,NULL,NULL,FALSE,FALSE),
(361,73,37,NULL,NULL,NULL,NULL,FALSE,FALSE),
(362,73,39,NULL,NULL,NULL,NULL,FALSE,FALSE),
(363,73,42,NULL,NULL,NULL,NULL,FALSE,FALSE),
(364,73,41,NULL,NULL,NULL,NULL,FALSE,FALSE),
(365,73,38,NULL,NULL,NULL,NULL,FALSE,FALSE),
(366,73,40,NULL,NULL,NULL,NULL,FALSE,FALSE),
(367,74,43,NULL,NULL,NULL,NULL,FALSE,FALSE),
(368,74,44,NULL,NULL,NULL,NULL,FALSE,FALSE),
(369,74,46,NULL,NULL,NULL,NULL,FALSE,FALSE),
(370,74,45,NULL,NULL,NULL,NULL,FALSE,FALSE),
(371,74,47,NULL,NULL,NULL,NULL,FALSE,FALSE),
(372,74,48,NULL,NULL,NULL,NULL,FALSE,FALSE),
(373,75,43,NULL,NULL,NULL,NULL,FALSE,FALSE),
(374,75,44,NULL,NULL,NULL,NULL,FALSE,FALSE),
(375,75,45,NULL,NULL,NULL,NULL,FALSE,FALSE),
(376,75,46,NULL,NULL,NULL,NULL,FALSE,FALSE),
(377,75,48,NULL,NULL,NULL,NULL,FALSE,FALSE),
(378,75,47,NULL,NULL,NULL,NULL,FALSE,FALSE),
(379,76,43,NULL,NULL,NULL,NULL,FALSE,FALSE),
(380,76,44,NULL,NULL,NULL,NULL,FALSE,FALSE),
(381,76,46,NULL,NULL,NULL,NULL,FALSE,FALSE),
(382,76,47,NULL,NULL,NULL,NULL,FALSE,FALSE),
(383,76,48,NULL,NULL,NULL,NULL,FALSE,FALSE),
(384,76,45,NULL,NULL,NULL,NULL,FALSE,FALSE),
(385,77,43,NULL,NULL,NULL,NULL,FALSE,FALSE),
(386,77,45,NULL,NULL,NULL,NULL,FALSE,FALSE),
(387,77,44,NULL,NULL,NULL,NULL,FALSE,FALSE),
(388,77,47,NULL,NULL,NULL,NULL,FALSE,FALSE),
(389,77,46,NULL,NULL,NULL,NULL,FALSE,FALSE),
(390,77,48,NULL,NULL,NULL,NULL,FALSE,FALSE),
(391,78,43,NULL,NULL,NULL,NULL,FALSE,FALSE),
(392,78,46,NULL,NULL,NULL,NULL,FALSE,FALSE),
(393,78,44,NULL,NULL,NULL,NULL,FALSE,FALSE),
(394,78,45,NULL,NULL,NULL,NULL,FALSE,FALSE),
(395,78,48,NULL,NULL,NULL,NULL,FALSE,FALSE),
(396,78,47,NULL,NULL,NULL,NULL,FALSE,FALSE);



--
INSERT INTO "public"."local_trainers"("local_trainers_id","first_name","last_name","title","email","phone_number","organization","district","cohort_ref_id","status","notes")
VALUES
(13,E'Joan',E'Netterville',E'Dynamic Ideation Developer',E'bobosmith1991@gmail.com',E'(509)489-9622',E'Mountain Electronics ',E'East Wot ',7,TRUE,NULL),
(14,E'Parthenia',E'Martinkus',E'Chief Tactics Liason',E'bobosmith1991@gmail.com',E'(618)263-1379',E'Life Limited',E'Snilp Place',7,TRUE,NULL),
(15,E'Carlos',E'Rotter',E'Investor Factors Synergist',E'bobosmith1991@gmail.com',E'(310)881-8944',E'Question Limited',E'Throcub Circle',7,TRUE,NULL),
(16,E'Dale',E'Lisherness',E'Investor Branding Liason',E'bobosmith1991@gmail.com',E'(608)369-1039',E'Champroductions',E'Graikreok Garden',7,TRUE,NULL),
(17,E'Jen',E'Hedon',E'Interactive Tactics Agent',E'bobosmith1991@gmail.com',E'(336)472-7880',E'Monarctronics',E'Lower South Lowoord',7,TRUE,NULL),
(18,E'Edmundo',E'Tammo',E'Customer Factors Officer',E'bobosmith1991@gmail.com',E'(586)451-6748',E'Tidustries',E'Upper Fattusk',7,TRUE,NULL),
(19,E'Tracee',E'Kremers',E'Chief Optimization Producer',E'bobosmith1991@gmail.com',E'(336)447-2866',E'Primedia',E'Sprollis Market',7,TRUE,NULL),
(20,E'Sylvester',E'Chomka',E'Interactive Applications Associate',E'bobosmith1991@gmail.com',E'(650)996-4039',E'Forestsun',E'West Spreseect',7,TRUE,NULL),
(21,E'Antionette',E'Salwasser',E'Corporate Functionality Executive',E'bobosmith1991@gmail.com',E'(831)264-5089',E'Gemwater',E'Preonortiob Wood',7,TRUE,NULL),
(22,E'Kathryn',E'Hasselbarth',E'Central Interactions Executive',E'bobosmith1991@gmail.com',E'(417)639-1311',E'Beedlespace',E'Zoffioglob Park',7,TRUE,NULL),
(23,E'Marcy',E'Curry',E'Senior Intranet Analyst',E'bobosmith1991@gmail.com',E'(714)699-6022',E'Ace Foods',E'Keg Acre',7,TRUE,NULL),
(24,E'Willis',E'Blancarte',E'Regional Paradigm Liason',E'bobosmith1991@gmail.com',E'(501)940-3342',E'Herb Media',E'Hial Acre',8,TRUE,NULL),
(25,E'Loreta',E'Black',E'Relational Tactics Facilitator',E'bobosmith1991@gmail.com',E'(404)957-6536',E'Heart Softwares',E'Sphullul Place',8,TRUE,NULL),
(26,E'Charline',E'Kenaan',E'Lead Identity Coordinator',E'bobosmith1991@gmail.com',E'(248)413-3257',E'Monarctronics',E'Fort Stroldeld ',8,TRUE,NULL),
(27,E'Renda',E'Thibeau',E'Chief Security Administrator',E'bobosmith1991@gmail.com',E'(308)348-8773',E'Greatechnologies',E'Beaheft Center',8,TRUE,NULL),
(28,E'Toni',E'Shupe',E'Senior Mobility Engineer',E'bobosmith1991@gmail.com',E'(725)244-2578',E'Bullimited',E'Stufolp Avenue',9,TRUE,NULL),
(29,E'Lillia',E'McElmurry',E'Future Tactics Officer',E'bobosmith1991@gmail.com',E'(316)491-6290',E'Ceasarts',E'Turiank Road',9,TRUE,NULL),
(30,E'Ann',E'Foote',E'Lead Web Director',E'bobosmith1991@gmail.com',E'(260)470-2630',E'Typhoonwell',E'Lower West Relail',10,TRUE,NULL),
(31,E'Michael',E'Romaine',E'Internal Assurance Developer',E'bobosmith1991@gmail.com',E'(305)250-4221',E'Stormdew',E'Spherraphosp Row',11,TRUE,NULL),
(32,E'Gregg',E'McCraw',E'Relational Markets Designer',E'bobosmith1991@gmail.com',E'(423)532-9434',E'Globalforce',E'Spannessup Side',12,TRUE,NULL),
(33,E'Kristin',E'Eshlerman',E'Human Group Director',E'bobosmith1991@gmail.com',E'(831)455-7795',E'Revelation Softwares',E'Paird South',12,TRUE,NULL),
(34,E'Joye',E'Terpestra',E'Senior Creative Architect',E'bobosmith1991@gmail.com',E'(203)401-3964',E'Root Media',E'Upper East Lict',11,TRUE,NULL),
(35,E'Tien',E'Galvano',E'Global Directives Facilitator',E'bobosmith1991@gmail.com',E'(650)564-2030',E'Ocean Enterprises',E'Beef Gristle Mill Hill',11,TRUE,NULL),
(36,E'Sima',E'Bross',E'Communications Engineer',E'bobosmith1991@gmail.com',E'(781)629-4176',E'Moondustries',E'Zolded Hill',9,TRUE,NULL),
(37,E'Obdulia',E'Stockel',E'Marketing Liason',E'bobosmith1991@gmail.com',E'(225)681-4072',E'Luckytronics',E'Lower South Fredgic',12,TRUE,NULL),
(38,E'Kenia',E'Gonnerman',E'Internal Directives Supervisor',E'bobosmith1991@gmail.com',E'(617)514-4261',E'Hurricanetworks',E'Lower South Sceffep',12,TRUE,NULL),
(39,E'Deborah',E'Speich',E'Central Factors Architect',E'bobosmith1991@gmail.com',E'(203)785-5681',E'Honeydustries',E'Strammut Cross',11,TRUE,NULL),
(40,E'Virgil',E'Hlavacek',E'Internal Quality Manager',E'bobosmith1991@gmail.com',E'(419)285-4638',E'Pinnaclemart',E'Lower South Weoppid ',8,TRUE,NULL),
(41,E'Ettie',E'Swarner',E'Legacy Marketing Architect',E'bobosmith1991@gmail.com',E'(574)350-8993',E'Shadefruit',E'Kuppoopt Corner',8,TRUE,NULL),
(42,E'Pedro',E'Ruhoff',E'Direct Applications Agent',E'bobosmith1991@gmail.com',E'(571)264-2290',E'Mermaidwalk',E'West Splaittinwerd Acre',8,TRUE,NULL),
(43,E'Tarra',E'Bingamon',E'Forward Metrics Coordinator',E'bobosmith1991@gmail.com',E'(267)454-7394',E'Dream Sports',E'Dent Road',8,TRUE,NULL),
(44,E'Brendan',E'Aarhus',E'Relational Usability Director',E'bobosmith1991@gmail.com',E'(415)430-9946',E'Essence Sports',E'Lower West Solt ',8,TRUE,NULL),
(45,E'Remona',E'Bruning',E'Senior Directives Technician',E'bobosmith1991@gmail.com',E'(260)569-6344',E'Sail Coms',E'Wraiggeast Grove',9,TRUE,NULL),
(46,E'Wava',E' Melberg',E'Customer Data Agent',E'bobosmith1991@gmail.com',E'(313)288-2696',E'Hatchworks',E'Tudad Street',9,TRUE,NULL),
(47,E'Patsy',E'Mitchell',E'Customer Data Agent',E'bobosmith1991@gmail.com',E'(562)365-1408',E'Brisco',E'East Lissasp',10,TRUE,NULL),
(48,E'Clemmie',E'Tuner',E'Interactive Group Officer',E'bobosmith1991@gmail.com',E'(478)978-7563',E'Sunshinetworks',E'Upper Wheeleesk ',10,TRUE,NULL),
(49,E'Ena',E'Westre',E'National Accountability Architect',E'bobosmith1991@gmail.com',E'(443)352-4156',E'Labyrintelligence',E'South Creannom ',10,TRUE,NULL),
(50,E'Bill',E'Hindsman',E'Senior Security Orchestrator',E'bobosmith1991@gmail.com',E'(561)854-1226',E'Waveland',E'Upper East Bammek ',10,TRUE,NULL),
(51,E'Enid',E'Gabriel',E'Dynamic Group Representative',E'bobosmith1991@gmail.com',E'(480)929-3880',E'Timberbite',E'Gesechailp South',10,TRUE,NULL),
(52,E'Frances',E'Goldberger',E'Dynamic Data Executive',E'bobosmith1991@gmail.com',E'(785)721-6744',E'Diamondphone',E'Wriserthob Cross',10,TRUE,NULL),
(53,E'Fanny',E'Slingluff',E'Internal Integration Architect',E'bobosmith1991@gmail.com',E'(301)236-3133',E'Dream Sports',E'Talp Point',10,TRUE,NULL),
(54,E'Shirlee',E'Firlik',E'Relational Directives Orchestrator',E'bobosmith1991@gmail.com',E'(262)995-9097',E'Essence Sports',E'Lower North Weal ',10,TRUE,NULL),
(55,E'Adria',E'Nee',E'Internal Brand Orchestrator',E'bobosmith1991@gmail.com',E'(251)302-8578',E'Sail Coms',E'Guwlet Market',11,TRUE,NULL),
(56,E'Cleora',E'Lichorat',E'Paradigm Producer',E'bobosmith1991@gmail.com',E'(360)346-1419',E'Hatchworks',E'Chefild Market',11,TRUE,NULL),
(57,E'Larhonda',E'Fava',E'Regional Brand Supervisor',E'bobosmith1991@gmail.com',E'(803)962-6056',E'Brisco',E'Upper South Troffurd',11,TRUE,NULL),
(58,E'Robbyn',E'Chun',E'Legacy Security Associate',E'bobosmith1991@gmail.com',E'(503)618-8832',E'Sunshinetworks',E'Yoadeog Street',11,TRUE,NULL),
(59,E'Keshia',E'Sebastian',E'Product Identity Engineer',E'bobosmith1991@gmail.com',E'(323)231-4810',E'Waveland',E'Bayside Tionnon ',11,TRUE,NULL),
(60,E'Merrilee',E'Cuomo',E'Internal Ideation Specialist',E'bobosmith1991@gmail.com',E'(318)345-7415',E'Diamondphone',E'Norrop Yard',11,TRUE,NULL),
(61,E'Una',E'Losch',E'Chief Factors Consultant',E'bobosmith1991@gmail.com',E'(228)220-3927',E'Bull Industries',E'Soard Market',11,TRUE,NULL),
(62,E'Nelda',E'Marwick',E'Senior Directives Technician',E'bobosmith1991@gmail.com',E'(509)633-3665',E'Frostfire Networks',E'Wrirk Boulevard',12,TRUE,NULL),
(63,E'Stephan',E'Spruill',E'Lead Solutions Associate',E'bobosmith1991@gmail.com',E'(720)881-8387',E'Orc Co.',E'Gorstosk Row',12,TRUE,NULL),
(64,E'Gene',E'Ottey',E'Corporate Identity Planner',E'bobosmith1991@gmail.com',E'(607)417-9859',E'Monarctronics',E'Bayside Coweet',12,TRUE,NULL),
(65,E'Chad',E'Scarsdale',E'Senior Metrics Assistant',E'bobosmith1991@gmail.com',E'(301)256-7684',E'Venusystems',E'Bayside Coweet ',12,TRUE,NULL),
(66,E'Aleshia',E'Garlock',E'Product Optimization Manager',E'bobosmith1991@gmail.com',E'(203)408-6308',E'Voidustries',E'Suwird Circle',12,TRUE,NULL),
(67,E'Leisa',E'Hernon',E'Investor Quality Associate',E'bobosmith1991@gmail.com',E'(228)337-4778',E'Houndnavigations',E'Sputteb Cross',12,TRUE,NULL),
(68,E'Loura',E'Tehrani',E'Regional Intranet Associate',E'bobosmith1991@gmail.com',E'(256)964-5115',E'Leopardshadow',E'Waterside Second ',13,TRUE,NULL),
(69,E'Darwin',E'Hool',E'Dynamic Program Engineer',E'bobosmith1991@gmail.com',E'(662)202-8863',E'Wonderdream',E'Midtown',13,TRUE,NULL),
(70,E'Harris',E'Pearce',E'Relational Resonance Developer',E'bobosmith1991@gmail.com',E'(432)836-6407',E'Sunshine Co.',E'Splad Valley',13,TRUE,NULL),
(71,E'Ethel',E'Aiava',E'Customer Quality Executive',E'bobosmith1991@gmail.com',E'(330)569-9668',E'Wizard Software',E'Peonnil Circle',13,TRUE,NULL),
(72,E'Cristie',E'Pocius',E'Chief Program Officer',E'bobosmith1991@gmail.com',E'(352)416-4709',E'Raptor Arts',E'Woawean Square',13,TRUE,NULL),
(73,E'Arla',E'Niemel',E'Global Identity Designer',E'bobosmith1991@gmail.com',E'(740)989-6708',E'Blossomotors',E'Busolt Acre',13,TRUE,NULL),
(74,E'Freddie',E'Eversman',E'Investor Group Executive',E'bobosmith1991@gmail.com',E'(470)331-5926',E'Mountainetworks',E'Whinik Street',14,TRUE,NULL),
(75,E'Bret',E'Lackie',E'National Solutions Associate',E'bobosmith1991@gmail.com',E'(281)707-2054',E'Sunlightning',E'Slol Side',14,TRUE,NULL),
(76,E'Garnet',E'Feerst',E'National Ideation Developer',E'bobosmith1991@gmail.com',E'(785)359-9618',E'Squid Productions',E'Crolt Market',14,TRUE,NULL),
(77,E'Felicia',E'Gleitz',E'Regional Quality Strategist',E'bobosmith1991@gmail.com',E'(305)660-5929',E'Sphere Limited',E'Crolt Market',14,TRUE,NULL),
(78,E'Shasta',E'Credille',E'Direct Optimization Strategist',E'bobosmith1991@gmail.com',E'(850)835-4629',E'Luckyshack',E'Lower West Nothilt ',14,TRUE,NULL);

INSERT INTO "public"."cohort"("cohort_id","name","start_date","description","state_level_organization_ref_id")
VALUES
(12,E'Cohort 2',E'2018-09-15',E'',6),
(11,E'Cohort 1',E'2018-09-14',E'',6),
(14,E'Cohort 2',E'2018-09-15',E'',4),
(13,E'Cohort 1',E'2018-09-15',E'',4),
(10,E'Cohort 3',E'2018-09-14',E'',3),
(9,E'Cohort 2',E'2018-09-13',E'',3),
(8,E'Cohort 1',E'2018-09-12',E'',3),
(7,E'Cohort 1',E'2018-09-11',E'Isaac visited the group and it went well.',1);

INSERT INTO "public"."cohort_requirements"("cohort_req_id","cohort_id","requirement_id","due_date","notes","notification_1_date","notification_2_date","cycle")
VALUES
(1,7,1,E'2018-09-11',NULL,E'2018-09-11',E'2018-09-11',1),
(2,7,2,E'2018-09-21',NULL,E'2018-09-14',E'2018-09-18',1),
(3,7,3,E'2019-08-07',NULL,E'2019-02-08',E'2019-06-08',1),
(4,7,4,E'2019-09-11',NULL,E'2019-02-18',E'2019-08-17',1),
(5,7,6,E'2020-09-10',NULL,E'2020-03-04',E'2020-07-12',1),
(6,7,7,E'2020-09-10',NULL,E'2020-03-04',E'2020-07-12',1),
(7,8,1,E'2018-09-12',NULL,E'2018-09-12',E'2018-09-12',1),
(8,8,2,E'2018-09-22',NULL,E'2018-09-15',E'2018-09-19',1),
(9,8,3,E'2019-08-08',NULL,E'2019-02-09',E'2019-06-09',1),
(10,8,4,E'2019-09-12',NULL,E'2019-02-19',E'2019-08-18',1),
(11,8,6,E'2020-09-11',NULL,E'2020-03-05',E'2020-07-13',1),
(12,8,7,E'2020-09-11',NULL,E'2020-03-05',E'2020-07-13',1),
(13,8,2,E'2020-09-21',NULL,E'2020-09-14',E'2020-09-18',2),
(14,8,5,E'2021-09-11',NULL,E'2021-02-18',E'2021-08-17',2),
(15,8,6,E'2022-09-11',NULL,E'2022-03-05',E'2022-07-13',2),
(16,8,7,E'2022-09-11',NULL,E'2022-03-05',E'2022-07-13',2),
(17,8,2,E'2022-09-21',NULL,E'2022-09-14',E'2022-09-18',3),
(18,8,5,E'2023-09-11',NULL,E'2023-02-18',E'2023-08-17',3),
(19,8,6,E'2024-09-11',NULL,E'2024-03-05',E'2024-07-13',3),
(20,8,7,E'2024-09-11',NULL,E'2024-03-05',E'2024-07-13',3),
(21,9,1,E'2018-09-13',NULL,E'2018-09-13',E'2018-09-13',1),
(22,9,2,E'2018-09-23',NULL,E'2018-09-16',E'2018-09-20',1),
(23,9,3,E'2019-08-09',NULL,E'2019-02-10',E'2019-06-10',1),
(24,9,4,E'2019-09-13',NULL,E'2019-02-20',E'2019-08-19',1),
(25,9,6,E'2020-09-12',NULL,E'2020-03-06',E'2020-07-14',1),
(26,9,7,E'2020-09-12',NULL,E'2020-03-06',E'2020-07-14',1),
(27,9,2,E'2020-09-22',NULL,E'2020-09-15',E'2020-09-19',2),
(28,9,5,E'2021-09-12',NULL,E'2021-03-06',E'2021-07-14',2),
(29,9,6,E'2022-09-12',NULL,E'2022-03-06',E'2022-07-14',2),
(30,9,7,E'2022-09-12',NULL,E'2022-03-06',E'2022-07-14',2),
(31,10,1,E'2018-09-14',NULL,E'2018-09-14',E'2018-09-14',1),
(32,10,2,E'2018-09-24',NULL,E'2018-09-17',E'2018-09-21',1),
(33,10,3,E'2019-08-10',NULL,E'2019-02-11',E'2019-06-11',1),
(34,10,4,E'2019-09-14',NULL,E'2019-02-21',E'2019-08-20',1),
(35,10,6,E'2020-09-13',NULL,E'2020-03-07',E'2020-07-15',1),
(36,10,7,E'2020-09-13',NULL,E'2020-03-07',E'2020-07-15',1),
(37,11,1,E'2018-09-14',NULL,E'2018-09-14',E'2018-09-14',1),
(38,11,4,E'2019-09-14',NULL,E'2019-02-21',E'2019-08-20',1),
(39,11,6,E'2020-09-13',NULL,E'2020-03-07',E'2020-07-15',1),
(40,11,3,E'2019-08-10',NULL,E'2019-02-11',E'2019-06-11',1),
(41,11,7,E'2020-09-13',NULL,E'2020-03-07',E'2020-07-15',1),
(42,11,2,E'2018-09-24',NULL,E'2018-09-17',E'2018-09-21',1),
(43,11,2,E'2020-09-23',NULL,E'2020-09-16',E'2020-09-20',2),
(44,11,5,E'2021-09-13',NULL,E'2021-03-07',E'2021-07-15',2),
(45,11,6,E'2022-09-13',NULL,E'2022-03-07',E'2022-07-15',2),
(46,11,7,E'2022-09-13',NULL,E'2022-03-07',E'2022-07-15',2),
(47,12,1,E'2018-09-15',NULL,E'2018-09-15',E'2018-09-15',1),
(48,12,2,E'2018-09-25',NULL,E'2018-09-18',E'2018-09-22',1),
(49,12,3,E'2019-08-11',NULL,E'2019-02-12',E'2019-06-12',1),
(50,12,4,E'2019-09-15',NULL,E'2019-02-22',E'2019-08-21',1),
(51,12,6,E'2020-09-14',NULL,E'2020-03-08',E'2020-07-16',1),
(52,12,7,E'2020-09-14',NULL,E'2020-03-08',E'2020-07-16',1),
(53,13,1,E'2018-09-15',NULL,E'2018-09-15',E'2018-09-15',1),
(54,13,2,E'2018-09-25',NULL,E'2018-09-18',E'2018-09-22',1),
(55,13,4,E'2019-09-15',NULL,E'2019-02-22',E'2019-08-21',1),
(56,13,3,E'2019-08-11',NULL,E'2019-02-12',E'2019-06-12',1),
(57,13,6,E'2020-09-14',NULL,E'2020-03-08',E'2020-07-16',1),
(58,13,7,E'2020-09-14',NULL,E'2020-03-08',E'2020-07-16',1),
(59,13,2,E'2020-09-24',NULL,E'2020-09-17',E'2020-09-21',2),
(60,13,5,E'2021-09-14',NULL,E'2021-03-08',E'2021-07-16',2),
(61,13,6,E'2022-09-14',NULL,E'2022-03-08',E'2022-07-16',2),
(62,13,7,E'2022-09-14',NULL,E'2022-03-08',E'2022-07-16',2),
(63,14,1,E'2018-09-15',NULL,E'2018-09-15',E'2018-09-15',1),
(64,14,2,E'2018-09-25',NULL,E'2018-09-18',E'2018-09-22',1),
(65,14,3,E'2019-08-11',NULL,E'2019-02-12',E'2019-06-12',1),
(66,14,4,E'2019-09-15',NULL,E'2019-02-22',E'2019-08-21',1),
(67,14,6,E'2020-09-14',NULL,E'2020-03-08',E'2020-07-16',1),
(68,14,7,E'2020-09-14',NULL,E'2020-03-08',E'2020-07-16',1);


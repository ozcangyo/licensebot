/*
Navicat MySQL Data Transfer

Source Server         : asdf
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : license

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2023-06-20 11:58:50
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `licenses`
-- ----------------------------
DROP TABLE IF EXISTS `licenses`;
CREATE TABLE `licenses` (
  `ip` text DEFAULT '',
  `serverName` text DEFAULT NULL,
  `licenseKey` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of licenses
-- ----------------------------
INSERT INTO `licenses` VALUES ('123.321.123.321', 'Daşag Roleplay', 'DG-3943');
INSERT INTO `licenses` VALUES ('0.0.0.0', 'Lisans Roleplay', 'LR-0432');
INSERT INTO `licenses` VALUES ('123.321.123.123', 'Redwood Roleplay', 'RP-0983');

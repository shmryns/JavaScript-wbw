/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.26 : Database - zouxiu
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`zouxiu` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `zouxiu`;

/*Table structure for table `cats` */

DROP TABLE IF EXISTS `cats`;

CREATE TABLE `cats` (
  `cId` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `cname` varchar(50) NOT NULL COMMENT '产品名称',
  `cprice` varchar(10) NOT NULL COMMENT '价格',
  `cnum` int(11) DEFAULT NULL COMMENT '数量',
  `cimg` varchar(500) DEFAULT NULL COMMENT '图片',
  `cstatus` varchar(1) DEFAULT '1' COMMENT '状态',
  `uId` int(11) DEFAULT NULL COMMENT '购买人',
  `ctotal` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`cId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `cats` */

insert  into `cats`(`cId`,`cname`,`cprice`,`cnum`,`cimg`,`cstatus`,`uId`,`ctotal`) values (1,'娃娃','200',10,'https://img2.baidu.com/it/u=2660013192,2022893350&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666','1',3,'2000');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uId` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) NOT NULL,
  `upwd` varchar(50) NOT NULL,
  `ustatus` varchar(1) DEFAULT '1',
  PRIMARY KEY (`uId`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`uId`,`uname`,`upwd`,`ustatus`) values (3,'abc123','6b6f9f9ff8e0230e3ba6bb265e6a6f2d','1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

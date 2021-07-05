CREATE DATABASE  IF NOT EXISTS `apm` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `apm`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: apm
-- ------------------------------------------------------
-- Server version	5.5.60

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bugs`
--

DROP TABLE IF EXISTS `bugs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bugs` (
  `bug_id` int(11) NOT NULL AUTO_INCREMENT,
  `bug_name` varchar(45) NOT NULL,
  `bug_description` varchar(10000) DEFAULT NULL,
  `bug_priority` varchar(45) DEFAULT NULL,
  `bug_points` int(11) DEFAULT NULL,
  `bug_status` varchar(45) DEFAULT NULL,
  `bug_created_by` int(11) DEFAULT NULL,
  `bug_assignee` int(11) DEFAULT NULL,
  `bug_completed_hours` int(11) DEFAULT NULL,
  `bug_estimated_hours` int(11) DEFAULT NULL,
  `bug_sprint` int(11) NOT NULL,
  PRIMARY KEY (`bug_id`),
  KEY `bug_sprint_idx` (`bug_sprint`),
  CONSTRAINT `bug_sprint` FOREIGN KEY (`bug_sprint`) REFERENCES `sprints` (`sprint_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bugs`
--

--
-- Table structure for table `sprints`
--

DROP TABLE IF EXISTS `sprints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sprints` (
  `sprint_id` int(11) NOT NULL AUTO_INCREMENT,
  `sprint_name` varchar(100) NOT NULL,
  `sprint_duration` int(50) NOT NULL,
  `sprint_start_time` date NOT NULL,
  `sprint_end_time` date NOT NULL,
  `sprint_admin` int(11) NOT NULL,
  PRIMARY KEY (`sprint_id`),
  UNIQUE KEY `sprint_name_UNIQUE` (`sprint_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sprints`
--

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stories` (
  `story_id` int(11) NOT NULL AUTO_INCREMENT,
  `story_name` varchar(45) DEFAULT NULL,
  `story_description` varchar(10000) DEFAULT NULL,
  `story_priority` varchar(45) DEFAULT NULL,
  `story_points` int(11) DEFAULT NULL,
  `story_status` varchar(45) DEFAULT NULL,
  `story_created_by` int(11) DEFAULT NULL,
  `story_assignee` int(11) DEFAULT NULL,
  `story_completed_hours` int(11) DEFAULT NULL,
  `story_estimated_hours` int(11) DEFAULT NULL,
  `story_sprint` int(11) NOT NULL,
  PRIMARY KEY (`story_id`),
  KEY `story_sprint_idx` (`story_sprint`),
  CONSTRAINT `story_sprint` FOREIGN KEY (`story_sprint`) REFERENCES `sprints` (`sprint_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` int(11) NOT NULL,
  `user_name` varchar(1000) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(1000) NOT NULL,
  `user_phone_number` int(100) NOT NULL,
  `role_type` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-03 14:24:05

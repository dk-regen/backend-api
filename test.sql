SELECT
  usr.*,
  wal.`balance`,
  CONCAT(his.`browser`," ",his.`version`) AS browser,
  SUM(IF(his.`status` = 1, 1, 0)) AS success_login,
  SUM(IF(his.`status` = 0, 1, 0)) AS fail_login
FROM
  app_user usr
  INNER JOIN user_wallet wal
  ON usr.`id` = wal.`user_id`
  INNER JOIN user_login_history his
  ON usr.`id` = his.`user_id`
  WHERE his.`login_date` BETWEEN CONCAT(CURDATE(),' 00:00:00') AND CONCAT(CURDATE(), ' 23:59:59')
  GROUP BY usr.id, browser
  ORDER BY usr.`first_name`
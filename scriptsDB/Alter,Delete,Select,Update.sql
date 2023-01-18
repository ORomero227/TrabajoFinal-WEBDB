-- ALTER
ALTER TABLE generalmanagers
MODIFY PhoneNum varchar(20);

ALTER TABLE generalmanagers
MODIFY Comments varchar(300);

--DELETE
DELETE FROM generalmanagers
WHERE gmId = 5;


--SELECT
SELECT generalmanagers.FirstName
FROM generalmanagers;


SELECT generalmanagers.FirstName,generalmanagers.Country
FROM generalmanagers
WHERE generalmanagers.Country = 'Puerto Rico';


SELECT clubs.ClubName,generalmanagers.FirstName
FROM generalmanagers,clubs
WHERE generalmanagers.gmId = 1 AND clubs.gmID_FK = generalmanagers.gmId;


SELECT clubs.TeamName,clubs.GameFormat
FROM clubs
WHERE clubs.GameFormat = 'T';


SELECT clubs.clubId,clubs.ClubName,clubs.ClubLocation
FROM clubs
WHERE clubs.ClubLocation = 'NA';

--UPDATE

UPDATE 'generalmanagers'
SET FirstName = 'Oscar A.';

UPDATE 'generalmanagers'
SET 'FirstName' = 'Andrea'
WHERE gmId = 2;

UPDATE 'generalmanagers'
SET 'FirstName' = 'Lebron'
WHERE gmId = 3;

UPDATE 'generalmanagers'
SET 'FirstName' = 'Michael'
WHERE gmId = 4;

UPDATE 'generalmanagers'
SET 'LastNames' = 'Barbosa'
WHERE gmId = 5;
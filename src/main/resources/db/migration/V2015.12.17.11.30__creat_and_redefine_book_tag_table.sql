ALTER TABLE WO_BOOK
DROP INDEX FK_TAG_ID;

DROP TABLE IF EXISTS WO_BOOK_TAG;
CREATE TABLE WO_BOOK_TAG (
   ISBN VARCHAR(30) NOT NULL FOREIGN KEY REFERENCES WO_BOOK(ISBN),
   TAG_ID INT NOT NULL FOREIGN KEY REFERENCES WO_TAG(ID),
   PRIMARY KEY(ISBN, TAG_ID)
);
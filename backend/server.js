const express = require("express"); // npm i express | yarn add express
const cors = require("cors"); // npm i cors | yarn add cors
const mysql = require("mysql"); // npm i mysql | yarn add mysql
const axios = require("axios");
const multer = require("multer");
const path = require('path');
const app = express();
const PORT = 3001; // 포트번호 설정

const gyocode = "R10";
let schoolcode = 8750767;

const db = mysql.createPool({
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "1234", // 데이터베이스 비밀번호
  database: "personaldata", // 사용할 데이터베이스
});

const db2 = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "image_uploads"
});

const db3 = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "diary_uploads"
});

const db4 = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // 데이터베이스 사용자명
  password: '1234', // 데이터베이스 비밀번호
  database: 'school_num' // 데이터베이스 이름
});

db2.connect((err) => {
  if (err) {
      console.error('MySQL connection error:', err);
      process.exit(1);
  }
});

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON 형태의 요청을 파싱하도록 추가

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/schooldata", async (req, res) => {
  try {
    const response = await axios.get(
      `https://open.neis.go.kr/hub/SchoolSchedule?ATPT_OFCDC_SC_CODE=${gyocode}&SD_SCHUL_CODE=${schoolcode}&KEY=9333296d834848e0939ca37ddad7d407&Type=json&pIndex=1&pSize=1000&AA_FROM_YMD=20240101&AA_TO_YMD=20241231`
    ); // 외부 API 링크
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from external API:", error);
    res.status(500).send("Error fetching data");
  }
});

app.post('/personal-addschedule', (req, res) => {
  let { calendar_name, calendar_date } = req.body;

  // 날짜 변환
  const date = new Date(calendar_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  calendar_date = `${year}-${month}-${day}`; // 날짜 형식을 YYYY-MM-DD로 변환

  const query = 'INSERT INTO personal (calendar_name, calendar_date) VALUES (?, ?)';

  db.query(query, [calendar_name, calendar_date], (error, results) => {
    if (error) {
      console.error('Error inserting schedule:', error);
      res.status(500).send('Server error');
    } else {
      console.log('Schedule inserted successfully:', results);
      res.status(200).send('Schedule added successfully');
    }
  });
});


app.get("/personaldata", (req, res) => {
  const query = "SELECT * FROM personaldata.personal";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data");
      return;
    }

    // 날짜 변환
    const formattedResult = result.map(item => {
      const date = new Date(item.calendar_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}${month}${day}`;

      return {
        ...item,
        calendar_date: formattedDate
      };
    });

    res.json(formattedResult);
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log('No file uploaded.');
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded:', req.file);

  const { date } = req.body;
  const filePath = `/uploads/${req.file.filename}`;

  const selectQuery = 'SELECT path FROM images WHERE date = ?';
  db2.query(selectQuery, [date], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Database error.');
    }

    if (results.length > 0) {
      // 해당 날짜에 파일 경로가 이미 존재하면 업데이트
      const updateQuery = 'UPDATE images SET path = ? WHERE date = ?';
      db2.query(updateQuery, [filePath, date], (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Database error:', updateErr);
          return res.status(500).send('Database error.');
        }
        res.json({ message: 'Image path updated successfully.', filePath });
      });
    } else {
      // 해당 날짜에 파일 경로가 존재하지 않으면 새로 삽입
      const insertQuery = 'INSERT INTO images (date, path) VALUES (?, ?)';
      db2.query(insertQuery, [date, filePath], (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Database error:', insertErr);
          return res.status(500).send('Database error.');
        }
        res.json({ message: 'File uploaded successfully.', filePath });
      });
    }
  });
});

app.get('/image', (req, res) => {
  const { date } = req.query;

  const query = 'SELECT path FROM images WHERE date = ?';
  db2.query(query, [date], (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Database error.');
      }
      if (results.length > 0) {
          res.json({ imagePath: results[0].path });
      } else {
          res.status(404).send('No image found for the given date.');
      }
  });
});

// 다이어리 항목 추가
app.post('/diary/add', (req, res) => {
  const { date, content } = req.body;
  const sql = 'INSERT INTO diary (date, content) VALUES (?, ?)';
  db3.query(sql, [date, content], (err, result) => {
    if (err) {
      console.error('Error adding diary entry:', err);
      res.status(500).send({ message: 'Failed to add diary entry' });
    } else {
      res.status(200).send({ message: 'Diary entry added successfully' });
    }
  });
});

app.put('/diary/update', (req, res) => {
  const { date, content } = req.body;
  const sql = 'UPDATE diary SET content = ? WHERE date = ?';
  db3.query(sql, [content, date], (err, result) => {
    if (err) {
      console.error('Error updating diary entry:', err);
      res.status(500).send({ message: 'Failed to update diary entry' });
    } else {
      console.log('Update result:', result); // 디버깅을 위해 결과 로그 출력
      if (result.affectedRows === 0) {
        res.status(404).send({ message: 'Diary entry not found' });
      } else {
        res.status(200).send({ message: 'Diary entry updated successfully' });
      }
    }
  });
});

app.get('/diary', (req, res) => {
  const { date } = req.query;
  const sql = 'SELECT content FROM diary WHERE date = ?';
  db3.query(sql, [date], (err, results) => {
    if (err) {
      console.error('Error fetching diary entry:', err);
      res.status(500).send({ message: 'Failed to fetch diary entry' });
    } else if (results.length === 0) {
      res.status(404).send({ message: 'No diary entry found for the given date' });
    } else {
      res.status(200).send(results[0]);
    }
  });
});

app.post('/getSchools', (req, res) => {
  const { office, page, limit } = req.body;
  const table = office.toLowerCase(); // 테이블명으로 사용

  const offset = (page - 1) * limit;
  const sql = `SELECT 학교명 FROM ?? LIMIT ? OFFSET ?`;
  db4.query(sql, [table, parseInt(limit), parseInt(offset)], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('서버 오류');
      return;
    }
    res.json(results);
  });
});


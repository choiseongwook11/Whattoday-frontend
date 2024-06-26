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
      return res.status(400).send('No file uploaded.');
  }

  const { date } = req.body;
  const filePath = `/uploads/${req.file.filename}`;

  const query = 'INSERT INTO images (date, path) VALUES (?, ?)';
  db2.query(query, [date, filePath], (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Database error.');
      }
      res.json({ filePath });
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
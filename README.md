# Student-Scores
Software Engineering Group Project
A web application for visualizing student academic scores with interactive charts, heatmaps, and GPA predictions. Built with React.js, Node.js, Express, MongoDB, JWT authentication.

-LayerTech-
Frontend -> React.js, Recharts, Axios, TailwindCSS
Backend	-> Node.js, Express.js
Database -> MongoDB + Mongoose
Authentication -> JWT

Demo video:
https://drive.google.com/drive/folders/1BsgJhVslkbQlwYUr7dI08uGL56Wd9ppC?usp=sharing

-Installation-

1. CLONE REPO
git clone [https://github.com/username/student-score-visualizer.git](https://github.com/ChAbhiram-12/Student-Scores)
cd score-dashboard-main

2. INSTALL DEPENDENCIES
cd backend
npm install

3. Create a .env file inside /backend:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

4. RUN BACKEND
cd backend
npm start or npm run dev

6. Install frontend dependencies
cd ../frontend
npm install

7. RUN FRONTEND
npm run dev

The main application will now run on port:8080 & backend runs at port:5000



import express from 'express';
import authRouter from './auth/auth.controller'; // 👈 المسار الصح حسب شجرة الملفات عندك

const app = express();

app.use(express.json());

// تشغيل الـ Router
app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust path if needed
const Homework = require('../Models/Homework');
const User = require('../Models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGOOSE_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
});

describe('Homework Routes', () => {
    beforeEach(async () => {
        await User.deleteMany();
        await Homework.deleteMany();
    });

    it('should assign homework to students by a teacher', async () => {
        // Create a teacher user
        const teacherUser = new User({
            username: 'teacher1',
            password: 'teacherpassword',
            role: 'teacher',
        });
        await teacherUser.save();

        // Create student users
        const student1 = new User({
            username: 'student1',
            password: 'studentpassword',
            role: 'student',
        });
        await student1.save();
        
        const student2 = new User({
            username: 'student2',
            password: 'studentpassword',
            role: 'student',
        });
        await student2.save();

        // Create a homework to be assigned
        const homework = new Homework({
            title: 'Maths Homework',
            description: 'Complete exercises 1 to 5',
            date: new Date(),
            userId: teacherUser._id, // Assigning to the teacher
            subject: 'Maths',
        });
        await homework.save();

        // Assign the homework to students
        const assignHomeworkPayload = {
            username: 'teacher1', // Assuming this is the teacher's username
            homeworkId: homework._id,
        };

        const res = await request(app)
            .post('/homework/assign')
            .send(assignHomeworkPayload);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Homework assigned successfully for the students!');

        // Verify if the homework was assigned to students in the database
        const updatedStudents = await User.find({ role: 'student' });
        
        updatedStudents.forEach(student => {
            expect(student.homeworks.map(h => h.toString())).toContain(homework._id.toString());
        });
    });
});
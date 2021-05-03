const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Schooldb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connection success'))
    .catch((err) => console.log(err));

//1-this is student schema
const studentschema = new mongoose.Schema({
    name: String,
    age: Number,
    RegDate: { type: Date, defualt: Date.now() },
    IsActive: Boolean,
    Phones: [String]
});

//2-model student (combile the student schema to student model)
const Student = mongoose.model('Student', studentschema);

async function createStudent() {
    //3-create instance of the model student
    const student = new Student({
        name: 'ali',
        age: 33,
        isActive: true,
        phones: ['123', '123']
    });

    //4- insert the student in the db
    const result = await student.save();
    console.log(result);

}
createStudent();

// now do: nodemon index to run the project
// open mongodb compass to check the result


// select all students in the collection
async function getstudents(){
const students = await Student.find({name:'ali'}).limit(1).sort({name}).select({name:1});
console.log(students);
}

getstudents();
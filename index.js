const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Schooldb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connection success'))
    .catch((err) => console.log(err));

//1-this is student schema
const studentschema = new mongoose.Schema({
    name: {type: String, required:true},
    IsActive: Boolean,
    age: {type:Number,min:6,max:99,
    required: function(){return this.isActive }
    },
    RegDate: { type: Date, defualt: Date.now() },
   
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
/* async function getstudents(){
    // find({age:{$gte:5,$lte:60}}) // this is how to use the comparison in mongodb 
const students = await Student.find({name:'ali'}).limit(1).sort({name}).select({name:1});
console.log(students);
}

getstudents(); */


//pagination
//api/students?pageNumber=5&pageSize=2
async function getStudents(pageNumber = 1, pageSize = 2) {
    ;
    const students = await new Student().
        find().
        skip((pageNumber - 1) * pageSize).
        limit(pageSize);
}

getStudents(2, 2);

async function updateStudent(id) {
    // first way of update to find the item then update it 
    const student = await Student.findById(id);
    if (!student) return;
    // set data
    // first way
    student.name = "hani";
    student.isActive = false;
    const result = student.save();
    //second way
    student.set({
        name: "hani",
        isActive: false
    });

    // second way of update is to update the item directly 
    const student = await Student.update({ _id: id }, {
        $set: {
            name: "hani",
            isActive: false
        }
    })
}

// delete student
async function removeStudent(id) {
    const student = await Student.findByIdAndRemove(id);
}


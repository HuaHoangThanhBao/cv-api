const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Cannot connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,// schema types
    trim: true,// schema types
  },
  author: String,
  // tags: [ String ],
  tags: { // Custom validator
    type: Array,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'A course should have at least onez'
    }
  },
  date: { 
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),// even though in database is float point, when we save or get it, it will be converted to Math.round()
    set: v => Math.round(v),
  },
  isPublished: Boolean,
});

// Classes, objects
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Node.js Course',
    category: 'web',
    author: 'Mosh',
    tags: ['node', 'backend'],
    isPublished: true,
    price: 14,
  });
  
  try {
    const result = await course.save();
    console.log(result)
  }
  catch(ex) {
    console.log(ex)
  }
};

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)

  // const courses = Course.find();
  const courses = await Course.find({
    author: 'Mosh',
    isPublished: true,
    price: { $in: [14, 17] }
  })
  .limit(10)
  .sort({
    name: 1,// 1: asc, -1: desc
  })
  .select({// this is used for select only propeties that we want
    _id: 1, // 1: get this property, 0: not get this property
    name: 1,
    author: 1,
    isPublished: 1,
    price: 1,
  });
  console.log(courses);
};

async function updateCourse(id) {
  const course = await Course.findById(id);
  if(!course) return;

  course.isPublished = false;
  const result = await course.save();
  console.log(result);
}

async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// createCourse();
// updateCourse('62d27929f764d18400bea4c0');
createCourse();
getCourses();
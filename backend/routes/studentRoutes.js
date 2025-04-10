const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add Student
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Student by Registration Number
router.get('/get/:regNo', async (req, res) => {
  try {
    const student = await Student.findOne({ registrationNo: req.params.regNo });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Student
router.put('/update/:regNo', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { registrationNo: req.params.regNo },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Student
router.delete('/delete/:regNo', async (req, res) => {
  try {
    const student = await Student.findOne({ registrationNo: req.params.regNo });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await Student.deleteOne({ registrationNo: req.params.regNo });

    res.json({ message: "Student deleted successfully", deletedStudent: student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
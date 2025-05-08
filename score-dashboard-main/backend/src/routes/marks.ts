import express from 'express';
import Mark from '../models/Mark';
import { auth, isTeacher } from '../middleware/auth';

const router = express.Router();

// Get marks for a student (student can only view their own marks)
router.get('/student', auth, async (req: any, res) => {
  try {
    const marks = await Mark.find({ student: req.user._id })
      .populate('student', 'name email');
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching marks' });
  }
});

// Get marks for all students (teachers only)
router.get('/all', auth, isTeacher, async (req, res) => {
  try {
    const marks = await Mark.find()
      .populate('student', 'name email');
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching marks' });
  }
});

// Add new marks (teachers only)
router.post('/', auth, isTeacher, async (req, res) => {
  try {
    const { student, subject, marks, maxMarks, semester, academicYear } = req.body;
    
    const mark = new Mark({
      student,
      subject,
      marks,
      maxMarks,
      semester,
      academicYear
    });

    await mark.save();
    res.status(201).json(mark);
  } catch (error) {
    res.status(400).json({ error: 'Error adding marks' });
  }
});

// Update marks (teachers only)
router.put('/:id', auth, isTeacher, async (req, res) => {
  try {
    const { marks, maxMarks } = req.body;
    const mark = await Mark.findByIdAndUpdate(
      req.params.id,
      { marks, maxMarks },
      { new: true }
    );
    
    if (!mark) {
      return res.status(404).json({ error: 'Mark not found' });
    }
    
    res.json(mark);
  } catch (error) {
    res.status(400).json({ error: 'Error updating marks' });
  }
});

// Delete marks (teachers only)
router.delete('/:id', auth, isTeacher, async (req, res) => {
  try {
    const mark = await Mark.findByIdAndDelete(req.params.id);
    
    if (!mark) {
      return res.status(404).json({ error: 'Mark not found' });
    }
    
    res.json({ message: 'Mark deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting marks' });
  }
});

export default router; 
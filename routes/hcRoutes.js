const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Subject = require('../models/hamrocourse/subject')
const Semester = require('../models/extra/semester')
const Inside = require('../models/hamrocourse/inside')
const Paper = require('../models/questionPaper/paper')
const Note = require('../models/notes/note')
const Chapter = require('../models/hamrocourse/chapter')
const labChapter = require('../models/lab/labChapter')
const Info = require('../models/extra/info')
// Routes
router.get('/', async (req, res) => {
    try {
        const infos = await Info.find({}).limit(3);
        const faculties = infos[0].faculty.slice(0,5)
        let semesters
        res.render("home", { title: 'HamroCourse: Home', semesters, infos: infos[0] ,faculties})
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

})
router.get('/all', async (req, res) => {
    // To show all the faculties provided by farwestern university
    try {
        let semester
        const infos = await Info.find({})
        const { faculty } = infos[0]
        res.render('hamroCourse/explore', { title: 'HamroCourse: Explore', semester, faculty });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
})
router.get('/:faculty/semester/all', async (req, res) => {
    // To show all the semester of a specific faculty
    try {
        const { faculty } = req.params
        const semesters = await Semester.find({})
        res.render('hamroCourse/explore', { title: 'HamroCourse: Semesters', semesters, faculty });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

})


router.get('/:faculty', async (req, res) => {
    const { faculty } = req.params
    const repeatFunction = async (value) => {
        if (value !== "BSc") {
            const infos = await Info.find({})
            const limitNumber = 5;
            const semesters = await Semester.find({}).limit(limitNumber);
            res.render("home", { title: `HamroCourse: ${value}`, semesters, infos: infos[0], faculty })
        } else {
            const programme = ["BSc.PHYSICAL", "BSc.BIOLOGY"]
            res.render('choose', { programme })
        }

    }
    if (faculty === "BSCCSIT") {
        repeatFunction(faculty)
    }
    else if (faculty === "B.Ed.CSIT") {
        repeatFunction(faculty)
    }
    else if (faculty === "BCT") {
        repeatFunction(faculty)
    }
    else if (faculty === "BCE") {
        res.send("Coming Soon")
        // repeatFunction(faculty)
    }
    else if (faculty === "BSc.Ag") {
        res.send("Coming Soon")
        // repeatFunction(faculty)
    }
    else if (faculty === "BSc") {
        res.send("Coming Soon")
        // repeatFunction(faculty)
    }
    else if (faculty === "BSc.PHYSICAL") {
        res.send("Coming Soon")
        // repeatFunction(faculty)
    }
    else if (faculty === "BSc.BIOLOGY") {
        res.send("Coming Soon")
        // repeatFunction(faculty)
    }

})

router.get('/:faculty/semester/:semester', async (req, res) => {
    try {
        // Showing all the subjects of a specific semester
        const { faculty, semester } = req.params
        const subjects = await Subject.find({ 'programme': faculty, 'semester': semester })
        res.render('hamroCourse/exploreSubject', { title: 'HamroCourse - Subjects', subjects, id: semester, faculty });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
})
router.get('/:faculty/semester/:semester/:course_code', async (req, res) => {
    try {
        // Showing all the content of a specific subject of a specific semester
        const { course_code, semester, faculty } = req.params
        const subject = await Subject.find({ 'programme': faculty, 'semester': semester, 'code': course_code })
        const { lab } = subject[0]
        res.render('hamroCourse/exploreOptions', { title: `HamroCourse - ${course_code}`, course_code, id: semester, lab, faculty });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
})
// Between Old Questions and Syllabus
router.get('/:faculty/semester/:semester/:course_code/:options', async (req, res) => {
    try {
        const { course_code, options, semester, faculty } = req.params
        if (options === 'syllabus') {
            const chapters = await Chapter.find({ 'code': course_code }).sort({'chapter':1})
            const totalHours = chapters.map((chapter) => {
                return Number(chapter.hours)
            }).reduce((a, b) => a + b)
            console.log(chapters)
            res.render('hamroCourse/show', { title: `HamroCourse - ${course_code}`, chapters, id: semester, options, course_code, totalHours, faculty });
        }else if(options === 'oldquestions'){
            const oldQuestions = await Paper.find({'code':course_code}).sort({'year':1})
            res.render('hamroCourse/showPaper',{oldQuestions,course_code, options, id:semester, faculty})
        } 
        else if (options === 'lab') {
            const labs = await labChapter.find({ 'code': course_code })
            res.render('hamroCourse/showLabs', { title: `HamroCourse - ${course_code}`, labs, id: semester, options, course_code, faculty });
        } else if (options === 'notes') {
        //   to be continued
        const notes = await Note.find({ 'code': course_code }).sort({'chapter':1})
        res.render('hamroCourse/showNote',{notes,course_code, options, id:semester, faculty})
        }
        

    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
})

// Inside Chapter
router.get('/:faculty/semester/:semester/:course_code/:options/:chapter', async (req, res) => {
    try {
        const { semester, course_code, options, chapter, faculty } = req.params
        const topics = await Inside.find({ 'code': course_code, 'chapter': Number(chapter) })
        res.render('hamroCourse/insideChapters', { title: `HamroCourse - ${course_code}`, topics, id: semester, options, course_code, chapter, faculty });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
})

module.exports = router
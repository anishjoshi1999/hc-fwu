const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const Subject = require('../models/hamrocourse/subject')
const Inside = require('../models/hamrocourse/inside')
const Lab = require('../models/lab/lab')
const Paper = require('../models/questionPaper/paper')
const Note = require('../models/notes/note')
const { saveSubject } = require('../routes/uploadFunctions/uploadSubject')
const { saveChapter } = require('../routes/uploadFunctions/uploadChapter')
const { saveInside } = require('../routes/uploadFunctions/uploadInside')
const { saveLab } = require('../routes/uploadFunctions/uploadLab')
const { isAuthenticated } = require('../passportConfig')


router.get('/', (req, res) => {
    res.render('login')
})
router.post('/', passport.authenticate("local", {
    failureRedirect: "/upload",
    successRedirect: "/upload/dashboard"
}))

router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/upload');
    });
});
router.get('/earning', isAuthenticated, async (req, res) => {
    const { username } = req.user
    console.log(username)
    const totalSubjectCreated = await Inside.find({ 'createdBy': username })
    const totalSubjectCodes = totalSubjectCreated.map((element) => {
        return element.code
    })
    console.log(totalSubjectCodes)
    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    const uniqueSubjectCode = removeDuplicates(totalSubjectCodes).length
    res.render('CRUD/extraInfo/earning', { username, uniqueSubjectCode })
})

router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('CRUD/extraInfo/index')
})
/*Upload Entire Subject including chapters and inside's content*/
// ===================================================================
router.get('/subject', isAuthenticated, (req, res) => {
    let page;
    res.render('CRUD/uploadSCI/uploadSubject', { page })
})

router.post('/subject', isAuthenticated, (req, res) => {
    saveSubject(req.body, req.user, res)
})
// // Chapter routes
router.get('/chapter/:code/:id', isAuthenticated, (req, res) => {
    const { id, code } = req.params
    res.render('CRUD/uploadSCI/uploadChapter', { id, code })
})

router.post('/chapter/:code/:id', isAuthenticated, async (req, res) => {
    saveChapter(req.body, req.params, req.user, res, true)
})
// Here id means total numbers of chapters
router.get('/chapter/:code/:id/inside',isAuthenticated, (req, res) => {
    const { code, id } = req.params
    res.render('CRUD/uploadSCI/uploadInside', { code, id })
})
// Inside Route
router.post('/chapter/:code/:id/inside',isAuthenticated, async (req, res) => {
    saveInside(req.body, req.params, req.user, res)
})
// Upload lab for a specific subject
router.get('/lab', isAuthenticated,(req, res) => {
    res.render('CRUD/uploadLab/labForm')
})
router.post('/lab',isAuthenticated, async (req, res) => {
    try {
        const { code, totallabs, programme,university} = req.body
        const { username } = req.user
        const subjectInfo = await Subject.find({ 'code': code })
        if (subjectInfo[0].lab === 'on') {
            const labInfo = {
                name: subjectInfo[0].name,
                code,
                totallabs: Number(totallabs),
                semester: subjectInfo[0].semester,
                programme,
                university,
                createdBy: username
            }
            console.log(labInfo)
            try {
                const lab = new Lab(labInfo);
                await lab.save();
                console.log('Lab First Info Added Successfully!');
                res.redirect(`/upload/lab/${code}`)

            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(401).send({ message: "This subject does have a lab" || error.message });
        }
    } catch (error) {
        res.status(401).send({ message: "No Lab founds on this subject" || error.message });
    }

})
router.get('/lab/:code',isAuthenticated, async (req, res) => {
    const { code } = req.params
    try {
        const labInfo = await Lab.find({ 'code': code })
        const { totallabs} = labInfo[0]
        res.render('CRUD/uploadLab/addinsideLab', { totallabs, code })
    } catch (error) {
        res.status(401).send({ message: "No Lab founds on this subject" || error.message });
    }
})

router.post('/lab/:code',isAuthenticated, async (req, res) => {
    const { code } = req.params
    saveLab(req.body, req.user, code, res)
})

router.get('/paper',isAuthenticated,(req,res)=> {
    res.render('CRUD/Paper/index')
})
router.post('/paper',isAuthenticated,async(req,res)=> {
    const paperData = [req.body]
    const modifiedData = paperData.map((element)=> {
        return {
            university:element.university.trim(),
            programme:element.programme.trim(),
            code:element.code.trim(),
            year:Number(element.year.trim()),
            semester:Number(element.semester.trim()),
            paperURL:element.paperURL.trim()
        }
    })
    try {
        const paperInfo = await Paper.insertMany(modifiedData)
        res.redirect('/upload/dashboard')
    } catch (error) {
        res.status(401).send({ message: "This subject does have a lab" || error.message });
    }
})

router.get('/notes',isAuthenticated,(req,res)=> {
    res.render('CRUD/Note/index')
})
router.post('/notes',isAuthenticated,async(req,res)=> {
    const notesData = [req.body]
    console.log(notesData)
    const modifiedData = notesData.map((element)=> {
        return {
            university:element.university.trim(),
            programme:element.programme.trim(),
            chapter:Number(element.chapter.trim()),
            code:element.code.trim(),
            noteCreator:element.noteCreator.trim(),
            semester:Number(element.semester.trim()),
            noteURL:element.noteURL.trim()
        }
    })
    try {
        const noteInfo = await Note.insertMany(modifiedData)
        console.log(noteInfo)
        res.redirect('/upload/dashboard')
    } catch (error) {
        res.status(401).send({ message: "Error found" || error.message });
    }
})
module.exports = router
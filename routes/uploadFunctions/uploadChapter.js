const Chapter = require('../../models/hamrocourse/chapter')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
async function saveChapter(requestBody, requestParams,requestUser, res,flag) {
    const { title, marks, hours } = requestBody
    const { code, id } = requestParams
    const {username} = requestUser
    const marksTotal = marks.map((mark) => {
        return Number(mark)
    })
    const hoursTotal = hours.map((hour) => {
        return Number(hour)
    })
    const subjectData = title.map((element, index) => {
        return {
            chapter: index + 1,
            marks: marksTotal[index],
            hours: hoursTotal[index],
            title: element.trim(),
            // make sure code doesnot contain any white space
            code: code.trim(),
            createdBy:username
        }
    })
    console.log("Inserting all the entered data")
    try {
        await Chapter.insertMany(subjectData)
        console.log("All data added successfully")
        if(flag){
            res.redirect(`/upload/chapter/${code}/${id}/inside`)
        }else{
            res.redirect('/upload/dashboard')
        }
    } catch (error) {
        console.log('err', + error)
    }
}
module.exports = {
    saveChapter: saveChapter
};
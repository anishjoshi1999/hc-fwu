const Inside = require('../../models/hamrocourse/inside')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

async function saveInside(requestBody, requestParams, requestUser = "anishjoshi1999", res) {
    const { code } = requestParams
    const { chapter, subtitle } = requestBody
    const { username } = requestUser
    const chapters = chapter.map((element) => {
        return Number(element)
    })
    const subtitles = subtitle.map((element) => {
        return element.split(',')
    })
    const dataArray = chapters.map((chapter, index) => {
        return {
            chapter,
            subtitle: modifyInside(subtitles[index]),
            code: code.trim(),
            createdBy: username
        }
    })
    console.log(dataArray)
    try {
        await Inside.insertMany(dataArray)
        console.log("All data added successfully")
        res.redirect("/upload/dashboard")
    } catch (error) {
        console.log('err', + error)
    }
}

function modifyInside(subtitle) {
    const withoutWhiteSpace = subtitle.map((element) => {
        return element.trim()
    })
    const hello = withoutWhiteSpace.map((element) => {
        return element.replace(/\|/g, ",").replace(/\-/g, ",").replace(/,(?!.*,)/g, " and").replace(/\s*,\s*/g, ", ").replace(/and(?=[A-Z])/g, "and ");
    })
    return hello
}

module.exports = {
    saveInside: saveInside
};
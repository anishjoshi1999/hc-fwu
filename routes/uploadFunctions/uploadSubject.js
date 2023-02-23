const Subject = require('../../models/hamrocourse/subject')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

async function saveSubject(requestBody,requestUser, res) {
  const { name, code, totalmarks, passmarks, semester, image, totalchapters,lab,programme,university} = requestBody
  const {username} = requestUser
  // Create a new document
  const subject = new Subject({
    name: name.trim(),
    code: code.trim(),
    totalmarks:Number(totalmarks),
    passmarks:Number(passmarks),
    semester:Number(semester),
    totalchapters:Number(totalchapters),
    image:image.trim(),
    lab:lab.trim(),
    programme:programme.trim(),
    university:university.trim(),
    createdBy:username
  });
  // Save the document to the database
  try {
    await subject.save();
    console.log('Subject Content Added Successfully!');
      res.redirect(`/upload/chapter/${code}/${totalchapters}`)
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  saveSubject: saveSubject
};

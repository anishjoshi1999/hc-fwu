const labChapter = require('../../models/lab/labChapter')
const Lab = require('../../models/lab/lab')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

async function saveLab(requestBody,requestUser,code,res) {
    const {lab,titles} = requestBody
    console.log(lab)
    // const {username} = requestUser
    // const labInfo = await Lab.find({ 'code': code })
    // const {university,programme} = labInfo[0]
    // const labDatas = lab.map((element,index)=> {
    //     return {
    //         lab:Number(element),
    //         title:titles[index],
    //         code,
    //         programme,
    //         university,
    //         createdBy:username
    //     }
    // })
    // try {
    //     await labChapter.insertMany(labDatas)
    //     console.log("All lab data added successfully")
    //         res.redirect('/upload/dashboard')
    // } catch (error) {
    //     console.log('err', + error)
    // }
}
module.exports = {
  saveLab: saveLab
};

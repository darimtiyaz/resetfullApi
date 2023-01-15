//1: create a new router
const express = require("express");
const router = new express.Router();
const Student = require("../models/students");


// 2: we need to define the router

router.get("/thapa", (req, res) => {
  res.send("Hello whatsup guys");
});


// router.post("/students", async (req, res) => {
//   try{
//   console.log(req.body);
//   const user = new Student(req.body);
//   const createUser = await user.save();
//   res.status(201).send(createUser);
//   }catch(e){
//     res.status(400).send(e);
//   }
//  // res.send("hello how are you")
// })

router.post("/students", async(req, res) => {
  try{
  const user = new Student(req.body);
  const createUser = await user.save();
  res.status(201).send(createUser);
  }catch(e){
    res.status(400).send(e);
  }
})

//read the data of registered Students
router.get("/students", async (req, res) => {
  try{
    const studentsData = await Student.find();
    res.send(studentsData);
  }catch(e){
    res.send(e);
  }
})

// get the individual student data using id
router.get("/students/:id", async(req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    console.log(studentData);

    if(!studentData){
      return res.Status(404).send();
    }else{
      res.send(studentData)
    }
  //  req.send(req.params);
  } catch (e) {
    res.status(500).send(e);
  }
})

//delete the student by id
router.delete("/students/:id", async(req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if(!req.params.id){
      return res.status(400).send();
    }
    res.send(deleteStudent);
  } catch (e) {
    res.status(500).send(e);
  }
})

//update the student by it id

router.patch("/students/:id", async(req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    res.send(updateStudents);
  } catch (e) {
    res.status(400).send(e);
  }
})


module.exports = router;
//3: we need to register our router
//app.use(router);
const mongoose = require("mongoose");
const validator = require("validator");

mongoose
  .connect("mongodb://localhost:27017/ttchanel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connection successful......"))
  .catch((err) => console.log(err));

// A mongoose schema defines the structure of the document,
// default values, validators, etc.,

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    //uppercase: true,
    trim:true,
    minlength: [2, "minimum 2letters"],
    maxlength: 30
  },
  ctype: {
    type:String,
    required: true,
    lowercase: true,
    enum:["frontend", "backend", "database"]
  },
  videos: {
    type: Number,
    validate(value){
      if(value < 0){
          throw new Error('videos count should not be negative')
      }
    }
  },
  author: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid");
      }
    }
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// A mongoose model is a wrapper on the mongoose schema. A Mongoose schema defines the structure of the document, //// default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating,
// querying, updating, deleting records, etc

// collections
const Playlist = new mongoose.model("Playlist", playlistSchema);

// creating document or insert
const createDocument = async () => {
  try {
    const jsPlaylist = Playlist({
      name: "javascript",
      ctype: "Front End",
      videos: 50,
      author: "the tech",
      active: true,
    });
    const reactPlaylist = new Playlist({
      name: "React Js",
      ctype: "Front End",
      videos: 80,
      author: "tech",
      active: true,
    });
    const mongoPlaylist = new Playlist({
      name: "MongoDB",
      ctype: "Database",
      videos: 8,
      author: "tech",
      active: true,
    });
    const mongoosePlaylist = new Playlist({
      name: "Mongoose Js",
      ctype: "database",
      email: "thapa.yu@gmail.co",
      videos: 5,
      author: "tech",
      active: true,
    });
    const expressPlaylist = new Playlist({
      name: "Express Js",
      ctype: "Back End",
      videos: 80,
      author: "tech",
      active: true,
    });
    const result = await Playlist.insertMany([
     // reactPlaylist,
     // jsPlaylist,
     // mongoPlaylist,
      mongoosePlaylist,
     // expressPlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

const getDocument = async () => {
  try{
  // {$gte : 50}} ,  {$lte : 50}} ,  {$in : "Back End"}} , {$nin : ["Back End", "DataBase"]}}
  // $or, { $and: [{ ctype: "Back End" }, { author: "tech" }]}
  // const result = await Playlist.find({ctype: {$nin : ["Back End", "Database"]}})
  const result = await Playlist.find({ author: "tech"})
  .select({ name: 1 })
  //.countDocuments();
  .sort({name: -1});
  //.limit(1);
  console.log(result);
  } catch(err){
    console.log(err);
  }
};

// getDocument();


//update the document
//updateOne, 
const updateDocuments = async (_id) => {
  try{
  const result = await Playlist.findByIdAndUpdate({_id},{
    $set : {
      name : "javascript tech"
    }
  }, {
    new: true,
    useFindAndModify: true
  });
  console.log(result);

}catch(err){
  console.log(err);
}
}
// updateDocuments("62dc0b4cdf9529666f63c364")

// delete the document

const deleteDocument = async(_id) => {
  try{
    // const result = await Playlist.deleteOne({_id});
    const result = await Playlist.findByIdAndDelete({_id});
    console.log(result);
  }catch(err){
    console.log(err);
  }
}

//deleteDocument("62dc09210fe6c52e4b622582");
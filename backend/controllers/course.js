const Course=require('../models/course');
const tags = require('../models/tags');
const Tag=require('../models/tags');
const User=require('../models/user');
const {uploadImageCloudinary}=require('../utils/imageUploader');

// create the course
exports.createCourse=async (req,res)=>{
    try {
        // fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;
        const thumbnail=req.file.thumbnailImage
        // validation
        if(!courseName || !courseDescription ||!whatYouWillLearn ||!price||!tag) return res.status(400).json({
            success:false,
            message:"All files are required"
        })
        // check for instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId)
        console.log("instructor detail: ",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }
        // check given tag valid or not
        const tagDetails=await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"InstrTag detail details not found"
            })

        }

        // uplaod image
        const thumbnailImage=await uploadImageCloudinary(file,process.env.FOLDER_NAME);

        // create entry for new course
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url

        })
        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                // pushing the id  of newly created course in courses array of instructors document
                $push:{
                    courses:newCourse._id
                }
            }
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"Course created succesully"
        })
        
    } catch (error) {
        console.log(error,"error occured in creatinf course");
        res.status(500).json({
                success:false,
                message:"error occured in creating course",
                error:error.message
        })

        
    }
}
// fetch all course
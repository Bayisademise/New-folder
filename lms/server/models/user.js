import express from 'express'
const userSchema = new mongoose.schema(
    {
        _id:{type:String,required: true},
        name:{type:String,required: true},
        email:{type:String,required:true},
        imageUrl:{type:String,required:true},
        enrolledCourses:[
            {
                type:mongoose.schema.types.objectId,
                ref:"Course"
            }
        ],
    },{timestamps:true});
    const User = mongoose.model('User',userSchema);
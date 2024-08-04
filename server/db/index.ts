import mongoose from "mongoose";

export const mongoUrl ='mongodb://root:cGJpkVxVLOiLU04FZyUJ6O68ICzZSgCeEtgiccfcj2TtoTS5ys7Vf5xCLhltVehY@manazl.site:27017/?directConnection=true' 
 
mongoose.connect(mongoUrl)

mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb oh hell yea');
});

mongoose.connection.on('error',()=>{
    console.log('error connecting to mongodb oh hell yea');
});

const User = require("../models/user");
const Group = require("../models/group");
const UserGroup = require("../models/userGroup");
const Chat = require("../models/chat");

module.exports.create = async (req, res) => {
  try {
    const { name, tasks, deadline, userId } = req.body;
    console.log(req.body);

    // Validate user input
    if (!(name && tasks && userId)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ _id: userId });

    // Create group
    const group = await Group.create({
      name,
      tasks,
      createdBy: user.firstName,
      userId,
      points: 0,
      deadline: deadline,
    });

    var userGroup = await UserGroup.create({
      userId,
      groupId: group._id,
      group,
      tasks,
      points: 0,
      unread: 0,
    });

    group.save();
    res.status(200).json(group);
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
};

module.exports.groups = async (req, res) => {
  const { userId } = req.query;
  try {
    var result = [];
    var userGroup = await UserGroup.find({ userId });

    console.log(userGroup)
    userGroup.forEach((el) => {
      result.push(el.group);
    });
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
};

module.exports.join = async (req, res) => {
  const { userId, groupId } = req.query;
  console.log(req.query);
  try {
    var joined = await UserGroup.find({ groupId, userId });
    //  console.log(joined)
    if (joined.length > 0) {
      res.status(400).json("User has already joined");
    } else {
      var group = await Group.find({ _id: groupId });

      group = group[0];
      //  console.log(group)

      var userGroup = await UserGroup.create({
        userId,
        groupId,
        group,
        tasks: group.tasks,
        points: 0,
        unread: 0,
      });

      console.log(userGroup);
      res.status(200).json(userGroup);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
};

module.exports.task = async (req, res) => {
try{
   const {userId,groupId,task} = req.body
    var userGroup = await UserGroup.find({userId,groupId})
    userGroup = userGroup[0]
    console.log(userGroup.tasks.filter(a=>a != task))
    userGroup.tasks= userGroup.tasks.filter(a=>a != task)
    userGroup.points = parseInt(userGroup.points) + 10

    var group = await Group.find({_id:groupId})
    group = group[0]
    group.points =  parseInt(group.points) + 10

    userGroup.save();
    group.save();

    console.log(userGroup);
    res.status(200).json(userGroup);
}
catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
}



module.exports.message = async (req, res) => {
    try{
       const {groupId} = req.query
        var messages = await Chat.find({groupId})
       
    
        console.log(messages);
        res.status(200).json(messages);
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Something went wrong");
      }
    }
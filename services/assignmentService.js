import { where } from "sequelize";
import { Assignment } from "../models/assignmentModel.js";
import { getCredentials } from "./auth.js";
import { User } from "../models/userModel.js";
import { v4 as uuidv4 } from 'uuid';
import {Submission} from "../models/submission.js";
import AWS from 'aws-sdk';
const sns = new AWS.SNS();
import dotenv from 'dotenv';
dotenv.config();
export const getAllAssignments = async (req, res) => {
  const assignments = await Assignment.findAll();
  return assignments;
};

export const createAssignment = async (assignmentData) => {
  const assignment = await Assignment.create(assignmentData); //inbuilt method
  return assignment;
};

export const getAssignmentById = async (id) => {
  try {
    return await findAssignment(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
//verify user
export const deleteAssignmentById = async (id, email) => {
  try {
    const assignment = await findAssignment(id);

    if (email == assignment.createdBy) {
      await assignment.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
//verify user
export const updateAssignmentById = async (id, assignmentData, email) => {
  try {
    const assignment = await findAssignment(id);
    assignment.name = assignmentData.name;
    assignment.points = assignmentData.points;
    assignment.num_of_attempts = assignmentData.num_of_attempts;
    assignment.deadline = assignmentData.deadline;
    assignment.assignment_updated = new Date().toISOString();

    if (email == assignment.createdBy) {
      await assignment.save();
      
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findAssignment = async (id) => {
  
  const assignment = await Assignment.findOne({where: {id: id}});
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  return assignment;
};

export const createSubmission = async (assignmentId, submissionUrl) => {
  try {
    const id   = assignmentId;
    const { submission_url } = submissionUrl;

    const assignment = await findAssignment(id);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    const currentDate = new Date();
    if (currentDate > assignment.deadline) {
      throw new Error('Assignment deadline has passed. Submission rejected.');
    }

 
    const submissionCount = await checkRetries(id,assignment.num_of_attempts);
    console.log("Submission count is ", submissionCount);
    if (submissionCount >= assignment.max_attempts) {
      throw new Error('Exceeded maximum submission attempts. Submission rejected.');
    }

    const val = JSON.stringify(submission_url);
    const suburl = JSON.parse(val);
    const submission = await Submission.create({
      assignment_id: id,
      submission_url: suburl,
      submission_updated: new Date().toISOString(),
    });
    const message = 'Hello, this is a test message!';
    publishToSNS(message).then(messageId => {
    console.log('Message successfully published with ID:', messageId);
  })
  .catch(error => {
    console.error('Error publishing message:', error);
  });
  }
  catch (error) {
    throw new Error(error.message);
  }
};

export const checkRetries = async (assignmentId,numOfAttempts) => {

    try{
      const attempts = await getAttempts(assignmentId);
      if (attempts >= numOfAttempts) {
        throw new Error('Exceeded maximum submission attempts. Submission rejected.');
      }
    }
    catch (error) {
      throw new Error(error.message);
    }
};


export const getAttempts = async (id) => {
  
  try {
    // Assuming your Submission model has a column like 'userId' and 'assignmentId'
    const submissionAttempts = await Submission.count({
      where: {
        assignment_id: id,
      },
    });
    console.log("submission attempts ",submissionAttempts);
    return submissionAttempts;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Set up AWS configuration
AWS.config.update({
  region: 'US', 
  credentials: {
    accessKeyId: 'AKIAWAX7DYRY45RJBJ6D', // Replace with your access key ID
    secretAccessKey: 'xt1yxcubtvMmZrADSg7uhqpYBGJXQHhmwyPHtia8' // Replace with your secret access key
  }
});

export const publishToSNS = async (message) => {
  // Parameters for publishing to the SNS topic
  const params = {
    Message: message,
    TopicArn: process.env.TopicArn // Replace with your SNS topic ARN
  };

  return sns.publish(params).promise()
    .then(data => {
      console.log('Message published to SNS:', data.MessageId);
      return data.MessageId;
    })
    .catch(err => {
      console.error('Error publishing message to SNS:', err);
      throw err;
    });
};

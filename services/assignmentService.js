import { where } from "sequelize";
import { Assignment } from "../models/assignmentModel.js";
import { getCredentials } from "./auth.js";
import { User } from "../models/userModel.js";
import { v4 as uuidv4 } from 'uuid';
import {Submission} from "../models/submission.js";

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
    const { id } = assignmentId;
    const { submission_url } = submissionUrl;

    // Fetch assignment details
    const assignment = await findAssignment(id);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    const currentDate = new Date();
    if (currentDate > assignment.deadline) {
      throw new Error('Assignment deadline has passed. Submission rejected.');
    }

    // Check the number of previous submission attempts
    // const submissionCount = await Submission.count({ where: { id: id } });
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

    return submission;
  } catch (error) {
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
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const params = {
  Message: message,
  Subject: 'New Assignment Submission',
  TopicArn: process.env.topicArn, // Replace with your SNS topic ARN
  MessageAttributes: {
    'email': {
      DataType: 'String',
      StringValue: userEmail,
    },
  },
};

sns.publish(params, (err, data) => {
  if (err) {
    console.error('Error publishing message to SNS:', err);
    return res.status(500).json({ error: 'Error publishing message to SNS' });
  } else {
    console.log('Message published to SNS:', data.MessageId);
    return res.status(200).json({ message: 'Submission accepted' });
  }
});


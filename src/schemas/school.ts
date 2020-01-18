import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { resolve } from 'path';

const file = readFileSync(resolve(__dirname, 'full-stack-data-set.csv'), 'utf8');

// stores raw full-stack-data-set.csv data sent from email
let data;
parse(file, {
  complete: result => (data = result.data),
});

export const typeDef = `
  extend type Query {
    getSchools: [School]
  }

  type School {
    name: String
    program: String
    degree: String
    delivery: String
    tuition: String
    location: String
  }
`;

class School {
  name: string;
  program: string;
  degree: string;
  delivery: string;
  tuition: string;
  location: string;
}

function readFileAndConvertToJSON() {
  const result = [];
  // data is a comma seperated array of arrays. [[Santa Rosa, $3132, etc ...]]
  for (let i = 1; i < data.length; i++) {
    const obj = new School();
    const college = data[i];
    obj.name = college[0];
    obj.program = college[1];
    obj.degree = college[2];
    obj.delivery = college[3];
    obj.tuition = college[4];
    obj.location = college[5];
    result.push(obj);
  }
  return result;
}

export const resolvers = {
  Query: {
    getSchools() {
      return readFileAndConvertToJSON();
    },
  },
};

import { CompleteCourse } from '../../models/CompleteCourse';

console.log("======Create CompleteCourse Table======");

const createCompleteCourseTable = async() => {
    await CompleteCourse.sync({force : false})
    .then(() => {
        console.log("Success Create CompleteCourse Table");
    })
    .catch((err) => {
        console.log("Error in Create CompleteCourse Table : ", err);
    })
}

createCompleteCourseTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/CompleteCourse.ts
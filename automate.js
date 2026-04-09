const { exec } = require('child_process');

const STUDENT_EMAIL = 'johndoe@myprojects.com';
const TEST_NAME = 'getAll to show all product';

exec(
  'npx jest tests/products.test.js --runInBand --forceExit',
  (error, stdout, stderr) => {
    let status = 'FAILED';
    let code = '500';

    const output = stdout + stderr;

    if (output.includes('should return all products')) {
      status = 'PASSED';
      code = '200';
    }

    console.log(
      `${STUDENT_EMAIL} - ${TEST_NAME} - ${code} - ${status}`
    );
  }
);



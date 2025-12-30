const fetch = require('node-fetch'); // Needs node-fetch installed or use built-in fetch in newer Node

// Node 18+ has built-in fetch. I'll asssume node 18+. If not, I'll need to install node-fetch.
// User metadata doesn't show Node version, but typically it's modern.
// I'll try generic fetch.

const BASE_URL = 'http://localhost:3001';

async function testEndpoints() {
    console.log('--- Testing Endpoints ---');

    try {
        // 1. Root
        console.log('1. Testing Root /');
        const resRoot = await fetch(`${BASE_URL}/`);
        console.log('Status:', resRoot.status);
        console.log('Text:', await resRoot.text());

        // 2. List Students
        console.log('\n2. Testing GET /students');
        const resStudents = await fetch(`${BASE_URL}/students?limit=5`);
        console.log('Status:', resStudents.status);
        const studentsData = await resStudents.json();
        console.log('Response:', JSON.stringify(studentsData, null, 2));

        if (studentsData.data && studentsData.data.data && studentsData.data.data.length > 0) {
            const studentId = studentsData.data.data[0].id;
            console.log(`\nFound student ID: ${studentId}`);

            // 3. Get Student Detail
            console.log(`\n3. Testing GET /students/${studentId}`);
            const resDetail = await fetch(`${BASE_URL}/students/${studentId}`);
            console.log('Status:', resDetail.status);
            console.log('Body:', await resDetail.json());
        } else {
            console.log('\nNo students found to test detail view.');
        }

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testEndpoints();

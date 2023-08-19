const students = [
    // Your initial students data here...
    {
        ID: 1,
        name: 'Alice',
        age: 21,
        grade: 'A',
        degree: 'Btech',
        email: 'alice@example.com'
      },
      {
        ID: 2,
        name: 'Bob',
        age: 22,
        grade: 'B',
        degree: 'MBA',
        email: 'bob@example.com'
      },
      {
        ID: 3,
        name: 'Charlie',
        age: 20,
        grade: 'C',
        degree:'Arts',
        email: 'charlie@example.com'
      }
    
  ];
  
  const studentTable = document.getElementById('student-table');
  console.log(studentTable)
  const studentList = document.getElementById('student-list');
  const addBtn = document.getElementById('add-btn');
  const searchInput = document.getElementById('search');
  
  function renderStudents() {
    studentList.innerHTML = '';
    students.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email} </td>
        <td><button class="edit-btn" data-index="${index}">
        Edit
        </button></td>
        <td><button class="delete-btn" data-index="${index}">
        Delete
        </button></td>
        
        `;
      studentList.appendChild(row);
    });
  }
  
  function clearForm() {
    document.getElementById('student-form').reset();
    addBtn.innerText = 'Add Student';
  }
  
  function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
    const email = document.getElementById('email').value;
  
    const newStudent = {
      ID: students.length + 1,
      name,
      age,
      grade,
      degree,
      email
    };
  
    students.push(newStudent);
    renderStudents();
    clearForm();
  }
  
  function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.getElementById('degree').value = student.degree;
    document.getElementById('email').value = student.email;
    addBtn.innerText = 'Edit Student';
    addBtn.setAttribute('data-index', index);
  }
  
  function updateStudent(index) {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
    const email = document.getElementById('email').value;
  
    students[index] = {
      ...students[index],
      name,
      age,
      grade,
      degree,
      email
    };
  
    renderStudents();
    clearForm();
  }
  
  function deleteStudent(index) {
    students.splice(index, 1);
    renderStudents();
  }
  
  function searchStudents() {
    const searchText = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText)
    );
    renderFilteredStudents(filteredStudents);
  }
  
  function renderFilteredStudents(filteredStudents) {
    studentList.innerHTML = '';
    filteredStudents.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
            <button class="edit-btn" data-index="${index}">
            <img src="./edit_icon.png" alt="Edit">
            </td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      `;
      studentList.appendChild(row);
    });
  }
  
  studentTable.addEventListener('click', event => {
    if (event.target.classList.contains('edit-btn')) {
      const index = parseInt(event.target.getAttribute('data-index'));
      editStudent(index);
    } else if (event.target.classList.contains('delete-btn')) {
      const index = parseInt(event.target.getAttribute('data-index'));
      deleteStudent(index);
    }
  });
  
  addBtn.addEventListener('click', event => {
    if (addBtn.innerText === 'Add Student') {
      addStudent(event);
    } else if (addBtn.innerText === 'Edit Student') {
      const index = parseInt(addBtn.getAttribute('data-index'));
      updateStudent(index);
    }
  });
  
  searchInput.addEventListener('input', searchStudents);
  
  // Initial rendering
  renderStudents();
  

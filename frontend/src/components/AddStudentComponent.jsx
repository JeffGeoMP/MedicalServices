import React from "react";
import StudentService from "../services/assistanceService";
import { Loading, Report } from "notiflix";


class AddStudentComponent extends React.Component {

    studentService = new StudentService();

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            grades: [],
            gradeSelected: 0
        };
    }

    handleSubmitForm = (event) => {
        event.preventDefault();

        let data = this.getFormData(event);

        if(this.validator(data)) {
            Loading.pulse('Adding Student ...');
            this.studentService.addStudent(data).then((response) => {
                Loading.remove();
                Report.success('Student added', 'Student added successfully');
            }).catch((error) => {
                Loading.remove();
                Report.failure('Error', error.message);
            });

            event.target.reset();
        }
    }

    getFormData = (event) => {
        return {
            name: event.target.elements["input-name-student"].value,
            dateOfBirth: event.target.elements["input-date-birth-student"].value,
            nameOfFather: event.target.elements["input-name-father-student"].value,
            nameOfMother: event.target.elements["input-name-mother-student"].value,
            grade: event.target.elements["input-grade-student"].value,
            section: event.target.elements["input-section-student"].value.toUpperCase(),
            dateOfStart: event.target.elements["input-date-start-student"].value
        }
    }

    validator = (data) => {
        if(parseInt(data.grade, 10) <= 0 || parseInt(data.grade, 10) > 12) {
            Report.failure('Incorrect information', 'Please select a grade between 1 and 12');
            return false;
        }
        if(data.section.length > 1) {
            Report.failure('Incorrect information', 'Please select a section with one character');
            return false;
        }
        return true;
    }


    render() {
        return (
            <div>
                <h2>Add Student</h2>
                <span className="mt-3 p-2">Add students according to required data </span>
                <div className="card mt-5 mb-3 p-3">
                    <div className="card-body p-2 mt-2">
                        <div className="col-md-4 offset-md-4">
                            <form className="form-floating needs-validation" onSubmit={this.handleSubmitForm}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="input-name-student" required/>
                                    <label htmlFor="input-name-student">Name student</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="input-date-birth-student" required/>
                                    <label htmlFor="input-date-birth-student">Select date of birth student</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="input-name-father-student" required/>
                                    <label htmlFor="input-name-father-student">Name father of student</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="input-name-mother-student" required/>
                                    <label htmlFor="input-name-mother-student">Name mother of student</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="input-grade-student" required/>
                                    <label htmlFor="input-grade-student">Grade student</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="input-section-student" required/>
                                    <label htmlFor="input-section-student">Section student</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="input-date-start-student" required/>
                                    <label htmlFor="input-date-start-student">Select start student</label>
                                </div>

                                <div className="d-flex justify-content-center mt-2">
                                    <button type="submit" className="btn btn-primary p-2">Add Student</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStudentComponent;
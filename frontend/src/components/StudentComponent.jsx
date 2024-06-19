import React from "react";
import StudentService from "../services/assistanceService";
import { Loading, Report } from "notiflix";

class StudentComponent extends React.Component {

	studentService = new StudentService();

	constructor(props) {
		super(props);
		this.state = {
			students: [],
			grades: [],
			gradeSelected: 0
		};
	}

	componentDidMount() {
		Loading.pulse('Loading Grades ...');
		this.studentService.getGrade().then((response) => {
			this.setState({ grades: response.data });
			Loading.remove();
		}).catch((error) => {
			Loading.remove();
			Report.failure('Error', error.message);
		});
	}

	handleChangeSelectGrade = (event) => {
		this.setState({ gradeSelected: event.target.value });
	}

	uploadStudents = () => {
		const grade = this.state.gradeSelected;

		if (parseInt(grade, 10) === 0) {
			Report.warning('Grade Not selected', 'Please select a grade');
			return;
		}

		Loading.pulse('Loading Students ...');
		this.studentService.getStudents(grade).then((response) => {
			this.setState({ students: response.data });
			Loading.remove();
		}).catch((error) => {
			Loading.remove();
			Report.failure('Error', error.message);
		});
	}

	render() {
		return (
			<div>
				<h2>Students</h2>
				<span className="mt-3 p-2">Gets students according to their grade level</span>

				<div className="card mt-5 mb-3 p-3">
					<div className="card-header">
						<div className="row">
							<div className="col-md-4 offset-md-4">
								<div className="input-group">
									<select className="form-select" id="inputSelected" onChange={this.handleChangeSelectGrade}>
										<option defaultValue value={0}>Choose grade...</option>
										{this.state.grades.map(grade =>
											<option key={grade.grade} value={grade.grade}>{grade.grade}° - {grade.gradeName}</option>
										)}
									</select>
									<button className="btn btn-outline-secondary" type="button" onClick={this.uploadStudents}>Buscar</button>
								</div>
							</div>
						</div>
					</div>
					<div className="card-body p-2 mt-2">
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Birth</th>
										<th scope="col">Father Name</th>
										<th scope="col">Mother Name</th>
										<th scope="col">Grade</th>
										<th scope="col">Section</th>
										<th scope="col">Start Date</th>
									</tr>
								</thead>
								<tbody>
									{this.state.students.map(student =>
										<tr key={student.id}>
											<td title={student.name}>{student.name}</td>
											<td>{student.dateOfBirth}</td>
											<td>{student.nameOfFather}</td>
											<td>{student.nameOfMother}</td>
											<td>{student.grade}°</td>
											<td>{student.section}</td>
											<td>{student.dateOfStart}</td>
										</tr>
									)}
									{this.state.students.length === 0 && <tr><td colSpan="7" className="text-center">No data found </td></tr>}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default StudentComponent;
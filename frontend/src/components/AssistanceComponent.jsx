import React from "react";
import AssistanceService from "../services/assistanceService";
import { Loading, Report } from "notiflix";
import authenticate from "../auth/authenticate";

class AssistanceComponent extends React.Component {

	assistanceService = new AssistanceService();

	constructor(props) {
		super(props);
		this.state = {
			assistance: [],
			expandedRow: null
		};
	}

	componentDidMount() {
		Loading.pulse('Loading Assistance ...');
		this.assistanceService.GetAssistanceWithDetail()
			.then((response) => {
				if (response.data.success === false)
					Report.warning('Could not load assistance', 'Please try again later');
				this.setState({ assistance: response.data.data });
			}).catch((error) => {
				Report.failure('Error', error.message);
			}).finally(() => {
				Loading.remove()
			});
	}

	toggleRow = (id) => {
		this.setState((prevState) => ({
			expandedRow: prevState.expandedRow === id ? null : id
		}));
	};

	exitSession = () => {
		authenticate.removeToken();
		window.location = '/assistance';
	}

	render() {

		const { assistance, expandedRow } = this.state;

		return (
			<div>
				<h2>Assistance</h2>
				<span className="mt-3 p-2">Welcome, here you can see the scheduled attendances.</span>

				<div className="table-responsive mt-3">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>ID</th>
								<th>Date</th>
								<th>Total</th>
								<th>Total Discount</th>
								<th>Total Payment</th>
							</tr>
						</thead>
						<tbody>
							{assistance.map((assistance) => (
								<React.Fragment key={assistance.IdAssistance}>
									<tr>
										<td>{assistance.IdAssistance}</td>
										<td>{new Date(assistance.Date).toLocaleString()}</td>
										<td>{assistance.TotalDisplay}</td>
										<td>{assistance.TotalDiscountDisplay}</td>
										<td>Q {(assistance.Total - assistance.TotalDiscount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
										<td>
											<button
												className="btn btn-sm btn-info"
												onClick={() => this.toggleRow(assistance.IdAssistance)}
											>
												{expandedRow === assistance.IdAssistance ? 'Hide Promotions' : 'Show Promotions'}
											</button>
										</td>
									</tr>
									{expandedRow === assistance.IdAssistance && (
										assistance.PromotionsDetail.map((promo) => (
											<tr key={promo.IdPromotions}>
												<td></td>
												<td>{promo.Name}</td>
												<td>{promo.TotalDisplay}</td>
												<td>{promo.Type === 'S' ? 'Servicio' : 'Producto'}</td>
											</tr>
										))
									)}
								</React.Fragment>
							))}
						</tbody>
					</table>

					
					<div className="col-md-2 offset-md-4">
						<button type="submit" className="btn btn-primary mt-3 w-100" onClick={this.exitSession}>Logout</button>
					</div>
				</div>
			</div>
		);
	}
}

export default AssistanceComponent;
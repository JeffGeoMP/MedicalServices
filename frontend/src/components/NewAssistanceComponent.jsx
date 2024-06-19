import React from "react";
import AssistanceService from "../services/assistanceService";
import LoginService from "../services/loginService";
import { Loading, Report } from "notiflix";

class NewAssistanceComponent extends React.Component {

	assistanceService = new AssistanceService();
	loginService = new LoginService();

	constructor(props) {
		super(props);
		this.state = {
			name : '',
			email : '',
			date: '',
			promotions: [],
			promotionsSelected: [],
			subTotal: 0.00,
			discountServices: 0.00,
			porcentDiscountServices: 0,
			discountProducts: 0.00,
			porcentDiscountProducts: 0,
			total: 0.00
		};
	}

	componentDidMount() {
		Loading.pulse('Loading Promotions ...');
		this.assistanceService.getPromotions()
			.then((response) => {
				if (response.data.success === false)
					Report.warning('Could not load promotions', 'Please try again later');
				this.setState({ promotions: response.data.data });
			}).catch((error) => {
				Report.failure('Error', error.message);
			}).finally(() => {
				Loading.remove();
			});

		Loading.pulse('Loading Data ...');
		this.loginService.getDataUser()
			.then((response) => {
				if (response.data.success === false)
					Report.warning('Could not load user data', 'Please try again later');
				this.setState({ name: response.data.data.Name + ' ' + response.data.data.LastName });
				this.setState({ email: response.data.data.Email });
			}).catch((error) => {
				Report.failure('Error', error.message);
			}).finally(() => {
				Loading.remove();
			});
	}

	handleCheckboxChange = (promotion) => {
		let { promotionsSelected } = this.state;
		if (promotionsSelected.includes(promotion)) {
			promotionsSelected = promotionsSelected.filter(p => p !== promotion);
		} else {
			promotionsSelected.push(promotion);
		}

		this.setState({ promotionsSelected: promotionsSelected });
		this.calculateTotals(promotionsSelected);
	}

	calculateTotals = (promotions) => {
		let subTotal = 0.00;
		subTotal = promotions.reduce((acc, promotion) => acc + promotion.Price, 0);
		this.setState({ subTotal: subTotal.toFixed(2) });

		let discountServices = this.getDiscountPercent(promotions, 'S');
		let totaldiscountServices = this.getTotalByType(promotions, 'S') * (discountServices / 100);
		this.setState({ discountServices: totaldiscountServices.toFixed(2) });
		this.setState({ porcentDiscountServices: discountServices });

		let discountProducts = this.getDiscountPercent(promotions, 'P');
		let totaldiscountProducts = this.getTotalByType(promotions, 'P') * (discountProducts / 100);
		this.setState({ discountProducts: totaldiscountProducts.toFixed(2) });
		this.setState({ porcentDiscountProducts: discountProducts });

		let total = subTotal - totaldiscountProducts.toFixed(2) - totaldiscountServices.toFixed(2);
		this.setState({ total: total.toFixed(2) });
	}

	getDiscountPercent = (promotions, type) => {
		let filterType = promotions.filter(promotion => promotion.Type === type);
		let total = filterType.reduce((total, promotion) => total + promotion.Price, 0);

		if (filterType.length >= 2 && total >= 1500)
			return 5;
		if (filterType.length >= 2)
			return 3;

		return 0;
	}

	getTotalByType = (promotions, type) => {
		let filterType = promotions.filter(promotion => promotion.Type === type);
		let total = filterType.reduce((total, promotion) => total + promotion.Price, 0);
		return total;
	}

	handleDateTimeChange = (event) => {
		this.setState({ date: event.target.value });
	}

	sendAssistance = () => {
		let { date, promotionsSelected } = this.state;
		if (date === '' || promotionsSelected.length === 0) {
			Report.warning('Empty fields', 'Please fill in the fields');
			return;
		}

		Loading.pulse('Sending Assistance ...');
		this.assistanceService.addAssistance(promotionsSelected.map(p => p.IdPromotions), date)
			.then((response) => {
				if (response.data.success === false)
					Report.warning('Could not send assistance', 'Please try again later');
				Report.success('Assistance sent', `Assistance sent successfully, verify your email ${this.state.email} for more information`, 'Ok', () => {
					window.location.reload();
				});
			}).catch((error) => {
				Report.failure('Error', error.message);
			}).finally(() => {
				Loading.remove();
			});
	}

	render() {
		return (
			<div>
				<h2>New Assistance</h2>
				<span className="mt-3">Welcome {this.state.name}, choose the date and time of your attendance and the products and/or services you are interested in.</span>


				<div className="mt-5 col-md-4 offset-md-4">
					<div className="form-group">
						<label htmlFor="input-date-assistance">Date</label>
						<input type="datetime-local" className="form-control" id="input-date-assistance" placeholder="Enter date assitance"
							onChange={this.handleDateTimeChange} required />
					</div>
				</div>
				<div className="form-group mt-3 col-md-8 offset-md-2">
					<label htmlFor="input-password">Select Products or Services</label>
					<div className="container mt-2">
						<div className="overflow-auto border p-2" style={{ height: '400px' }}>
							{this.state.promotions.map((promotion, index) => {
								return (
									<div key={index} className="row p-2">
										<div className="col-md-1">
											<div className="form-check form-switch">
												<input className="form-check-input" type="checkbox" role="switch" id={`check-promotions-${promotion.Id}`}
													onChange={() => this.handleCheckboxChange(promotion)} />
											</div>
										</div>
										<div className="col-md-6">
											<span>{promotion.Name}</span>
										</div>
										<div className="col-md-3">
											<span>{promotion.PriceDisplay}</span>
										</div>
										<div className="col-md-2">
											<span>{promotion.Type === 'S' ? 'Servicio' : 'Producto'}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="mt-5 col-md-4 offset-md-4">
					<div className="mt-3">
						<div className="row">
							<div className="col-md-6">
								<span> SubTotal: </span>
							</div>
							<div className="col-md-6">
								<span>Q. {this.state.subTotal}</span>
							</div>
						</div>
						<div className="row">
							<div className="col-md-8">
								<span> Descuento por Servicios (%{this.state.porcentDiscountServices}): </span>
							</div>
							<div className="col-md-4">
								<span>Q. {this.state.discountServices}</span>
							</div>
						</div>
						<div className="row">
							<div className="col-md-8">
								<span> Descuento por Productos (%{this.state.porcentDiscountProducts}): </span>
							</div>
							<div className="col-md-4">
								<span>Q. {this.state.discountProducts}</span>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-md-6">
								<h4> Total</h4>
							</div>
							<div className="col-md-6">
								<h4>Q. {this.state.total}</h4>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-4 offset-md-4">
					<button type="submit" className="btn btn-primary mt-3 w-100" onClick={this.sendAssistance}>Schedule</button>
				</div>
			</div>
		);
	}
}

export default NewAssistanceComponent;
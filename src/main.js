
$(document).ready(function () {
	$.ajax({
		url: "./src/car.json",
		type: "GET",
		success: function (car) {
			console.log(car);
			for (var i = 0; i < car.data.length; i++) {
				console.log(car.data[i].name);
				$("#cars").append('<option>' + car.data[i].name + '</option>');
			}
		}
	})
	$.ajax({
		url: "./src/fuel.json",
		type: "GET",
		success: function (fuel) {

			console.log(fuel);
			for (var i = 0; i < fuel.data.length; i++) {
				console.log(fuel.data[i].name);
				$("#fuel").append('<option>' + fuel.data[i].name + '</option>');
			}
		}
	})

	$.ajax({
		url: "./src/state.json",
		type: "GET",
		success: function (state) {

			console.log(state);
			for (var i = 0; i < state.data.length; i++) {
				console.log(state.data[i].name);
				$("#state").append('<option>' + state.data[i].name + '</option>');
			}
		}
	})


});
function showInsuranceForm() {

	if ($('input#getInsurance[type="radio"]').is(':checked')) {
		$('.formInsurance').removeClass('hidden');
	}

}
function getInsurance() {
	var carVal = $('#cars').val();
	var fuelVal = $('#fuel').val();
	var stateVal = $('#state').val();
	var cusName = $('#cusName').val();
	var phVal = $('#cusNum').val();
	var status = false;
	if (carVal !== 'Select a car type') {
		status = true;
		$('.errorCars').addClass('hidden');
	} else {
		status = false;
		$('.errorCars').removeClass('hidden');
	}

	if (fuelVal !== 'Select a fuel type') {
		status = true;
		$('.errorFuel').addClass('hidden');
	} else {
		status = false;
		$('.errorFuel').removeClass('hidden');
	}

	if (stateVal !== 'Select a state') {
		status = true;
		$('.errorState').addClass('hidden');
	} else {
		status = false;
		$('.errorState').removeClass('hidden');
	}

	if (cusName.length !== 0 && cusName.length > 2 && cusName.length <= 50) {
		status = true;
		$('.errorName').addClass('hidden');
	} else {
		status = false;
		$('.errorName').removeClass('hidden');
	}
	if (phVal.length !== 0 && phVal.length == 10) {
		status = true;
		$('.errorNumber').addClass('hidden');
	} else {
		status = false;
		$('.errorNumber').removeClass('hidden');
	}
	if (status) {
		$('.formInsurance').addClass('hidden');
		$('.benefits').addClass('hidden');
		$('.buyInsurance').removeClass('hidden');

		$.ajax({
			url: "./src/insurance.json",
			type: "GET",
			success: function (insurance) {
				//alert(insurance.data.length);
				console.log(insurance);
				for (var i = 0; i < insurance.data.length; i++) {
					console.log(insurance.data[i]);
					$("#insuranceA").append("<div id='list" + i + "' class='list' draggable='true' ondragstart='drag(event)'><p>" + insurance.data[i].name + "</p><p>" + insurance.data[i].amount + "</p></div>");
				}
			}
		})

	}

}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");

	ev.target.append(document.getElementById(data));
}
function buyInsurance(e) {
	console.log("buyInsurance", e)
	alert("You Buy the insurance");
}
// ===================================
// Tripzverse - Payment Integration
// Razorpay Test Mode + Booking Flow
// ===================================

// Razorpay Test Key (Replace with your own for production)
var RAZORPAY_KEY_ID = 'rzp_test_demo1234567890';

// Destination data for autocomplete
var destinations = [
    { name: 'New Delhi, India', code: 'DEL' },
    { name: 'Mumbai, India', code: 'BOM' },
    { name: 'Bangalore, India', code: 'BLR' },
    { name: 'Chennai, India', code: 'MAA' },
    { name: 'Kolkata, India', code: 'CCU' },
    { name: 'Hyderabad, India', code: 'HYD' },
    { name: 'Goa, India', code: 'GOI' },
    { name: 'Jaipur, India', code: 'JAI' },
    { name: 'Agra, India', code: 'AGR' },
    { name: 'Kerala, India', code: 'COK' },
    { name: 'Tokyo, Japan', code: 'TYO' },
    { name: 'Osaka, Japan', code: 'OSA' },
    { name: 'Kyoto, Japan', code: 'KYO' },
    { name: 'Bangkok, Thailand', code: 'BKK' },
    { name: 'Phuket, Thailand', code: 'HKT' },
    { name: 'Singapore', code: 'SIN' },
    { name: 'Bali, Indonesia', code: 'DPS' },
    { name: 'Kuala Lumpur, Malaysia', code: 'KUL' },
    { name: 'Hong Kong', code: 'HKG' },
    { name: 'Seoul, South Korea', code: 'ICN' },
    { name: 'Dubai, UAE', code: 'DXB' },
    { name: 'Maldives', code: 'MLE' },
    { name: 'Paris, France', code: 'PAR' },
    { name: 'London, UK', code: 'LON' },
    { name: 'Rome, Italy', code: 'ROM' },
    { name: 'Barcelona, Spain', code: 'BCN' },
    { name: 'Amsterdam, Netherlands', code: 'AMS' },
    { name: 'Berlin, Germany', code: 'BER' },
    { name: 'Prague, Czech Republic', code: 'PRG' },
    { name: 'Vienna, Austria', code: 'VIE' },
    { name: 'Zurich, Switzerland', code: 'ZRH' },
    { name: 'Santorini, Greece', code: 'JTR' },
    { name: 'New York, USA', code: 'NYC' },
    { name: 'Los Angeles, USA', code: 'LAX' },
    { name: 'Miami, USA', code: 'MIA' },
    { name: 'Las Vegas, USA', code: 'LAS' },
    { name: 'San Francisco, USA', code: 'SFO' },
    { name: 'Toronto, Canada', code: 'YYZ' },
    { name: 'Vancouver, Canada', code: 'YVR' },
    { name: 'Cancun, Mexico', code: 'CUN' },
    { name: 'Rio de Janeiro, Brazil', code: 'GIG' },
    { name: 'Sydney, Australia', code: 'SYD' },
    { name: 'Melbourne, Australia', code: 'MEL' },
    { name: 'Auckland, New Zealand', code: 'AKL' },
    { name: 'Queenstown, New Zealand', code: 'ZQN' },
    { name: 'Cape Town, South Africa', code: 'CPT' },
    { name: 'Cairo, Egypt', code: 'CAI' },
    { name: 'Marrakech, Morocco', code: 'RAK' },
    { name: 'Nairobi, Kenya', code: 'NBO' }
];

// Sample data
var sampleHotels = [
    { name: 'Grand Palace Hotel', rating: 5, price: 450, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop', amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'] },
    { name: 'Paradise Resort', rating: 5, price: 680, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop', amenities: ['Beach', 'Pool', 'Diving', 'Restaurant'] },
    { name: 'City Center Inn', rating: 4, price: 120, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop', amenities: ['WiFi', 'Restaurant', 'Gym'] },
    { name: 'Budget Stay Plus', rating: 3, price: 65, image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=300&h=200&fit=crop', amenities: ['WiFi', 'Breakfast'] },
    { name: 'Luxury Suites', rating: 5, price: 890, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop', amenities: ['Pool', 'Spa', 'Fine Dining', 'Casino'] }
];

var sampleBuses = [
    { operator: 'Luxury Travels', type: 'Volvo AC Sleeper', departure: '06:00 AM', arrival: '06:30 PM', duration: '12h 30m', price: 45, seats: 23, rating: 4.8 },
    { operator: 'EuroLines Premium', type: 'Double Decker', departure: '08:00 AM', arrival: '03:15 PM', duration: '7h 15m', price: 38, seats: 45, rating: 4.7 },
    { operator: 'Express Coach', type: 'AC Seater', departure: '10:00 AM', arrival: '04:00 PM', duration: '6h 00m', price: 28, seats: 32, rating: 4.5 },
    { operator: 'Night Rider', type: 'Sleeper', departure: '09:00 PM', arrival: '07:00 AM', duration: '10h 00m', price: 35, seats: 18, rating: 4.6 }
];

var sampleTrains = [
    { name: 'Express 101', type: 'High Speed', departure: '09:30', arrival: '11:45', duration: '2h 15m', economy: 120, business: 180, first: 280 },
    { name: 'Scenic Route', type: 'Panoramic', departure: '08:00', arrival: '16:00', duration: '8h 00m', economy: 150, business: 250, first: 450 },
    { name: 'Night Train', type: 'Sleeper', departure: '22:00', arrival: '08:00', duration: '10h 00m', economy: 89, business: 145, first: 295 }
];

var currentBooking = null;

// Metro station data
var metroStations = {
    delhi: ['Rajiv Chowk', 'Kashmere Gate', 'Central Secretariat', 'Hauz Khas', 'Chandni Chowk', 'New Delhi', 'AIIMS', 'Dwarka', 'Noida City Centre', 'Gurgaon'],
    mumbai: ['Versova', 'Andheri', 'WEH', 'Ghatkopar', 'Bandra-Kurla', 'Colaba', 'CSMT', 'Dadar', 'Thane', 'Belapur'],
    bangalore: ['Majestic', 'MG Road', 'Indiranagar', 'Whitefield', 'Yelachenahalli', 'Nagasandra', 'Silk Institute', 'Central College', 'Cubbon Park', 'Vidhana Soudha'],
    chennai: ['Wimco Nagar', 'Washermanpet', 'Egmore', 'Central', 'Airport', 'St. Thomas Mount', 'Guindy', 'Alandur', 'Little Mount', 'AG-DMS'],
    kolkata: ['Dum Dum', 'Belgachia', 'Shyambazar', 'Esplanade', 'Park Street', 'Rabindra Sadan', 'Kalighat', 'Tollygunge', 'New Garia', 'Kavi Subhash'],
    hyderabad: ['Miyapur', 'JNTU', 'Kukatpally', 'Ameerpet', 'Parade Ground', 'Secunderabad', 'Gandhi Bhavan', 'MGBS', 'Falaknuma', 'LB Nagar']
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initAutocomplete();
    initBookingButtons();
    initSearchForms();
    initMetroBooking();
    initFlightBooking();
    initTrainBooking();
    initBusBooking();
    createModals();
});

// ===================================
// Autocomplete Feature
// ===================================
function initAutocomplete() {
    var inputs = document.querySelectorAll('.search-field input[type="text"]');

    inputs.forEach(function (input) {
        var wrapper = document.createElement('div');
        wrapper.className = 'autocomplete-wrapper';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        var dropdown = document.createElement('div');
        dropdown.className = 'autocomplete-dropdown';
        wrapper.appendChild(dropdown);

        input.addEventListener('input', function () {
            var value = this.value.toLowerCase();
            dropdown.innerHTML = '';

            if (value.length < 2) {
                dropdown.style.display = 'none';
                return;
            }

            var matches = destinations.filter(function (d) {
                return d.name.toLowerCase().includes(value);
            }).slice(0, 6);

            if (matches.length > 0) {
                dropdown.style.display = 'block';
                matches.forEach(function (match) {
                    var item = document.createElement('div');
                    item.className = 'autocomplete-item';
                    item.innerHTML = '<span class="autocomplete-icon">📍</span> ' + match.name;
                    item.addEventListener('click', function () {
                        input.value = match.name;
                        dropdown.style.display = 'none';
                    });
                    dropdown.appendChild(item);
                });
            } else {
                dropdown.style.display = 'none';
            }
        });

        input.addEventListener('blur', function () {
            setTimeout(function () { dropdown.style.display = 'none'; }, 200);
        });

        input.addEventListener('focus', function () {
            if (this.value.length >= 2) {
                this.dispatchEvent(new Event('input'));
            }
        });
    });
}

// ===================================
// Create Modals
// ===================================
function createModals() {
    var modalHTML = '<div class="modal-overlay" id="bookingModal">' +
        '<div class="modal-content">' +
        '<button class="modal-close" onclick="closeModal(\'bookingModal\')">&times;</button>' +
        '<div class="modal-header"><h2 id="modalTitle">Booking Details</h2></div>' +
        '<div class="modal-body" id="modalBody"></div>' +
        '<div class="modal-footer">' +
        '<button class="btn-secondary" onclick="closeModal(\'bookingModal\')">Cancel</button>' +
        '<button class="btn-primary" onclick="initiatePayment()">Proceed to Payment</button>' +
        '</div></div></div>' +
        '<div class="modal-overlay" id="searchResultsModal">' +
        '<div class="modal-content modal-large">' +
        '<button class="modal-close" onclick="closeModal(\'searchResultsModal\')">&times;</button>' +
        '<div class="modal-header"><h2 id="searchResultsTitle">Search Results</h2></div>' +
        '<div class="modal-body" id="searchResultsBody"></div>' +
        '</div></div>' +
        '<div class="modal-overlay" id="confirmationModal">' +
        '<div class="modal-content">' +
        '<div class="confirmation-content">' +
        '<div class="confirmation-icon">✅</div>' +
        '<h2>Booking Confirmed!</h2>' +
        '<p id="confirmationMessage">Your booking has been confirmed successfully.</p>' +
        '<div class="booking-details" id="bookingDetails"></div>' +
        '<button class="btn-primary" onclick="closeModal(\'confirmationModal\')">Done</button>' +
        '</div></div></div>';

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

// ===================================
// Booking Buttons
// ===================================
function initBookingButtons() {
    document.querySelectorAll('.hotel-card .book-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var card = this.closest('.hotel-card');
            var hotelName = card.querySelector('.hotel-name') ? card.querySelector('.hotel-name').textContent : 'Hotel';
            var location = card.querySelector('.hotel-location') ? card.querySelector('.hotel-location').textContent : '';
            var price = card.querySelector('.price') ? card.querySelector('.price').textContent : '$0';

            currentBooking = {
                type: 'hotel',
                name: hotelName,
                location: location,
                price: price,
                checkIn: 'Tomorrow',
                checkOut: '3 nights',
                guests: '2 Adults'
            };
            showBookingModal('hotel');
        });
    });

    document.querySelectorAll('.bus-card .book-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var card = this.closest('.bus-card');
            var operator = card.querySelector('.operator-info h4') ? card.querySelector('.operator-info h4').textContent : 'Bus';
            var price = card.querySelector('.price') ? card.querySelector('.price').textContent : '$0';
            var routes = card.querySelectorAll('.city');

            currentBooking = {
                type: 'bus',
                name: operator,
                from: routes[0] ? routes[0].textContent : '',
                to: routes[1] ? routes[1].textContent : '',
                price: price,
                date: 'Tomorrow',
                passengers: 1
            };
            showBookingModal('bus');
        });
    });

    document.querySelectorAll('.train-card .book-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var card = this.closest('.train-card');
            var trainName = card.querySelector('.train-name h3') ? card.querySelector('.train-name h3').textContent : 'Train';
            var routes = card.querySelectorAll('.station-name');

            currentBooking = {
                type: 'train',
                name: trainName,
                from: routes[0] ? routes[0].textContent : '',
                to: routes[1] ? routes[1].textContent : '',
                price: '$120',
                trainClass: 'Economy',
                date: 'Tomorrow'
            };
            showBookingModal('train');
        });
    });

    document.querySelectorAll('.transport-card .book-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var card = this.closest('.transport-card');
            var vehicleType = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Vehicle';

            currentBooking = {
                type: 'transport',
                name: vehicleType,
                pickup: 'Current Location',
                drop: 'Destination',
                price: '$25',
                distance: '10 km'
            };
            showBookingModal('transport');
        });
    });
}

function showBookingModal(type) {
    var modalBody = document.getElementById('modalBody');
    var modalTitle = document.getElementById('modalTitle');
    var content = '';

    if (type === 'hotel') {
        modalTitle.textContent = '🏨 Hotel Booking';
        content = '<div class="booking-summary">' +
            '<h3>' + currentBooking.name + '</h3>' +
            '<p class="booking-location">' + currentBooking.location + '</p>' +
            '<div class="booking-info-grid">' +
            '<div class="info-item"><span class="label">Check-in</span><span class="value">' + currentBooking.checkIn + '</span></div>' +
            '<div class="info-item"><span class="label">Duration</span><span class="value">' + currentBooking.checkOut + '</span></div>' +
            '<div class="info-item"><span class="label">Guests</span><span class="value">' + currentBooking.guests + '</span></div>' +
            '<div class="info-item"><span class="label">Price/Night</span><span class="value">' + currentBooking.price + '</span></div>' +
            '</div>' +
            '<div class="total-price"><span>Total Amount:</span><span class="amount">' + currentBooking.price + '</span></div>' +
            '</div>';
    } else if (type === 'bus') {
        modalTitle.textContent = '🚌 Bus Booking';
        content = '<div class="booking-summary">' +
            '<h3>' + currentBooking.name + '</h3>' +
            '<div class="route-display"><span class="from">' + currentBooking.from + '</span><span class="arrow">→</span><span class="to">' + currentBooking.to + '</span></div>' +
            '<div class="booking-info-grid">' +
            '<div class="info-item"><span class="label">Date</span><span class="value">' + currentBooking.date + '</span></div>' +
            '<div class="info-item"><span class="label">Passengers</span><span class="value">' + currentBooking.passengers + '</span></div>' +
            '</div>' +
            '<div class="seat-selection"><h4>Select Seat</h4><div class="seat-grid">' + generateSeatGrid() + '</div></div>' +
            '<div class="total-price"><span>Total Amount:</span><span class="amount">' + currentBooking.price + '</span></div>' +
            '</div>';
    } else if (type === 'train') {
        modalTitle.textContent = '🚂 Train Booking';
        content = '<div class="booking-summary">' +
            '<h3>' + currentBooking.name + '</h3>' +
            '<div class="route-display"><span class="from">' + currentBooking.from + '</span><span class="arrow">→</span><span class="to">' + currentBooking.to + '</span></div>' +
            '<div class="class-selection"><h4>Select Class</h4>' +
            '<div class="class-options">' +
            '<label class="class-option selected"><input type="radio" name="trainClass" value="economy" checked><span class="class-name">Economy</span><span class="class-price">$120</span></label>' +
            '<label class="class-option"><input type="radio" name="trainClass" value="business"><span class="class-name">Business</span><span class="class-price">$180</span></label>' +
            '<label class="class-option"><input type="radio" name="trainClass" value="first"><span class="class-name">First Class</span><span class="class-price">$280</span></label>' +
            '</div></div>' +
            '<div class="total-price"><span>Total Amount:</span><span class="amount">$120</span></div>' +
            '</div>';
    } else if (type === 'transport') {
        modalTitle.textContent = '🚕 Transport Booking';
        content = '<div class="booking-summary">' +
            '<h3>' + currentBooking.name + '</h3>' +
            '<div class="booking-info-grid">' +
            '<div class="info-item"><span class="label">Pickup</span><span class="value">' + currentBooking.pickup + '</span></div>' +
            '<div class="info-item"><span class="label">Drop</span><span class="value">' + currentBooking.drop + '</span></div>' +
            '<div class="info-item"><span class="label">Distance</span><span class="value">' + currentBooking.distance + '</span></div>' +
            '</div>' +
            '<div class="total-price"><span>Estimated Fare:</span><span class="amount">' + currentBooking.price + '</span></div>' +
            '</div>';
    } else if (type === 'metro') {
        modalTitle.textContent = '🚇 Metro Ticket';
        content = '<div class="booking-summary">' +
            '<h3>' + currentBooking.name + '</h3>' +
            '<div class="route-display"><span class="from">' + currentBooking.from + '</span><span class="arrow">→</span><span class="to">' + currentBooking.to + '</span></div>' +
            '<div class="booking-info-grid">' +
            '<div class="info-item"><span class="label">Journey Type</span><span class="value">Single Trip</span></div>' +
            '<div class="info-item"><span class="label">Passengers</span><span class="value">' + currentBooking.passengers + '</span></div>' +
            '</div>' +
            '<div class="metro-ticket-type">' +
            '<h4>Ticket Type</h4>' +
            '<div class="class-options">' +
            '<label class="class-option selected"><input type="radio" name="ticketType" value="qr" checked><span class="class-name">🎫 QR Ticket</span><span class="class-price">Digital</span></label>' +
            '<label class="class-option"><input type="radio" name="ticketType" value="token"><span class="class-name">🪙 Token</span><span class="class-price">Physical</span></label>' +
            '<label class="class-option"><input type="radio" name="ticketType" value="smartcard"><span class="class-name">💳 Smart Card</span><span class="class-price">Recharge</span></label>' +
            '</div></div>' +
            '<div class="total-price"><span>Fare:</span><span class="amount">' + currentBooking.price + '</span></div>' +
            '</div>';
    } else if (type === 'flight') {
        modalTitle.textContent = '✈️ Flight Booking';
        content = '<div class="booking-summary">' +
            '<h3>' + currentBooking.name + '</h3>' +
            '<div class="route-display"><span class="from">' + currentBooking.from + '</span><span class="arrow">✈️</span><span class="to">' + currentBooking.to + '</span></div>' +
            '<div class="flight-info-grid">' +
            '<div class="info-item"><span class="label">Date</span><span class="value">' + currentBooking.date + '</span></div>' +
            '<div class="info-item"><span class="label">Departure</span><span class="value">' + currentBooking.departure + '</span></div>' +
            '<div class="info-item"><span class="label">Arrival</span><span class="value">' + currentBooking.arrival + '</span></div>' +
            '<div class="info-item"><span class="label">Duration</span><span class="value">' + currentBooking.duration + '</span></div>' +
            '<div class="info-item"><span class="label">Passengers</span><span class="value">' + currentBooking.passengers + ' Adult</span></div>' +
            '<div class="info-item"><span class="label">Class</span><span class="value">' + currentBooking.class + '</span></div>' +
            '</div>' +
            '<div class="flight-extras">' +
            '<h4>Add-Ons</h4>' +
            '<label class="addon-option"><input type="checkbox" value="meal"> 🍱 Meal (₹350)</label>' +
            '<label class="addon-option"><input type="checkbox" value="seat"> 💺 Preferred Seat (₹500)</label>' +
            '<label class="addon-option"><input type="checkbox" value="baggage"> 🧳 Extra Baggage (₹1200)</label>' +
            '</div>' +
            '<div class="total-price"><span>Total Fare:</span><span class="amount">' + currentBooking.price + '</span></div>' +
            '</div>';
    }

    modalBody.innerHTML = content;
    openModal('bookingModal');

    if (type === 'train') {
        document.querySelectorAll('.class-option').forEach(function (option) {
            option.addEventListener('click', function () {
                document.querySelectorAll('.class-option').forEach(function (o) { o.classList.remove('selected'); });
                this.classList.add('selected');
                var price = this.querySelector('.class-price').textContent;
                document.querySelector('.total-price .amount').textContent = price;
                currentBooking.price = price;
            });
        });
    }
}

function generateSeatGrid() {
    var seats = '';
    var bookedSeats = [3, 7, 12, 15, 18];

    for (var i = 1; i <= 20; i++) {
        var isBooked = bookedSeats.indexOf(i) !== -1;
        var status = isBooked ? 'booked' : 'available';
        var onclick = isBooked ? '' : ' onclick="selectSeat(this)"';
        seats += '<div class="seat ' + status + '" data-seat="' + i + '"' + onclick + '>' + i + '</div>';
    }
    return seats;
}

function selectSeat(element) {
    document.querySelectorAll('.seat.selected').forEach(function (s) { s.classList.remove('selected'); });
    element.classList.add('selected');
    currentBooking.seat = element.dataset.seat;
}

// ===================================
// Search Forms
// ===================================
function initSearchForms() {
    document.querySelectorAll('.search-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var panel = this.closest('.search-panel');
            var panelId = panel ? panel.id : '';

            if (panelId.indexOf('hotels') !== -1) {
                showSearchResults('hotels');
            } else if (panelId.indexOf('buses') !== -1) {
                showSearchResults('buses');
            } else if (panelId.indexOf('trains') !== -1) {
                showSearchResults('trains');
            } else if (panelId.indexOf('transport') !== -1) {
                showToast('🚕 Finding nearby rides...');
                setTimeout(function () { showToast('✅ 5 rides available near you!'); }, 1500);
            }
        });
    });
}

function showSearchResults(type) {
    var resultsBody = document.getElementById('searchResultsBody');
    var resultsTitle = document.getElementById('searchResultsTitle');
    var content = '';

    if (type === 'hotels') {
        resultsTitle.textContent = '🏨 Available Hotels';
        content = '<div class="search-results-grid">';
        sampleHotels.forEach(function (hotel) {
            var stars = '';
            for (var i = 0; i < hotel.rating; i++) stars += '⭐';
            var amenities = hotel.amenities.map(function (a) { return '<span>' + a + '</span>'; }).join('');
            content += '<div class="result-card">' +
                '<img src="' + hotel.image + '" alt="' + hotel.name + '">' +
                '<div class="result-info">' +
                '<h4>' + hotel.name + '</h4>' +
                '<div class="result-rating">' + stars + '</div>' +
                '<div class="result-amenities">' + amenities + '</div>' +
                '<div class="result-footer">' +
                '<span class="result-price">$' + hotel.price + '/night</span>' +
                '<button class="book-btn small" onclick="quickBook(\'hotel\', \'' + hotel.name + '\', ' + hotel.price + ')">Book Now</button>' +
                '</div></div></div>';
        });
        content += '</div>';
    } else if (type === 'buses') {
        resultsTitle.textContent = '🚌 Available Buses';
        content = '<div class="search-results-list">';
        sampleBuses.forEach(function (bus) {
            content += '<div class="result-card horizontal">' +
                '<div class="bus-result-info">' +
                '<div class="operator"><h4>' + bus.operator + '</h4><span class="bus-type">' + bus.type + '</span></div>' +
                '<div class="timing"><span class="time">' + bus.departure + '</span><span class="duration">' + bus.duration + '</span><span class="time">' + bus.arrival + '</span></div>' +
                '<div class="rating">⭐ ' + bus.rating + '</div>' +
                '<div class="seats">' + bus.seats + ' seats left</div>' +
                '<div class="price-book"><span class="result-price">$' + bus.price + '</span>' +
                '<button class="book-btn small" onclick="quickBook(\'bus\', \'' + bus.operator + '\', ' + bus.price + ')">Select</button></div>' +
                '</div></div>';
        });
        content += '</div>';
    } else if (type === 'trains') {
        resultsTitle.textContent = '🚂 Available Trains';
        content = '<div class="search-results-list">';
        sampleTrains.forEach(function (train) {
            content += '<div class="result-card horizontal">' +
                '<div class="train-result-info">' +
                '<div class="train-name"><h4>' + train.name + '</h4><span class="train-type">' + train.type + '</span></div>' +
                '<div class="timing"><span class="time">' + train.departure + '</span><span class="duration">' + train.duration + '</span><span class="time">' + train.arrival + '</span></div>' +
                '<div class="classes"><span>Economy: $' + train.economy + '</span><span>Business: $' + train.business + '</span><span>First: $' + train.first + '</span></div>' +
                '<button class="book-btn small" onclick="quickBook(\'train\', \'' + train.name + '\', ' + train.economy + ')">Book Now</button>' +
                '</div></div>';
        });
        content += '</div>';
    }

    resultsBody.innerHTML = content;
    openModal('searchResultsModal');
}

function quickBook(type, name, price) {
    closeModal('searchResultsModal');
    currentBooking = {
        type: type,
        name: name,
        price: '$' + price,
        location: 'Selected destination',
        from: 'Departure',
        to: 'Arrival',
        date: 'Tomorrow',
        checkIn: 'Tomorrow',
        checkOut: '3 nights',
        guests: '2 Adults',
        passengers: 1
    };
    showBookingModal(type);
}

// ===================================
// Payment Integration
// ===================================
function initiatePayment() {
    var amount = parseInt(currentBooking.price.replace(/[^0-9]/g, '')) * 100;

    if (typeof Razorpay === 'undefined') {
        simulatePayment();
        return;
    }

    var options = {
        key: RAZORPAY_KEY_ID,
        amount: amount,
        currency: 'INR',
        name: 'Tripzverse',
        description: currentBooking.type.toUpperCase() + ' Booking - ' + currentBooking.name,
        image: 'https://tripzverse.in/logo.png',
        handler: function (response) {
            showConfirmation(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Guest User',
            email: 'guest@tripzverse.in',
            contact: '9999999999'
        },
        theme: { color: '#8b5cf6' },
        modal: {
            ondismiss: function () {
                showToast('Payment cancelled');
            }
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
    closeModal('bookingModal');
}

function simulatePayment() {
    closeModal('bookingModal');
    showToast('💳 Processing payment...');

    setTimeout(function () {
        var paymentId = 'TRZ' + Date.now().toString().slice(-8);
        showConfirmation(paymentId);
    }, 2000);
}

function showConfirmation(paymentId) {
    var bookingDetails = document.getElementById('bookingDetails');
    var confirmationMessage = document.getElementById('confirmationMessage');
    var bookingId = 'BK' + Date.now().toString().slice(-10);

    confirmationMessage.textContent = 'Thank you for booking with Tripzverse!';

    bookingDetails.innerHTML = '<div class="confirmation-item"><span class="label">Booking ID:</span><span class="value">' + bookingId + '</span></div>' +
        '<div class="confirmation-item"><span class="label">Payment ID:</span><span class="value">' + paymentId + '</span></div>' +
        '<div class="confirmation-item"><span class="label">Service:</span><span class="value">' + currentBooking.name + '</span></div>' +
        '<div class="confirmation-item"><span class="label">Amount Paid:</span><span class="value">' + currentBooking.price + '</span></div>' +
        '<div class="confirmation-item"><span class="label">Status:</span><span class="value status-confirmed">✓ Confirmed</span></div>';

    openModal('confirmationModal');
    showToast('✅ Booking confirmed!');
}

// ===================================
// Toast Notifications
// ===================================
function showToast(message) {
    var existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () { toast.classList.add('show'); }, 10);
    setTimeout(function () {
        toast.classList.remove('show');
        setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
}

// ===================================
// Metro Booking
// ===================================
function initMetroBooking() {
    // Metro city selection - populate station autocomplete
    var metroCity = document.getElementById('metroCity');
    var metroFrom = document.getElementById('metroFrom');
    var metroTo = document.getElementById('metroTo');

    if (metroCity) {
        metroCity.addEventListener('change', function () {
            var city = this.value;
            if (city && metroStations[city]) {
                setupMetroAutocomplete(metroFrom, city);
                setupMetroAutocomplete(metroTo, city);
            }
        });
    }

    // Metro search button
    var searchMetroBtn = document.getElementById('searchMetro');
    if (searchMetroBtn) {
        searchMetroBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var city = metroCity ? metroCity.value : '';
            var from = metroFrom ? metroFrom.value : '';
            var to = metroTo ? metroTo.value : '';

            if (!city) {
                showToast('Please select a metro city');
                return;
            }
            if (!from || !to) {
                showToast('Please enter source and destination stations');
                return;
            }

            showMetroTicket(city, from, to);
        });
    }

    // Metro card book buttons
    document.querySelectorAll('.metro-book').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var metroName = this.getAttribute('data-metro');
            currentBooking = {
                type: 'metro',
                name: metroName,
                from: 'Select Station',
                to: 'Select Station',
                price: '₹30',
                passengers: 1
            };
            showBookingModal('metro');
        });
    });
}

function setupMetroAutocomplete(input, city) {
    if (!input) return;

    var wrapper = input.closest('.autocomplete-wrapper') || input.parentNode;
    var dropdown = wrapper.querySelector('.autocomplete-dropdown');

    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'autocomplete-dropdown';
        wrapper.appendChild(dropdown);
    }

    input.addEventListener('input', function () {
        var value = this.value.toLowerCase();
        dropdown.innerHTML = '';

        if (value.length < 1) {
            dropdown.style.display = 'none';
            return;
        }

        var stations = metroStations[city] || [];
        var matches = stations.filter(function (s) {
            return s.toLowerCase().includes(value);
        });

        if (matches.length > 0) {
            dropdown.style.display = 'block';
            matches.forEach(function (station) {
                var item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = '<span class="autocomplete-icon">🚉</span> ' + station;
                item.addEventListener('click', function () {
                    input.value = station;
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(item);
            });
        } else {
            dropdown.style.display = 'none';
        }
    });
}

function showMetroTicket(city, from, to) {
    var cityNames = {
        delhi: 'Delhi Metro (DMRC)',
        mumbai: 'Mumbai Metro (MMRC)',
        bangalore: 'Namma Metro (BMRCL)',
        chennai: 'Chennai Metro (CMRL)',
        kolkata: 'Kolkata Metro (KMRC)',
        hyderabad: 'Hyderabad Metro (L&T)'
    };

    var fares = { delhi: 30, mumbai: 40, bangalore: 35, chennai: 35, kolkata: 20, hyderabad: 30 };

    currentBooking = {
        type: 'metro',
        name: cityNames[city] || city,
        from: from,
        to: to,
        price: '₹' + (fares[city] || 30),
        passengers: 1
    };

    showBookingModal('metro');
}

// ===================================
// Flight Booking System
// ===================================

// Indian and International Airport Data
var airports = [
    // Major Indian Airports
    { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India', type: 'domestic' },
    { code: 'BOM', name: 'Chhatrapati Shivaji International Airport', city: 'Mumbai', country: 'India', type: 'domestic' },
    { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India', type: 'domestic' },
    { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India', type: 'domestic' },
    { code: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India', type: 'domestic' },
    { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India', type: 'domestic' },
    { code: 'GOI', name: 'Dabolim Airport', city: 'Goa', country: 'India', type: 'domestic' },
    { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India', type: 'domestic' },
    { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', country: 'India', type: 'domestic' },
    { code: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India', type: 'domestic' },
    { code: 'AMD', name: 'Sardar Vallabhbhai Patel International', city: 'Ahmedabad', country: 'India', type: 'domestic' },
    { code: 'LKO', name: 'Chaudhary Charan Singh International', city: 'Lucknow', country: 'India', type: 'domestic' },
    { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi International', city: 'Guwahati', country: 'India', type: 'domestic' },
    { code: 'IXC', name: 'Chandigarh International Airport', city: 'Chandigarh', country: 'India', type: 'domestic' },
    { code: 'IXB', name: 'Bagdogra Airport', city: 'Siliguri', country: 'India', type: 'domestic' },
    { code: 'SXR', name: 'Sheikh ul-Alam International Airport', city: 'Srinagar', country: 'India', type: 'domestic' },
    // International Airports
    { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE', type: 'international' },
    { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK', type: 'international' },
    { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore', type: 'international' },
    { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', type: 'international' },
    { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', type: 'international' },
    { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA', type: 'international' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', type: 'international' },
    { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', type: 'international' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', type: 'international' },
    { code: 'AMS', name: 'Amsterdam Schiphol Airport', city: 'Amsterdam', country: 'Netherlands', type: 'international' },
    { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China', type: 'international' },
    { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', type: 'international' },
    { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', type: 'international' },
    { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia', type: 'international' },
    { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', type: 'international' },
    { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', type: 'international' },
    { code: 'MLE', name: 'Velana International Airport', city: 'Male', country: 'Maldives', type: 'international' },
    { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia', type: 'international' }
];

// Indian Railway Stations (IRCTC Official Data)
var indianRailwayStations = [
    // Major Junctions - Northern Railway
    { code: 'NDLS', name: 'New Delhi Railway Station', city: 'New Delhi', zone: 'NR', type: 'junction' },
    { code: 'DLI', name: 'Old Delhi Junction', city: 'Delhi', zone: 'NR', type: 'junction' },
    { code: 'DEE', name: 'Delhi Sarai Rohilla', city: 'Delhi', zone: 'NR', type: 'terminal' },
    { code: 'ANVT', name: 'Anand Vihar Terminal', city: 'Delhi', zone: 'NR', type: 'terminal' },
    { code: 'NZM', name: 'Hazrat Nizamuddin', city: 'Delhi', zone: 'NR', type: 'junction' },
    { code: 'LKO', name: 'Lucknow Charbagh', city: 'Lucknow', zone: 'NR', type: 'junction' },
    { code: 'CNB', name: 'Kanpur Central', city: 'Kanpur', zone: 'NCR', type: 'junction' },
    { code: 'AGC', name: 'Agra Cantt', city: 'Agra', zone: 'NCR', type: 'junction' },
    { code: 'AF', name: 'Agra Fort', city: 'Agra', zone: 'NCR', type: 'station' },
    { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur', zone: 'NWR', type: 'junction' },
    { code: 'UDZ', name: 'Udaipur City', city: 'Udaipur', zone: 'NWR', type: 'station' },
    { code: 'JU', name: 'Jodhpur Junction', city: 'Jodhpur', zone: 'NWR', type: 'junction' },
    { code: 'AII', name: 'Ajmer Junction', city: 'Ajmer', zone: 'NWR', type: 'junction' },
    { code: 'ABR', name: 'Abu Road', city: 'Abu Road', zone: 'NWR', type: 'station' },
    { code: 'CDG', name: 'Chandigarh Junction', city: 'Chandigarh', zone: 'NR', type: 'junction' },
    { code: 'ASR', name: 'Amritsar Junction', city: 'Amritsar', zone: 'NR', type: 'junction' },
    { code: 'JAT', name: 'Jammu Tawi', city: 'Jammu', zone: 'NR', type: 'terminal' },
    { code: 'SVDK', name: 'Shri Mata Vaishno Devi Katra', city: 'Katra', zone: 'NR', type: 'terminal' },
    { code: 'DDN', name: 'Dehradun', city: 'Dehradun', zone: 'NR', type: 'terminal' },
    { code: 'HW', name: 'Haridwar Junction', city: 'Haridwar', zone: 'NR', type: 'junction' },
    { code: 'RKSH', name: 'Rishikesh', city: 'Rishikesh', zone: 'NR', type: 'terminal' },

    // Major Junctions - Western Railway
    { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai', zone: 'WR', type: 'terminal' },
    { code: 'CSTM', name: 'Chhatrapati Shivaji Terminus', city: 'Mumbai', zone: 'CR', type: 'terminal' },
    { code: 'LTT', name: 'Lokmanya Tilak Terminus', city: 'Mumbai', zone: 'CR', type: 'terminal' },
    { code: 'BVI', name: 'Borivali', city: 'Mumbai', zone: 'WR', type: 'station' },
    { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad', zone: 'WR', type: 'junction' },
    { code: 'BRC', name: 'Vadodara Junction', city: 'Vadodara', zone: 'WR', type: 'junction' },
    { code: 'ST', name: 'Surat', city: 'Surat', zone: 'WR', type: 'station' },
    { code: 'RJT', name: 'Rajkot Junction', city: 'Rajkot', zone: 'WR', type: 'junction' },

    // Major Junctions - Central Railway
    { code: 'PUNE', name: 'Pune Junction', city: 'Pune', zone: 'CR', type: 'junction' },
    { code: 'NGP', name: 'Nagpur Junction', city: 'Nagpur', zone: 'CR', type: 'junction' },
    { code: 'NED', name: 'Nanded', city: 'Nanded', zone: 'SCR', type: 'junction' },
    { code: 'SUR', name: 'Solapur Junction', city: 'Solapur', zone: 'CR', type: 'junction' },

    // Major Junctions - Eastern Railway
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', zone: 'ER', type: 'junction' },
    { code: 'SDAH', name: 'Sealdah', city: 'Kolkata', zone: 'ER', type: 'terminal' },
    { code: 'KOAA', name: 'Kolkata Chitpur', city: 'Kolkata', zone: 'ER', type: 'terminal' },
    { code: 'NJP', name: 'New Jalpaiguri Junction', city: 'Siliguri', zone: 'NFR', type: 'junction' },
    { code: 'MLDT', name: 'Malda Town', city: 'Malda', zone: 'ER', type: 'junction' },
    { code: 'GHY', name: 'Guwahati', city: 'Guwahati', zone: 'NFR', type: 'junction' },
    { code: 'DBRG', name: 'Dibrugarh', city: 'Dibrugarh', zone: 'NFR', type: 'junction' },
    { code: 'PNBE', name: 'Patna Junction', city: 'Patna', zone: 'ECR', type: 'junction' },
    { code: 'RJPB', name: 'Rajendra Nagar Terminal', city: 'Patna', zone: 'ECR', type: 'terminal' },
    { code: 'DNR', name: 'Danapur', city: 'Danapur', zone: 'ECR', type: 'junction' },
    { code: 'MGS', name: 'Mughal Sarai Junction', city: 'Mughalsarai', zone: 'ECR', type: 'junction' },
    { code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', zone: 'NER', type: 'junction' },
    { code: 'GKP', name: 'Gorakhpur Junction', city: 'Gorakhpur', zone: 'NER', type: 'junction' },
    { code: 'RNC', name: 'Ranchi Junction', city: 'Ranchi', zone: 'SER', type: 'junction' },
    { code: 'TATA', name: 'Tatanagar Junction', city: 'Jamshedpur', zone: 'SER', type: 'junction' },
    { code: 'BBS', name: 'Bhubaneswar', city: 'Bhubaneswar', zone: 'ECoR', type: 'junction' },
    { code: 'PURI', name: 'Puri', city: 'Puri', zone: 'ECoR', type: 'terminal' },
    { code: 'CTC', name: 'Cuttack Junction', city: 'Cuttack', zone: 'ECoR', type: 'junction' },

    // Major Junctions - Southern Railway
    { code: 'MAS', name: 'Chennai Central', city: 'Chennai', zone: 'SR', type: 'terminal' },
    { code: 'MS', name: 'Chennai Egmore', city: 'Chennai', zone: 'SR', type: 'terminal' },
    { code: 'SBC', name: 'Bangalore City Junction', city: 'Bangalore', zone: 'SWR', type: 'junction' },
    { code: 'YPR', name: 'Yesvantpur Junction', city: 'Bangalore', zone: 'SWR', type: 'junction' },
    { code: 'KSR', name: 'Bangalore Cantonment', city: 'Bangalore', zone: 'SWR', type: 'station' },
    { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad', zone: 'SCR', type: 'junction' },
    { code: 'HYB', name: 'Hyderabad Deccan', city: 'Hyderabad', zone: 'SCR', type: 'terminal' },
    { code: 'KCHV', name: 'Kacheguda', city: 'Hyderabad', zone: 'SCR', type: 'junction' },
    { code: 'TVC', name: 'Thiruvananthapuram Central', city: 'Thiruvananthapuram', zone: 'SR', type: 'terminal' },
    { code: 'ERS', name: 'Ernakulam Junction', city: 'Kochi', zone: 'SR', type: 'junction' },
    { code: 'CLT', name: 'Kozhikode (Calicut)', city: 'Kozhikode', zone: 'SR', type: 'junction' },
    { code: 'TCR', name: 'Thrissur', city: 'Thrissur', zone: 'SR', type: 'junction' },
    { code: 'CBE', name: 'Coimbatore Junction', city: 'Coimbatore', zone: 'SR', type: 'junction' },
    { code: 'MDU', name: 'Madurai Junction', city: 'Madurai', zone: 'SR', type: 'junction' },
    { code: 'TPJ', name: 'Tiruchirappalli Junction', city: 'Tiruchirappalli', zone: 'SR', type: 'junction' },
    { code: 'SA', name: 'Salem Junction', city: 'Salem', zone: 'SR', type: 'junction' },
    { code: 'MYS', name: 'Mysore Junction', city: 'Mysore', zone: 'SWR', type: 'junction' },
    { code: 'UBL', name: 'Hubballi Junction', city: 'Hubballi', zone: 'SWR', type: 'junction' },
    { code: 'MAO', name: 'Madgaon Junction', city: 'Margao', zone: 'KR', type: 'junction' },
    { code: 'KRMI', name: 'Karmali', city: 'Goa', zone: 'KR', type: 'station' },
    { code: 'VSG', name: 'Vasco da Gama', city: 'Goa', zone: 'SWR', type: 'terminal' },
    { code: 'VSKP', name: 'Visakhapatnam Junction', city: 'Visakhapatnam', zone: 'ECoR', type: 'junction' },
    { code: 'BZA', name: 'Vijayawada Junction', city: 'Vijayawada', zone: 'SCR', type: 'junction' },
    { code: 'GNT', name: 'Guntur Junction', city: 'Guntur', zone: 'SCR', type: 'junction' },
    { code: 'RU', name: 'Rajahmundry', city: 'Rajahmundry', zone: 'SCR', type: 'junction' },
    { code: 'TPTY', name: 'Tirupati', city: 'Tirupati', zone: 'SCR', type: 'junction' }
];

// Sample trains data
var sampleTrains = [
    { trainNo: '12301', name: 'Howrah Rajdhani Express', departure: '16:55', arrival: '10:00', duration: '17h 05m', price: 2865, type: 'Rajdhani' },
    { trainNo: '12951', name: 'Mumbai Rajdhani Express', departure: '16:35', arrival: '08:35', duration: '16h 00m', price: 2990, type: 'Rajdhani' },
    { trainNo: '12002', name: 'Bhopal Shatabdi Express', departure: '06:00', arrival: '13:50', duration: '7h 50m', price: 1655, type: 'Shatabdi' },
    { trainNo: '12259', name: 'Sealdah Duronto Express', departure: '20:35', arrival: '12:45', duration: '16h 10m', price: 2355, type: 'Duronto' },
    { trainNo: '12627', name: 'Karnataka Express', departure: '21:40', arrival: '06:40', duration: '33h 00m', price: 1245, type: 'Superfast' },
    { trainNo: '12839', name: 'Chennai Mail', departure: '21:30', arrival: '07:00', duration: '33h 30m', price: 985, type: 'Mail/Express' }
];

// ===================================
// Indian Government Bus Corporations
// ===================================

// Tamil Nadu Bus Stands
var tamilNaduBusStands = [
    // Chennai
    { code: 'CMBT', name: 'CMBT (Chennai Mofussil Bus Terminus)', city: 'Chennai', district: 'Chennai' },
    { code: 'KYM', name: 'Koyambedu Bus Stand', city: 'Chennai', district: 'Chennai' },
    { code: 'TAM', name: 'Tambaram Bus Stand', city: 'Chennai', district: 'Chengalpattu' },
    { code: 'MBK', name: 'Madhavaram Bus Stand', city: 'Chennai', district: 'Thiruvallur' },
    // Major Cities
    { code: 'MDU', name: 'Mattuthavani Bus Stand', city: 'Madurai', district: 'Madurai' },
    { code: 'ARPR', name: 'Arappalayam Bus Stand', city: 'Madurai', district: 'Madurai' },
    { code: 'CBE', name: 'Gandhipuram Bus Stand', city: 'Coimbatore', district: 'Coimbatore' },
    { code: 'UKDM', name: 'Ukkadam Bus Stand', city: 'Coimbatore', district: 'Coimbatore' },
    { code: 'TPJ', name: 'Central Bus Stand Trichy', city: 'Tiruchirappalli', district: 'Tiruchirappalli' },
    { code: 'CHAT', name: 'Chatram Bus Stand', city: 'Tiruchirappalli', district: 'Tiruchirappalli' },
    { code: 'SAL', name: 'New Bus Stand Salem', city: 'Salem', district: 'Salem' },
    { code: 'THJ', name: 'Thanjavur New Bus Stand', city: 'Thanjavur', district: 'Thanjavur' },
    { code: 'TVM', name: 'Tirunelveli Bus Stand', city: 'Tirunelveli', district: 'Tirunelveli' },
    { code: 'TUT', name: 'Thoothukudi Bus Stand', city: 'Thoothukudi', district: 'Thoothukudi' },
    { code: 'VLR', name: 'Vellore New Bus Stand', city: 'Vellore', district: 'Vellore' },
    { code: 'ERD', name: 'Erode Bus Stand', city: 'Erode', district: 'Erode' },
    { code: 'TRP', name: 'Tiruppur Bus Stand', city: 'Tiruppur', district: 'Tiruppur' },
    { code: 'KRS', name: 'Karur Bus Stand', city: 'Karur', district: 'Karur' },
    { code: 'DGL', name: 'Dindigul Bus Stand', city: 'Dindigul', district: 'Dindigul' },
    { code: 'NLG', name: 'Nagercoil Bus Stand', city: 'Nagercoil', district: 'Kanniyakumari' },
    { code: 'KNK', name: 'Kanniyakumari Bus Stand', city: 'Kanniyakumari', district: 'Kanniyakumari' },
    { code: 'PDY', name: 'Pondicherry Bus Stand', city: 'Puducherry', district: 'Puducherry' },
    { code: 'CTR', name: 'Cuddalore Bus Stand', city: 'Cuddalore', district: 'Cuddalore' },
    { code: 'VPM', name: 'Villupuram Bus Stand', city: 'Villupuram', district: 'Villupuram' },
    { code: 'KPM', name: 'Kumbakonam Bus Stand', city: 'Kumbakonam', district: 'Thanjavur' },
    { code: 'TVK', name: 'Thiruvannamalai Bus Stand', city: 'Thiruvannamalai', district: 'Thiruvannamalai' },
    { code: 'HOS', name: 'Hosur Bus Stand', city: 'Hosur', district: 'Krishnagiri' },
    { code: 'OOT', name: 'Ooty Bus Stand', city: 'Udhagamandalam', district: 'Nilgiris' },
    { code: 'KDK', name: 'Kodaikanal Bus Stand', city: 'Kodaikanal', district: 'Dindigul' },
    { code: 'RAM', name: 'Rameswaram Bus Stand', city: 'Rameswaram', district: 'Ramanathapuram' },
    // Interstate
    { code: 'BLR', name: 'Majestic Bus Stand', city: 'Bangalore', district: 'Karnataka' },
    { code: 'TVC', name: 'Thampanoor Bus Stand', city: 'Thiruvananthapuram', district: 'Kerala' },
    { code: 'EKM', name: 'Ernakulam Bus Stand', city: 'Kochi', district: 'Kerala' },
    { code: 'HYD', name: 'MGBS Hyderabad', city: 'Hyderabad', district: 'Telangana' }
];

// TNSTC and SETC Buses
var governmentBuses = [
    // SETC (State Express Transport Corporation)
    { operator: 'SETC', type: 'Ultra Deluxe', busNo: 'TN01AN1234', ac: true, seater: false, fare: 850 },
    { operator: 'SETC', type: 'A/C Sleeper', busNo: 'TN01AN2345', ac: true, seater: false, fare: 1200 },
    { operator: 'SETC', type: 'Semi Sleeper', busNo: 'TN01AN3456', ac: false, seater: false, fare: 650 },
    { operator: 'SETC', type: 'Super Deluxe', busNo: 'TN01AN4567', ac: false, seater: true, fare: 550 },
    // TNSTC (Tamil Nadu State Transport Corporation)
    { operator: 'TNSTC', type: 'Ultra Deluxe', busNo: 'TN38A1234', ac: false, seater: true, fare: 450 },
    { operator: 'TNSTC', type: 'Deluxe', busNo: 'TN38A2345', ac: false, seater: true, fare: 350 },
    { operator: 'TNSTC', type: 'Express', busNo: 'TN38A3456', ac: false, seater: true, fare: 280 },
    { operator: 'TNSTC', type: 'Ordinary', busNo: 'TN38A4567', ac: false, seater: true, fare: 180 },
    // KSRTC Karnataka
    { operator: 'KSRTC', type: 'Airavat Club Class', busNo: 'KA01F1234', ac: true, seater: false, fare: 1500 },
    { operator: 'KSRTC', type: 'Airavat Sleeper', busNo: 'KA01F2345', ac: true, seater: false, fare: 1100 },
    { operator: 'KSRTC', type: 'Rajahamsa', busNo: 'KA01F3456', ac: true, seater: true, fare: 800 },
    // APSRTC
    { operator: 'APSRTC', type: 'Garuda Plus', busNo: 'AP09TA1234', ac: true, seater: true, fare: 900 },
    { operator: 'APSRTC', type: 'Super Luxury', busNo: 'AP09TA2345', ac: true, seater: true, fare: 700 },
    // KSRTC Kerala
    { operator: 'KSRTC Kerala', type: 'Scania Multi-Axle', busNo: 'KL15A1234', ac: true, seater: true, fare: 950 },
    { operator: 'KSRTC Kerala', type: 'Super Deluxe', busNo: 'KL15A2345', ac: false, seater: true, fare: 550 }
];

// Popular Bus Routes
var popularBusRoutes = [
    // SETC Routes
    { from: 'Chennai', to: 'Madurai', distance: '460 km', duration: '8h', operator: 'SETC', frequency: '50+ daily' },
    { from: 'Chennai', to: 'Coimbatore', distance: '510 km', duration: '9h', operator: 'SETC', frequency: '40+ daily' },
    { from: 'Chennai', to: 'Trichy', distance: '340 km', duration: '6h', operator: 'SETC', frequency: '35+ daily' },
    { from: 'Chennai', to: 'Salem', distance: '340 km', duration: '5h 30m', operator: 'SETC', frequency: '30+ daily' },
    { from: 'Chennai', to: 'Tirunelveli', distance: '620 km', duration: '11h', operator: 'SETC', frequency: '20+ daily' },
    { from: 'Chennai', to: 'Nagercoil', distance: '700 km', duration: '12h', operator: 'SETC', frequency: '15+ daily' },
    { from: 'Chennai', to: 'Bangalore', distance: '350 km', duration: '6h', operator: 'SETC', frequency: '60+ daily' },
    { from: 'Chennai', to: 'Pondicherry', distance: '150 km', duration: '3h', operator: 'SETC', frequency: '25+ daily' },
    // TNSTC Routes
    { from: 'Madurai', to: 'Chennai', distance: '460 km', duration: '8h', operator: 'TNSTC', frequency: '40+ daily' },
    { from: 'Coimbatore', to: 'Chennai', distance: '510 km', duration: '9h', operator: 'TNSTC', frequency: '35+ daily' },
    { from: 'Salem', to: 'Chennai', distance: '340 km', duration: '5h 30m', operator: 'TNSTC', frequency: '30+ daily' },
    { from: 'Trichy', to: 'Madurai', distance: '130 km', duration: '2h 30m', operator: 'TNSTC', frequency: '50+ daily' },
    { from: 'Coimbatore', to: 'Ooty', distance: '85 km', duration: '3h', operator: 'TNSTC', frequency: '25+ daily' },
    { from: 'Madurai', to: 'Kodaikanal', distance: '120 km', duration: '3h', operator: 'TNSTC', frequency: '15+ daily' },
    { from: 'Chennai', to: 'Tirupati', distance: '140 km', duration: '3h', operator: 'SETC', frequency: '20+ daily' },
    { from: 'Coimbatore', to: 'Bangalore', distance: '360 km', duration: '7h', operator: 'TNSTC', frequency: '20+ daily' }
];

// Sample flight results
var sampleFlights = [
    { airline: 'Air India', logo: '🇮🇳', flightNo: 'AI-302', departure: '06:00', arrival: '08:15', duration: '2h 15m', stops: 'Non-stop', price: 4299, class: 'Economy' },
    { airline: 'IndiGo', logo: '💙', flightNo: '6E-2154', departure: '08:30', arrival: '10:45', duration: '2h 15m', stops: 'Non-stop', price: 3499, class: 'Economy' },
    { airline: 'Vistara', logo: '⭐', flightNo: 'UK-945', departure: '10:00', arrival: '12:10', duration: '2h 10m', stops: 'Non-stop', price: 5199, class: 'Economy' },
    { airline: 'SpiceJet', logo: '🔴', flightNo: 'SG-8169', departure: '14:00', arrival: '16:20', duration: '2h 20m', stops: 'Non-stop', price: 3299, class: 'Economy' },
    { airline: 'Akasa Air', logo: '🌟', flightNo: 'QP-1234', departure: '18:00', arrival: '20:15', duration: '2h 15m', stops: 'Non-stop', price: 3599, class: 'Economy' },
    { airline: 'Emirates', logo: '🇦🇪', flightNo: 'EK-501', departure: '22:00', arrival: '01:30', duration: '3h 30m', stops: 'Non-stop', price: 12999, class: 'Economy' }
];

function initFlightBooking() {
    // Flight type tabs
    var typeTabs = document.querySelectorAll('.type-tab');
    typeTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            typeTabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');
            var type = this.getAttribute('data-type');
            var returnField = document.getElementById('returnDateField');
            if (returnField) {
                returnField.style.display = (type === 'roundtrip' || type === 'multicity') ? 'block' : 'none';
            }
        });
    });

    // Swap button
    var swapBtn = document.getElementById('swapFlights');
    if (swapBtn) {
        swapBtn.addEventListener('click', function () {
            var fromInput = document.getElementById('flightFrom');
            var toInput = document.getElementById('flightTo');
            if (fromInput && toInput) {
                var temp = fromInput.value;
                fromInput.value = toInput.value;
                toInput.value = temp;
            }
        });
    }

    // Airport autocomplete
    setupAirportAutocomplete('flightFrom');
    setupAirportAutocomplete('flightTo');

    // Search flights button
    var searchBtn = document.getElementById('searchFlights');
    if (searchBtn) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var from = document.getElementById('flightFrom').value;
            var to = document.getElementById('flightTo').value;
            var date = document.getElementById('flightDeparture').value;

            if (!from || !to) {
                showToast('Please enter departure and arrival cities');
                return;
            }

            showFlightResults(from, to, date);
        });
    }

    // Route book buttons
    document.querySelectorAll('.route-book').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var from = this.getAttribute('data-from');
            var to = this.getAttribute('data-to');
            var price = this.getAttribute('data-price');

            currentBooking = {
                type: 'flight',
                name: 'IndiGo 6E-2154',
                from: from,
                to: to,
                date: new Date().toLocaleDateString(),
                departure: '08:30',
                arrival: '10:45',
                duration: '2h 15m',
                passengers: 1,
                class: 'Economy',
                price: '₹' + price
            };
            showBookingModal('flight');
        });
    });
}

function setupAirportAutocomplete(inputId) {
    var input = document.getElementById(inputId);
    if (!input) return;

    var wrapper = input.closest('.autocomplete-wrapper') || input.parentNode;
    var dropdown = wrapper.querySelector('.autocomplete-dropdown');

    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'autocomplete-dropdown';
        wrapper.appendChild(dropdown);
    }

    input.addEventListener('input', function () {
        var value = this.value.toLowerCase();
        dropdown.innerHTML = '';

        if (value.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        var matches = airports.filter(function (a) {
            return a.city.toLowerCase().includes(value) ||
                a.code.toLowerCase().includes(value) ||
                a.name.toLowerCase().includes(value) ||
                a.country.toLowerCase().includes(value);
        }).slice(0, 8);

        if (matches.length > 0) {
            dropdown.style.display = 'block';
            matches.forEach(function (airport) {
                var item = document.createElement('div');
                item.className = 'autocomplete-item';
                var typeIcon = airport.type === 'domestic' ? '🇮🇳' : '🌍';
                item.innerHTML = '<div class="airport-result">' +
                    '<span class="airport-code">' + airport.code + '</span>' +
                    '<div class="airport-details">' +
                    '<span class="airport-city">' + airport.city + ' ' + typeIcon + '</span>' +
                    '<span class="airport-name">' + airport.name + '</span>' +
                    '</div></div>';
                item.addEventListener('click', function () {
                    input.value = airport.city + ' (' + airport.code + ')';
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(item);
            });
        } else {
            dropdown.style.display = 'none';
        }
    });

    input.addEventListener('blur', function () {
        setTimeout(function () { dropdown.style.display = 'none'; }, 200);
    });
}

function showFlightResults(from, to, date) {
    var resultsBody = document.getElementById('searchResultsBody');
    var resultsTitle = document.getElementById('searchResultsTitle');

    if (resultsTitle) {
        resultsTitle.textContent = '✈️ Flights: ' + from + ' → ' + to;
    }

    var content = '<div class="flight-results">';
    sampleFlights.forEach(function (flight) {
        content += '<div class="flight-result-card">' +
            '<div class="flight-airline">' +
            '<span class="airline-logo-sm">' + flight.logo + '</span>' +
            '<div class="airline-info">' +
            '<span class="airline-name">' + flight.airline + '</span>' +
            '<span class="flight-number">' + flight.flightNo + '</span>' +
            '</div></div>' +
            '<div class="flight-times">' +
            '<div class="time-block"><span class="time">' + flight.departure + '</span><span class="city">' + from.split(' ')[0] + '</span></div>' +
            '<div class="flight-duration"><span class="duration">' + flight.duration + '</span><div class="flight-line">✈️</div><span class="stops">' + flight.stops + '</span></div>' +
            '<div class="time-block"><span class="time">' + flight.arrival + '</span><span class="city">' + to.split(' ')[0] + '</span></div>' +
            '</div>' +
            '<div class="flight-price-section">' +
            '<span class="flight-price">₹' + flight.price.toLocaleString() + '</span>' +
            '<span class="price-class">' + flight.class + '</span>' +
            '<button class="book-btn" onclick="bookFlight(\'' + flight.airline + '\', \'' + flight.flightNo + '\', ' + flight.price + ', \'' + from + '\', \'' + to + '\', \'' + flight.departure + '\', \'' + flight.arrival + '\', \'' + flight.duration + '\')">Book Now</button>' +
            '</div></div>';
    });
    content += '</div>';

    resultsBody.innerHTML = content;
    openModal('searchResultsModal');
}

function bookFlight(airline, flightNo, price, from, to, departure, arrival, duration) {
    currentBooking = {
        type: 'flight',
        name: airline + ' ' + flightNo,
        from: from,
        to: to,
        date: new Date().toLocaleDateString(),
        departure: departure,
        arrival: arrival,
        duration: duration,
        passengers: 1,
        class: 'Economy',
        price: '₹' + price.toLocaleString()
    };
    closeModal('searchResultsModal');
    showBookingModal('flight');
}

// Export functions to window
// ===================================
// Train Booking System with Indian Stations
// ===================================
function initTrainBooking() {
    // Setup station autocomplete for train search inputs
    var trainFromInput = document.getElementById('trainFrom');
    var trainToInput = document.getElementById('trainTo');

    if (trainFromInput) {
        setupStationAutocomplete(trainFromInput);
    }
    if (trainToInput) {
        setupStationAutocomplete(trainToInput);
    }

    // Train search button handler
    var searchTrainBtn = document.getElementById('searchTrains');
    if (searchTrainBtn) {
        searchTrainBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var from = trainFromInput ? trainFromInput.value : '';
            var to = trainToInput ? trainToInput.value : '';
            var date = document.getElementById('trainDate') ? document.getElementById('trainDate').value : '';

            if (!from || !to) {
                showToast('Please enter source and destination stations');
                return;
            }

            showTrainResults(from, to, date);
        });
    }
}

function setupStationAutocomplete(input) {
    if (!input) return;

    var wrapper = input.closest('.autocomplete-wrapper') || input.parentNode;
    var dropdown = wrapper.querySelector('.autocomplete-dropdown');

    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'autocomplete-dropdown';
        wrapper.appendChild(dropdown);
    }

    input.addEventListener('input', function () {
        var value = this.value.toLowerCase();
        dropdown.innerHTML = '';

        if (value.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        var matches = indianRailwayStations.filter(function (s) {
            return s.city.toLowerCase().includes(value) ||
                s.code.toLowerCase().includes(value) ||
                s.name.toLowerCase().includes(value);
        }).slice(0, 10);

        if (matches.length > 0) {
            dropdown.style.display = 'block';
            matches.forEach(function (station) {
                var item = document.createElement('div');
                item.className = 'autocomplete-item';
                var typeIcon = station.type === 'junction' ? '🔀' : (station.type === 'terminal' ? '🚉' : '🛤️');
                item.innerHTML = '<div class="station-result">' +
                    '<span class="station-code">' + station.code + '</span>' +
                    '<div class="station-details">' +
                    '<span class="station-name">' + station.name + ' ' + typeIcon + '</span>' +
                    '<span class="station-zone">' + station.city + ' • ' + station.zone + ' Zone</span>' +
                    '</div></div>';
                item.addEventListener('click', function () {
                    input.value = station.name + ' (' + station.code + ')';
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(item);
            });
        } else {
            dropdown.style.display = 'none';
        }
    });

    input.addEventListener('blur', function () {
        setTimeout(function () { dropdown.style.display = 'none'; }, 200);
    });
}

function showTrainResults(from, to, date) {
    var resultsBody = document.getElementById('searchResultsBody');
    var resultsTitle = document.getElementById('searchResultsTitle');

    if (resultsTitle) {
        resultsTitle.textContent = '🚂 Trains: ' + from.split(' (')[0] + ' → ' + to.split(' (')[0];
    }

    var content = '<div class="train-results">';
    sampleTrains.forEach(function (train) {
        var typeColor = train.type === 'Rajdhani' ? '#ef4444' :
            (train.type === 'Shatabdi' ? '#3b82f6' :
                (train.type === 'Duronto' ? '#8b5cf6' : '#22c55e'));
        content += '<div class="train-result-card">' +
            '<div class="train-info">' +
            '<div class="train-name-row">' +
            '<span class="train-number">' + train.trainNo + '</span>' +
            '<span class="train-name">' + train.name + '</span>' +
            '<span class="train-type" style="background:' + typeColor + '">' + train.type + '</span>' +
            '</div>' +
            '<div class="train-route">' + from.split(' (')[0] + ' → ' + to.split(' (')[0] + '</div>' +
            '</div>' +
            '<div class="train-schedule">' +
            '<div class="time-block"><span class="label">Departs</span><span class="time">' + train.departure + '</span></div>' +
            '<div class="duration-block"><span class="duration">' + train.duration + '</span><div class="line">───────</div></div>' +
            '<div class="time-block"><span class="label">Arrives</span><span class="time">' + train.arrival + '</span></div>' +
            '</div>' +
            '<div class="train-classes">' +
            '<span class="class-badge sl">SL: ₹' + Math.round(train.price * 0.4) + '</span>' +
            '<span class="class-badge ac3">3A: ₹' + Math.round(train.price * 0.7) + '</span>' +
            '<span class="class-badge ac2">2A: ₹' + train.price + '</span>' +
            '<span class="class-badge ac1">1A: ₹' + Math.round(train.price * 1.5) + '</span>' +
            '</div>' +
            '<div class="train-book">' +
            '<button class="book-btn" onclick="bookTrain(\'' + train.trainNo + '\', \'' + train.name + '\', ' + train.price + ', \'' + from + '\', \'' + to + '\', \'' + train.departure + '\', \'' + train.arrival + '\', \'' + train.duration + '\')">Book Now</button>' +
            '</div></div>';
    });
    content += '</div>';

    resultsBody.innerHTML = content;
    openModal('searchResultsModal');
}

function bookTrain(trainNo, trainName, price, from, to, departure, arrival, duration) {
    currentBooking = {
        type: 'train',
        name: trainNo + ' - ' + trainName,
        from: from.split(' (')[0],
        to: to.split(' (')[0],
        date: new Date().toLocaleDateString(),
        departure: departure,
        arrival: arrival,
        duration: duration,
        passengers: 1,
        class: '3A',
        price: '₹' + Math.round(price * 0.7)
    };
    closeModal('searchResultsModal');
    showBookingModal('train');
}

// Export functions to window
window.openModal = openModal;
window.closeModal = closeModal;
window.initiatePayment = initiatePayment;
window.selectSeat = selectSeat;
window.quickBook = quickBook;
window.showToast = showToast;
window.showMetroTicket = showMetroTicket;
window.bookFlight = bookFlight;
window.bookTrain = bookTrain;

// ===================================
// Bus Booking System (TNSTC, SETC)
// ===================================
function initBusBooking() {
    // Setup bus stand autocomplete
    var busFromInput = document.getElementById('busFrom');
    var busToInput = document.getElementById('busTo');

    if (busFromInput) {
        setupBusStandAutocomplete(busFromInput);
    }
    if (busToInput) {
        setupBusStandAutocomplete(busToInput);
    }

    // Bus search button handler
    var searchBusBtn = document.getElementById('searchBuses');
    if (searchBusBtn) {
        searchBusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var from = busFromInput ? busFromInput.value : '';
            var to = busToInput ? busToInput.value : '';
            var date = document.getElementById('busDate') ? document.getElementById('busDate').value : '';

            if (!from || !to) {
                showToast('Please enter source and destination');
                return;
            }

            showBusResults(from, to, date);
        });
    }
}

function setupBusStandAutocomplete(input) {
    if (!input) return;

    var wrapper = input.closest('.autocomplete-wrapper') || input.parentNode;
    var dropdown = wrapper.querySelector('.autocomplete-dropdown');

    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'autocomplete-dropdown';
        wrapper.appendChild(dropdown);
    }

    input.addEventListener('input', function () {
        var value = this.value.toLowerCase();
        dropdown.innerHTML = '';

        if (value.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        var matches = tamilNaduBusStands.filter(function (s) {
            return s.city.toLowerCase().includes(value) ||
                s.code.toLowerCase().includes(value) ||
                s.name.toLowerCase().includes(value) ||
                s.district.toLowerCase().includes(value);
        }).slice(0, 10);

        if (matches.length > 0) {
            dropdown.style.display = 'block';
            matches.forEach(function (stand) {
                var item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = '<div class="busstand-result">' +
                    '<span class="busstand-icon">🚌</span>' +
                    '<div class="busstand-details">' +
                    '<span class="busstand-name">' + stand.name + '</span>' +
                    '<span class="busstand-district">' + stand.city + ', ' + stand.district + '</span>' +
                    '</div></div>';
                item.addEventListener('click', function () {
                    input.value = stand.city;
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(item);
            });
        } else {
            dropdown.style.display = 'none';
        }
    });

    input.addEventListener('blur', function () {
        setTimeout(function () { dropdown.style.display = 'none'; }, 200);
    });
}

function showBusResults(from, to, date) {
    var resultsBody = document.getElementById('searchResultsBody');
    var resultsTitle = document.getElementById('searchResultsTitle');

    if (resultsTitle) {
        resultsTitle.textContent = '🚌 Buses: ' + from + ' → ' + to;
    }

    var content = '<div class="bus-results">';

    // Add TNSTC/SETC operator badges
    content += '<div class="bus-operators">' +
        '<span class="operator-badge setc">SETC</span>' +
        '<span class="operator-badge tnstc">TNSTC</span>' +
        '<span class="operator-badge ksrtc">KSRTC</span>' +
        '</div>';

    governmentBuses.forEach(function (bus, index) {
        var departureTime = ['05:00', '06:30', '08:00', '10:30', '14:00', '16:30', '18:00', '20:30', '21:30', '22:00', '22:30', '23:00', '23:30', '00:30', '01:00', '02:00'][index % 16];
        var operatorClass = bus.operator.toLowerCase().replace(' ', '');
        var typeIcon = bus.ac ? '❄️' : '🌀';
        var seatType = bus.seater ? 'Seater' : 'Sleeper';

        content += '<div class="bus-result-card">' +
            '<div class="bus-operator-info">' +
            '<span class="operator-name ' + operatorClass + '">' + bus.operator + '</span>' +
            '<span class="bus-type">' + bus.type + '</span>' +
            '<span class="bus-number">' + bus.busNo + '</span>' +
            '</div>' +
            '<div class="bus-timing">' +
            '<div class="time-col"><span class="time">' + departureTime + '</span><span class="city">' + from + '</span></div>' +
            '<div class="duration-col"><span class="dur">~8h</span><div class="bus-route-line">🚌</div></div>' +
            '<div class="time-col"><span class="time">' + getArrivalTime(departureTime) + '</span><span class="city">' + to + '</span></div>' +
            '</div>' +
            '<div class="bus-features">' +
            '<span class="feature">' + typeIcon + ' ' + (bus.ac ? 'A/C' : 'Non-A/C') + '</span>' +
            '<span class="feature">💺 ' + seatType + '</span>' +
            '<span class="feature">🎫 40 Seats</span>' +
            '</div>' +
            '<div class="bus-price-section">' +
            '<span class="bus-price">₹' + bus.fare + '</span>' +
            '<button class="book-btn" onclick="bookBus(\'' + bus.operator + '\', \'' + bus.type + '\', \'' + bus.busNo + '\', ' + bus.fare + ', \'' + from + '\', \'' + to + '\', \'' + departureTime + '\')">Book Now</button>' +
            '</div></div>';
    });
    content += '</div>';

    resultsBody.innerHTML = content;
    openModal('searchResultsModal');
}

function getArrivalTime(departure) {
    var parts = departure.split(':');
    var hours = parseInt(parts[0]) + 8;
    if (hours >= 24) hours -= 24;
    return (hours < 10 ? '0' : '') + hours + ':' + parts[1];
}

function bookBus(operator, type, busNo, fare, from, to, departure) {
    currentBooking = {
        type: 'bus',
        name: operator + ' - ' + type,
        busNo: busNo,
        from: from,
        to: to,
        date: new Date().toLocaleDateString(),
        departure: departure,
        passengers: 1,
        price: '₹' + fare
    };
    closeModal('searchResultsModal');
    showBookingModal('bus');
}

// Export functions to window
window.openModal = openModal;
window.closeModal = closeModal;
window.initiatePayment = initiatePayment;
window.selectSeat = selectSeat;
window.quickBook = quickBook;
window.showToast = showToast;
window.showMetroTicket = showMetroTicket;
window.bookFlight = bookFlight;
window.bookTrain = bookTrain;
window.bookBus = bookBus;

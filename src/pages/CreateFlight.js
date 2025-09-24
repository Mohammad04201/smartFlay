import React, { useState } from 'react';
import { addFlight } from '../services/firebaseService';

const CreateFlight = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: '',
    airline: '',
    departure: '',
    arrival: '',
    date: '',
    time: '',
    price: '',
    capacity: '',
    aircraft: '',
    status: 'Available'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const airlines = [
    { id: 1, name: 'Royal Jordanian', code: 'RJ' },
    { id: 2, name: 'Jazeera Airways Jordan', code: 'JY' },
    { id: 3, name: 'Jordan Aviation', code: 'R5' },
    { id: 4, name: 'Arab Wings', code: 'AW' },
    { id: 5, name: 'Al-Ayam Aviation', code: 'AA' }
  ];

  const cities = [
    // المدن الأردنية
    'Amman', 'Aqaba', 'Irbid', 'Zarqa', 'Salt',
    // وجهات إقليمية رئيسية
    'Dubai', 'Doha', 'Kuwait', 'Riyadh', 'Cairo',
    'Beirut', 'Damascus', 'Baghdad', 'Istanbul', 'Tehran',
    // وجهات أوروبية
    'London', 'Paris', 'Frankfurt', 'Rome', 'Vienna',
    'Amsterdam', 'Brussels', 'Madrid', 'Athens', 'Zurich'
  ];

  const aircraftTypes = [
    'Boeing 787', 'Airbus A330', 'Airbus A321', 'Airbus A320', 
    'Airbus A319', 'Boeing 737', 'Embraer E190'
  ];

  const handleInputChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await addFlight(flightData);
      setMessage('Flight added successfully!');
      setFlightData({
        flightNumber: '',
        airline: '',
        departure: '',
        arrival: '',
        date: '',
        time: '',
        price: '',
        capacity: '',
        aircraft: '',
        status: 'Available'
      });
    } catch (error) {
      setMessage('Error adding flight. Please try again.');
      console.error('Error adding flight:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDummyFlights = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const dummyFlights = [];
      const today = new Date();
      
      // شركات الطيران الأردنية
      const airlines = [
        'Royal Jordanian',
        'Jordan Aviation', 
        'Arab Wings',
        'Jazeera Airways Jordan'
      ];
      
      // مسارات شائعة
      const routes = [
        { departure: 'Amman', arrival: 'Dubai' },
        { departure: 'Amman', arrival: 'Doha' },
        { departure: 'Amman', arrival: 'Kuwait' },
        { departure: 'Amman', arrival: 'Cairo' },
        { departure: 'Amman', arrival: 'London' },
        { departure: 'Amman', arrival: 'Istanbul' },
        { departure: 'Amman', arrival: 'Paris' },
        { departure: 'Amman', arrival: 'Frankfurt' },
        { departure: 'Aqaba', arrival: 'Dubai' },
        { departure: 'Aqaba', arrival: 'Cairo' },
        { departure: 'Dubai', arrival: 'Amman' },
        { departure: 'London', arrival: 'Amman' },
        { departure: 'Istanbul', arrival: 'Amman' },
        { departure: 'Cairo', arrival: 'Amman' },
        { departure: 'Doha', arrival: 'Amman' },
        { departure: 'Kuwait', arrival: 'Amman' }
      ];

      const airlineCodes = {
        'Royal Jordanian': 'RJ',
        'Jordan Aviation': 'R5',
        'Arab Wings': 'AW',
        'Jazeera Airways Jordan': 'JY'
      };

      // إنشاء 60 رحلة وهمية (15 لكل شركة)
      const totalFlights = 60;
      const flightsPerAirline = totalFlights / airlines.length; // 15 رحلة لكل شركة
      
      let flightCounter = 0;
      
      // توزيع متساوي: 15 رحلة لكل شركة
      for (let airlineIndex = 0; airlineIndex < airlines.length; airlineIndex++) {
        const airline = airlines[airlineIndex];
        
        for (let flightIndex = 0; flightIndex < flightsPerAirline; flightIndex++) {
          const route = routes[flightCounter % routes.length];
          const flightDate = new Date(today);
          flightDate.setDate(today.getDate() + Math.floor(flightCounter / 8)); // توزيع على عدة أيام
          
          const flightNumber = `${airlineCodes[airline]}${(100 + flightCounter).toString()}`;
          const basePrice = Math.floor(Math.random() * 400) + 200; // 200-600 USD
          const hour = 6 + (flightCounter % 16); // من 6 صباحاً إلى 10 مساءً
          const minute = flightIndex % 2 === 0 ? '00' : '30';
          const time = `${String(hour).padStart(2, '0')}:${minute}`;
          
          const flight = {
            flightNumber,
            airline,
            departure: route.departure,
            arrival: route.arrival,
            date: flightDate.toISOString().split('T')[0],
            time,
            price: basePrice.toString(),
            capacity: (150 + Math.floor(Math.random() * 100)).toString(), // 150-250
            aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
            status: 'Available'
          };
          
          dummyFlights.push(flight);
          flightCounter++;
        }
      }
      
      // إضافة جميع الرحلات
      let successCount = 0;
      const airlineCount = { 'Royal Jordanian': 0, 'Jordan Aviation': 0, 'Arab Wings': 0, 'Jazeera Airways Jordan': 0 };
      
      for (const flight of dummyFlights) {
        try {
          await addFlight(flight);
          successCount++;
          airlineCount[flight.airline]++;
        } catch (error) {
          console.error('Error adding dummy flight:', error);
        }
      }
      
      setMessage(`تم إنشاء ${successCount} رحلة وهمية بنجاح!
      التوزيع:
      • Royal Jordanian: ${airlineCount['Royal Jordanian']} رحلة
      • Jordan Aviation: ${airlineCount['Jordan Aviation']} رحلة  
      • Arab Wings: ${airlineCount['Arab Wings']} رحلة
      • Jazeera Airways Jordan: ${airlineCount['Jazeera Airways Jordan']} رحلة`);
      
    } catch (error) {
      setMessage('خطأ في إنشاء الرحلات الوهمية');
      console.error('Error generating dummy flights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fas fa-plus me-2"></i>
                إضافة رحلة جديدة
              </h3>
            </div>
            
            <div className="card-body p-4">
              {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
                  <i className={`fas ${message.includes('Error') ? 'fa-exclamation-triangle' : 'fa-check-circle'} me-2`}></i>
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Basic Information */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Flight Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="flightNumber"
                      value={flightData.flightNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., SV-123"
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Airline *</label>
                    <select
                      className="form-select"
                      name="airline"
                      value={flightData.airline}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Airline</option>
                      {airlines.map(airline => (
                        <option key={airline.id} value={airline.name}>
                          {airline.name} ({airline.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Departure City *</label>
                    <select
                      className="form-select"
                      name="departure"
                      value={flightData.departure}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Departure City</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Arrival City *</label>
                    <select
                      className="form-select"
                      name="arrival"
                      value={flightData.arrival}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Arrival City</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Flight Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={flightData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Flight Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={flightData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Price (USD) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={flightData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                      required
                    />
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Aircraft Capacity *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="capacity"
                      value={flightData.capacity}
                      onChange={handleInputChange}
                      placeholder="e.g., 180"
                      required
                    />
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Aircraft Type *</label>
                    <select
                      className="form-select"
                      name="aircraft"
                      value={flightData.aircraft}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Aircraft Type</option>
                      {aircraftTypes.map(aircraft => (
                        <option key={aircraft} value={aircraft}>{aircraft}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Flight Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={flightData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Fully Booked">Fully Booked</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Delayed">Delayed</option>
                    </select>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary">
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-info me-2"
                      onClick={generateDummyFlights}
                      disabled={loading}
                    >
                      <i className="fas fa-magic me-2"></i>
                      إنشاء رحلات وهمية
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Flight
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="card mt-4 border-0 bg-light">
            <div className="card-body">
              <h5 className="text-primary mb-3">
                <i className="fas fa-info-circle me-2"></i>
                Tips for Adding a Successful Flight
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Ensure the flight number is correct and not duplicated
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Choose a departure city different from the arrival city
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Set an appropriate price that matches the distance and service
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Ensure aircraft availability on the specified date
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlight; 
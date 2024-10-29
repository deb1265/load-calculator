# Electricity Load Calculator

A web-based application for calculating residential electrical loads and generating detailed reports. Built with React, Material-UI, and Vite.

## Features

- **Interactive Load Calculation**: Calculate electrical loads for various household appliances and systems
- **Categorized Interface**: Organized by kitchen, entertainment, lighting, laundry, outdoor equipment, and comfort controls
- **Dynamic Updates**: Real-time calculations of monthly and annual kWh consumption
- **Solar Integration**: Compare loads against solar production with offset calculations
- **Shareable Sessions**: Generate unique URLs to save and share calculations
- **Printable Reports**: Generate professional PDF reports with digital signatures
- **Responsive Design**: Fully functional on both desktop and mobile devices

## Installation

1. Clone the repository
2. 2. Navigate to the project directory
3. Install dependencies
4. Start the development server


## Usage

1. Create a new session from the home page
2. Fill in customer and installer information
3. Add quantities for applicable electrical loads
4. Adjust months of usage per year as needed
5. Review the summary and solar offset calculations
6. Add digital signatures
7. Generate and print the final report

## Project Structure
load-calculator/
├── src/
│ ├── components/ # React components
│ ├── data/ # Load data and constants
│ ├── utils/ # Utility functions
│ ├── App.jsx # Main application component
│ └── main.jsx # Application entry point
├── public/ # Static assets
└── index.html # HTML entry point


## Technologies Used

- React 18
- Material-UI v5
- Vite
- UUID
- Date-fns
- Local Storage for session management

## Load Categories

- Kitchen Appliances
- Entertainment Systems
- Lighting
- Laundry Equipment
- Outdoor Equipment
- Comfort Controls (HVAC, Fans, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Patriot Energy Solutions Corp. for load data specifications
- Material-UI team for the component library
- React community for inspiration and support

## Contact

debashish@patriotenergysolution.com

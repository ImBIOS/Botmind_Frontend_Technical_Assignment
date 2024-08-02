# BotMind Frontend Developer Technical Challenge

## Overview

This project is a web application that displays a map view of a school campus with a fleet of robots. The map view includes both a local coordinate system for the robot positions and a global coordinate system.

## Features

### Mandatory Features

- Track and monitor the positions (including headings) of all robots within the map view.
- Display the robot's map (local coordinate) on the map view (global coordinate).

### Optional Features

- Display area size for the robot map.
- Display perimeter for the robot map.
- Additional user experience enhancements (e.g., real-time tracking, interactive robot details).

## Technologies Used

- React
- Next.js
- react-map-gl
- TailwindCSS
- Leaflet (for optional global map integration)

## Installation and Running the Application

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn or bun or pnpm

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ImBIOS/Botmind_Frontend_Technical_Assignment.git
    cd Botmind_Frontend_Technical_Assignment
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open the application:**
    Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `pages/`: Contains the main page for the application.
- `components/`: Contains the `MapView` component and other reusable components.
- `public/`: Contains static assets such as the campus map image.
- `styles/`: Contains global styles.

## Implementation Details

### Local Map

The local map is displayed using an image (`campus_sim.png`) where the top left is (0, 0) and the bottom right is (image width, image height).

### Robots

Robots are displayed on the local map with their respective positions and headings.

### Coordinate Translation

A function translates local coordinates to global coordinates, allowing the overlay of the local map on a global map view.

## Additional Features

- **Area Size Display**: The area size of the robot map can be displayed (implementation required).
- **Perimeter Display**: The perimeter of the robot map can be displayed (implementation required).
- **User Experience Enhancements**: Additional features like real-time tracking or interactive robot details can be proposed and implemented.

## Future Improvements

- Real-time updates for robot positions.
- Enhanced UI for better user experience.
- Additional map functionalities like zoom, pan, and custom markers.

## Contact

For any questions or feedback, please contact [Imamuzzaki Abu Salam](mailto:imamuzzaki@gmail.com).

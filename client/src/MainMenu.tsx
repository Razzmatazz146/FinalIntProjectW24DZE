import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/explore-data');
  };

  return (
    <div className="main-menu">
      <div className="background-image">
        <h1>Exploring Global Energy Trends with Our World in Data</h1>
        <button onClick={handleStartClick}>Start</button>
        <p>Delve into Our World in Data's comprehensive dataset to uncover vital insights into worldwide energy consumption, growth rates, and the evolving energy mix across nations.</p>
      </div>
    </div>
  );
};

export default MainMenu;

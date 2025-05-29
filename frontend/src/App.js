import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:8080/api/weather?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (error) {
      setWeather(null);
      setError('Error fetching weather. Please try a different city.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const getBackgroundStyle = () => {
    if (!weather || !weather.description) return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 8s ease infinite'
    };
    
    const desc = weather.description.toLowerCase();
    
    // Clear/Sunny weather
    if (desc.includes('clear') || desc.includes('sunny') || desc.includes('sun')) {
      return { 
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fecfef 75%, #ff9a9e 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 10s ease infinite'
      };
    } 
    // Cloudy weather
    else if (desc.includes('cloud') || desc.includes('overcast')) {
      return { 
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d1c4e9 75%, #a8edea 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 12s ease infinite'
      };
    } 
    // Rainy weather
    else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      return { 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #89216b 75%, #667eea 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      };
    } 
    // Snowy weather
    else if (desc.includes('snow') || desc.includes('blizzard')) {
      return { 
        background: 'linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 25%, #ffecd2 75%, #e3ffe7 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      };
    } 
    // Thunderstorm/Storm weather
    else if (desc.includes('thunder') || desc.includes('storm')) {
      return { 
        background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 25%, #38ef7d 75%, #2d1b69 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 6s ease infinite'
      };
    }
    // Misty/Foggy weather
    else if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) {
      return { 
        background: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 25%, #95a5a6 75%, #bdc3c7 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 10s ease infinite'
      };
    }
    
    // Default gradient
    return { 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 8s ease infinite'
    };
  };

  const getWeatherIcon = () => {
    if (!weather || !weather.description) return '🌤️';
    
    const desc = weather.description.toLowerCase();
    if (desc.includes('clear') || desc.includes('sunny') || desc.includes('sun')) return '☀️';
    if (desc.includes('cloud') || desc.includes('overcast')) return '☁️';
    if (desc.includes('rain') || desc.includes('shower')) return '🌧️';
    if (desc.includes('drizzle')) return '🌦️';
    if (desc.includes('snow') || desc.includes('blizzard')) return '❄️';
    if (desc.includes('thunder') || desc.includes('storm')) return '⛈️';
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return '🌫️';
    return '🌤️';
  };

  const FloatingElements = () => (
    <>
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'fixed',
        top: '20%',
        right: '15%',
        width: '150px',
        height: '150px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '15%',
        left: '20%',
        width: '80px',
        height: '80px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '25%',
        right: '10%',
        width: '120px',
        height: '120px',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite reverse',
        zIndex: 0
      }}></div>
    </>
  );

  const styles = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(120deg); }
      66% { transform: translateY(10px) rotate(240deg); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    
    input:focus {
      transform: scale(1.02);
      box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);
    }
    
    button:hover {
      transform: scale(1.1);
      background: rgba(255, 255, 255, 0.3);
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 15px !important;
      }
      .weather-card {
        padding: 20px !important;
        margin: 0 10px !important;
      }
      .title {
        font-size: 2rem !important;
      }
      .temperature {
        font-size: 3rem !important;
      }
    }
  `;

  const containerStyle = {
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...getBackgroundStyle()
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '25px',
    color: 'white',
    animation: 'fadeInUp 1s ease-out'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
    letterSpacing: '2px',
    animation: 'pulse 4s ease-in-out infinite'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    opacity: 0.9,
    margin: 0,
    fontWeight: '300'
  };

  const searchContainerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
    marginBottom: '20px',
    animation: 'fadeInUp 1s ease-out 0.2s both'
  };

  const inputStyle = {
    width: '100%',
    padding: '18px 60px 18px 25px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '50px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    outline: 'none',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const loadingStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    backdropFilter: 'blur(20px)',
    textAlign: 'center',
    animation: 'fadeInUp 0.5s ease-out',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const errorStyle = {
    backgroundColor: 'rgba(255, 87, 87, 0.2)',
    color: 'white',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    backdropFilter: 'blur(20px)',
    textAlign: 'center',
    animation: 'fadeInUp 0.5s ease-out',
    border: '1px solid rgba(255, 87, 87, 0.3)',
    boxShadow: '0 8px 32px rgba(255, 87, 87, 0.1)'
  };

  const weatherCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(25px)',
    borderRadius: '25px',
    padding: '25px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease-out',
    position: 'relative',
    overflow: 'hidden'
  };

  const weatherIconStyle = {
    fontSize: '5rem',
    marginBottom: '20px',
    animation: 'pulse 3s ease-in-out infinite',
    display: 'block'
  };

  const cityNameStyle = {
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    letterSpacing: '1px'
  };

  const descriptionStyle = {
    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
    opacity: 0.9,
    textTransform: 'capitalize',
    marginBottom: '25px',
    fontWeight: '300'
  };

  const temperatureStyle = {
    fontSize: 'clamp(3rem, 8vw, 4rem)',
    fontWeight: '200',
    margin: '15px 0 5px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  };

  const unitStyle = {
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    opacity: 0.8,
    marginBottom: '20px',
    fontWeight: '300'
  };

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginTop: '20px'
  };

  const detailItemStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '15px 12px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
  };

  const detailIconStyle = {
    fontSize: '2rem',
    marginBottom: '10px',
    display: 'block'
  };

  const detailLabelStyle = {
    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
    opacity: 0.8,
    marginBottom: '8px',
    fontWeight: '300'
  };

  const detailValueStyle = {
    fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
    fontWeight: '600'
  };

  const footerStyle = {
    marginTop: '25px',
    textAlign: 'center',
    animation: 'fadeInUp 1s ease-out 0.4s both'
  };

  const footerTextStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    fontWeight: '300',
    maxWidth: '300px',
    lineHeight: '1.5'
  };

  return (
    <>
      <style>{styles}</style>
      <div style={containerStyle} className="container">
        <FloatingElements />
        
        <div style={contentWrapperStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <h1 style={titleStyle} className="title">Climate Connect</h1>
            <p style={subtitleStyle}>Your Gateway to Weather Insights</p>
          </div>

          {/* Search Section */}
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
              disabled={loading}
            />
            <button 
              onClick={fetchWeather} 
              style={buttonStyle}
              disabled={loading}
            >
              {loading ? (
                <div style={{ animation: 'spin 1s linear infinite' }}>⏳</div>
              ) : (
                '🔍'
              )}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div style={loadingStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{ animation: 'spin 1s linear infinite', fontSize: '1.5rem' }}>🌀</div>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>Fetching weather data...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={errorStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                <p style={{ margin: 0, fontSize: '1rem' }}>{error}</p>
              </div>
            </div>
          )}

          {/* Weather Display */}
          {weather && !loading && (
            <div style={weatherCardStyle} className="weather-card">
              {/* Weather Icon and City */}
              <div style={weatherIconStyle}>{getWeatherIcon()}</div>
              <h2 style={cityNameStyle}>{weather.city}</h2>
              <p style={descriptionStyle}>{weather.description}</p>

              {/* Temperature */}
              <div style={temperatureStyle} className="temperature">
                {Math.round(weather.temperature)}°
              </div>
              <div style={unitStyle}>Celsius</div>

              {/* Weather Details */}
              <div style={detailsGridStyle}>
                <div style={detailItemStyle}>
                  <div style={detailIconStyle}>💧</div>
                  <div style={detailLabelStyle}>Humidity</div>
                  <div style={detailValueStyle}>{weather.humidity}%</div>
                </div>
                
                <div style={detailItemStyle}>
                  <div style={detailIconStyle}>💨</div>
                  <div style={detailLabelStyle}>Wind Speed</div>
                  <div style={detailValueStyle}>{weather.windSpeed} m/s</div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          {!weather && !loading && (
            <div style={footerStyle}>
              <p style={footerTextStyle}>
                Enter a city name to get started with your weather forecast
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
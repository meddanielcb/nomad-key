import React, { useState, useEffect } from 'react';
import './App.css';

// Dados mockados de imóveis
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Apartamento Moderno no Centro",
    location: "São Paulo, Brasil",
    price: 250,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    type: "Apartamento",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    lat: -23.5505,
    lng: -46.6333,
    amenities: ["WiFi", "Cozinha", "Ar condicionado", "Máquina de lavar"]
  },
  {
    id: 2,
    title: "Casa de Praia com Vista para o Mar",
    location: "Rio de Janeiro, Brasil",
    price: 450,
    rating: 4.8,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    type: "Casa",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    lat: -22.9068,
    lng: -43.1729,
    amenities: ["Piscina", "WiFi", "Vista para o mar", "Churrasqueira"]
  },
  {
    id: 3,
    title: "Loft Aconchegante em Bairro Boêmio",
    location: "Curitiba, Brasil",
    price: 180,
    rating: 4.7,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    type: "Loft",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    lat: -25.4294,
    lng: -49.2719,
    amenities: ["WiFi", "Cozinha", "TV", "Estacionamento"]
  },
  {
    id: 4,
    title: "Mansão Luxuosa com Piscina",
    location: "Florianópolis, Brasil",
    price: 890,
    rating: 5.0,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    type: "Casa",
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    lat: -27.5954,
    lng: -48.5480,
    amenities: ["Piscina", "WiFi", "Cozinha gourmet", "Ar condicionado", "Vista para o mar"]
  },
  {
    id: 5,
    title: "Estúdio Compacto e Elegante",
    location: "Belo Horizonte, Brasil",
    price: 120,
    rating: 4.6,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
    type: "Estúdio",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    lat: -19.9167,
    lng: -43.9345,
    amenities: ["WiFi", "Cozinha", "TV"]
  },
  {
    id: 6,
    title: "Casa de Campo com Jardim",
    location: "Gramado, Brasil",
    price: 320,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    type: "Casa",
    guests: 5,
    bedrooms: 3,
    bathrooms: 2,
    lat: -29.3784,
    lng: -50.8759,
    amenities: ["Lareira", "WiFi", "Cozinha", "Jardim", "Churrasqueira"]
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [view, setView] = useState('home'); // home, login, property
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 1000,
    guests: 1
  });
  const [filteredProperties, setFilteredProperties] = useState(MOCK_PROPERTIES);

  useEffect(() => {
    const savedUser = localStorage.getItem('nomadkey_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    
    const walletAddress = '0x' + Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    const newUser = {
      email,
      walletAddress,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('nomadkey_user', JSON.stringify(newUser));
    setUser(newUser);
    setView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('nomadkey_user');
    setUser(null);
  };

  const applyFilters = () => {
    let filtered = MOCK_PROPERTIES;
    
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    filtered = filtered.filter(p => 
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    
    if (filters.guests > 1) {
      filtered = filtered.filter(p => p.guests >= filters.guests);
    }
    
    setFilteredProperties(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (view === 'login') {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="logo">
            <i className="fas fa-key"></i>
            <h1>Nomad Key</h1>
          </div>
          <p className="tagline">Hospedagem sem fronteiras</p>
          
          <div className="login-box">
            <h2>Bem-vindo</h2>
            <p className="subtitle">Crie sua conta com email</p>
            
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">
                <i className="fas fa-envelope"></i> Continuar com Email
              </button>
            </form>
            
            <div className="divider">
              <span>ou</span>
            </div>
            
            <button className="btn-secondary" onClick={() => setView('home')}>
              <i className="fas fa-arrow-left"></i> Voltar para home
            </button>
          </div>
          
          <div className="powered-by">
            <span>⚡ Powered by Account Abstraction (ERC-4337)</span>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'property' && selectedProperty) {
    return (
      <div className="property-detail">
        <header className="header">
          <div className="logo" onClick={() => setView('home')}>
            <i className="fas fa-key"></i>
            <span>Nomad Key</span>
          </div>
          {user ? (
            <div className="user-menu">
              <span>{user.email}</span>
              <button onClick={handleLogout} className="btn-small">Sair</button>
            </div>
          ) : (
            <button onClick={() => setView('login')} className="btn-primary">
              Entrar
            </button>
          )}
        </header>
        
        <div className="property-content">
          <button className="back-btn" onClick={() => setView('home')}>
            <i className="fas fa-arrow-left"></i> Voltar
          </button>
          
          <div className="property-gallery">
            <img src={selectedProperty.image} alt={selectedProperty.title} />
          </div>
          
          <div className="property-info">
            <h1>{selectedProperty.title}</h1>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              {selectedProperty.location}
            </div>
            
            <div className="rating">
              <i className="fas fa-star"></i>
              <span>{selectedProperty.rating}</span>
              <span className="reviews">({selectedProperty.reviews} avaliações)</span>
            </div>
            
            <div className="details">
              <div className="detail-item">
                <i className="fas fa-user"></i>
                <span>{selectedProperty.guests} hóspedes</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-bed"></i>
                <span>{selectedProperty.bedrooms} quartos</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-bath"></i>
                <span>{selectedProperty.bathrooms} banheiros</span>
              </div>
            </div>
            
            <div className="amenities">
              <h3>Comodidades</h3>
              <div className="amenities-list">
                {selectedProperty.amenities.map((amenity, idx) => (
                  <span key={idx} className="amenity-tag">
                    <i className="fas fa-check"></i> {amenity}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="booking-card">
              <div className="price">
                <span className="amount">{formatPrice(selectedProperty.price)}</span>
                <span className="period">/noite</span>
              </div>
              
              <div className="booking-form">
                <div className="date-inputs">
                  <div className="input-group">
                    <label>Check-in</label>
                    <input type="date" />
                  </div>
                  <div className="input-group">
                    <label>Check-out</label>
                    <input type="date" />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>Hóspedes</label>
                  <select>
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} hóspede{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <button className="btn-book">
                  {user ? 'Reservar agora' : 'Entre para reservar'}
                </button>
              </div>
              
              {user && (
                <div className="wallet-info">
                  <i className="fas fa-wallet"></i>
                  <span>Smart Account: {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => setView('home')}>
          <i className="fas fa-key"></i>
          <span>Nomad Key</span>
        </div>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Para onde você vai?"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
          />
          <button onClick={applyFilters}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        {user ? (
          <div className="user-menu">
            <div className="wallet-badge">
              <i className="fas fa-wallet"></i>
              <span>{user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</span>
            </div>
            <button onClick={handleLogout} className="btn-small">Sair</button>
          </div>
        ) : (
          <button onClick={() => setView('login')} className="btn-primary">
            Entrar
          </button>
        )}
      </header>

      <div className="filters-bar">
        <div className="filter-group">
          <label>Preço mínimo: {formatPrice(filters.minPrice)}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.minPrice}
            onChange={(e) => setFilters({...filters, minPrice: parseInt(e.target.value)})}
          />
        </div>
        
        <div className="filter-group">
          <label>Preço máximo: {formatPrice(filters.maxPrice)}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
          />
        </div>
        
        <div className="filter-group">
          <label>Hóspedes</label>
          <select
            value={filters.guests}
            onChange={(e) => setFilters({...filters, guests: parseInt(e.target.value)})}
          >
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n}>{n} hóspede{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <button className="btn-filter" onClick={applyFilters}>
          <i className="fas fa-filter"></i> Filtrar
        </button>
      </div>

      <main className="main">
        <div className="properties-grid">
          {filteredProperties.map(property => (
            <div 
              key={property.id} 
              className="property-card"
              onClick={() => {
                setSelectedProperty(property);
                setView('property');
              }}
            >
              <div className="property-image">
                <img src={property.image} alt={property.title} />
                <button className="favorite-btn">
                  <i className="far fa-heart"></i>
                </button>
              </div>
              
              <div className="property-info">
                <div className="property-header">
                  <span className="property-type">{property.type}</span>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <span>{property.rating}</span>
                  </div>
                </div>
                
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {property.location}
                </p>
                
                <div className="property-details">
                  <span><i className="fas fa-user"></i> {property.guests}</span>
                  <span><i className="fas fa-bed"></i> {property.bedrooms}</span>
                  <span><i className="fas fa-bath"></i> {property.bathrooms}</span>
                </div>
                
                <div className="property-footer">
                  <div className="price">
                    <span className="amount">{formatPrice(property.price)}</span>
                    <span className="period">/noite</span>
                  </div>
                  <span className="reviews">{property.reviews} avaliações</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>Nenhum imóvel encontrado</h3>
            <p>Tente ajustar seus filtros</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <i className="fas fa-key"></i>
            <span>Nomad Key</span>
          </div>
          <p>© 2026 Nomad Key. Hospedagem descentralizada com privacidade.</p>
          <div className="footer-links">
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-discord"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

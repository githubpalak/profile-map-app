import React, { useState, useEffect } from 'react';
import './AdminProfileForm.css';

const AdminProfileForm = ({ profile = null, onSubmit, onCancel }) => {
  // Initialize form state with default empty values or provided profile
  const [formData, setFormData] = useState({
    id: profile?.id || '',
    name: profile?.name || '',
    photo: profile?.photo || '',
    description: profile?.description || '',
    address: profile?.address || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    interests: profile?.interests || '',
    lat: profile?.lat || '',
    lng: profile?.lng || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when profile prop changes
  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id || '',
        name: profile.name || '',
        photo: profile.photo || '',
        description: profile.description || '',
        address: profile.address || '',
        email: profile.email || '',
        phone: profile.phone || '',
        interests: profile.interests || '',
        lat: profile.lat || '',
        lng: profile.lng || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (simple format check)
    const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Coordinates validation (if provided)
    if (formData.lat && (isNaN(formData.lat) || formData.lat < -90 || formData.lat > 90)) {
      newErrors.lat = 'Latitude must be between -90 and 90';
    }
    
    if (formData.lng && (isNaN(formData.lng) || formData.lng < -180 || formData.lng > 180)) {
      newErrors.lng = 'Longitude must be between -180 and 180';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert lat/lng to numbers if they exist
      const processedFormData = {
        ...formData,
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null
      };
      
      await onSubmit(processedFormData);
      // Reset form after successful submission if it's a new profile
      if (!profile) {
        setFormData({
          id: '',
          name: '',
          photo: '',
          description: '',
          address: '',
          email: '',
          phone: '',
          interests: '',
          lat: '',
          lng: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        ...errors,
        form: 'Failed to save profile. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-profile-form">
      <h2>{profile ? 'Edit Profile' : 'Add New Profile'}</h2>
      
      {errors.form && <div className="error-message form-error">{errors.form}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="photo">Photo URL</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Enter URL for profile photo"
          />
          {formData.photo && (
            <div className="photo-preview">
              <img src={formData.photo} alt="Profile preview" />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter profile description"
            rows="3"
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address*</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
          />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="lat">Latitude</label>
            <input
              type="text"
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              placeholder="Latitude coordinate"
            />
            {errors.lat && <div className="error-message">{errors.lat}</div>}
          </div>
          
          <div className="form-group half">
            <label htmlFor="lng">Longitude</label>
            <input
              type="text"
              id="lng"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              placeholder="Longitude coordinate"
            />
            {errors.lng && <div className="error-message">{errors.lng}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="interests">Interests</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Enter interests (comma separated)"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (profile ? 'Update Profile' : 'Create Profile')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfileForm;
// Test script to verify Google Apps Script is working
// Run this in your browser console to test the contact form API

const testContactForm = async () => {
  const apiUrl = 'https://script.google.com/macros/s/AKfycbzWSTWcSBEvt5w4vdc-gEFsRE7GGPMHaOfJnO3em5U5G3QbyGrweRMumGyCrf0e0Kk/exec';
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from the contact form.',
    privacyAccepted: true
  };
  
  console.log('Testing contact form with data:', testData);
  console.log('API URL:', apiUrl);
  
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(testData));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    try {
      const responseJson = JSON.parse(responseText);
      console.log('Response JSON:', responseJson);
    } catch (e) {
      console.log('Response is not JSON:', e);
    }
    
  } catch (error) {
    console.error('Error testing contact form:', error);
  }
};

// Run the test
testContactForm();

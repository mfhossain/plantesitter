/**
 * Google Apps Script for Contact Form Data Collection
 * This script handles contact form submissions and sends emails
 * 
 * Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this code
 * 4. Deploy as a web app
 * 5. Copy the web app URL to your Angular service
 */

function doPost(e) {
  try {
    // Parse the contact data from the request
    const contactData = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      throw new Error('Missing required fields');
    }

    // Send email notification
    sendContactEmail(contactData);
    
    // Optionally save to a Google Sheet for record keeping
    saveContactToSheet(contactData);
    
    // Log the submission
    console.log('Contact form submitted successfully:', {
      timestamp: new Date().toISOString(),
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject || 'No subject'
    });
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Tak for din henvendelse! Vi vender tilbage til dig snart.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Der opstod en fejl ved afsendelse af din henvendelse. Prøv venligst igen.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendContactEmail(contactData) {
  const recipientEmail = 'info@plantesitter.dk'; // Your email
  const subject = `PlanteSitter Contact: ${contactData.subject || 'Generel henvendelse'}`;
  
  const emailBody = `
Ny henvendelse fra PlanteSitter hjemmeside:

Navn: ${contactData.name}
Email: ${contactData.email}
Emne: ${contactData.subject || 'Generel henvendelse'}

Besked:
${contactData.message}

---
Dette er en automatisk genereret email fra PlanteSitter kontaktformular.
Tidspunkt: ${new Date().toLocaleString('da-DK')}
  `;
  
  // Send email
  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    body: emailBody,
    replyTo: contactData.email // Allow direct reply to the sender
  });
}

function saveContactToSheet(contactData) {
  try {
    // Get the active spreadsheet (create one if needed)
    let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      // Create a new spreadsheet for contact forms
      spreadsheet = SpreadsheetApp.create('PlanteSitter Contact Forms');
    }
    
    // Get or create the "Contact Forms" sheet
    let sheet = spreadsheet.getSheetByName('Contact Forms');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Contact Forms');
      
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Subject',
        'Message',
        'Privacy Accepted'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#27ae60')
        .setFontColor('white')
        .setFontWeight('bold');
    }
    
    // Prepare the data row
    const rowData = [
      new Date(), // Timestamp
      contactData.name,
      contactData.email,
      contactData.subject || 'Generel henvendelse',
      contactData.message,
      contactData.privacyAccepted ? 'Yes' : 'No'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
  } catch (error) {
    console.error('Error saving contact to sheet:', error);
    // Don't throw error here - email sending is more important
  }
}

// Test function to verify the script works
function testContactForm() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from the contact form.',
    privacyAccepted: true
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  console.log('Test result:', result.getContent());
}

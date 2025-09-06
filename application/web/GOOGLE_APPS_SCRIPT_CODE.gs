/**
 * Google Apps Script for Survey Data Collection
 * This script handles survey form submissions and saves data to Google Sheets
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
    // Parse the survey data from the request
    const surveyData = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (make sure you have a Google Sheet open)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error('No active spreadsheet found. Please open your Google Sheet first.');
    }
    
    // Get or create the "Survey Responses" sheet
    let sheet = spreadsheet.getSheetByName('Survey Responses');
    if (!sheet) {
      // Create the sheet if it doesn't exist
      sheet = spreadsheet.insertSheet('Survey Responses');
      
      // Add headers
      const headers = [
        'Timestamp',
        'Q1: Ingen',
        'Q1: 1-3 planter',
        'Q1: 4-7 planter',
        'Q1: 8+ planter',
        'Q2: Slet ikke svært',
        'Q2: Lidt svært',
        'Q2: Meget svært',
        'Q3: Ja, flere gange',
        'Q3: Ja, men kun enkelte gange',
        'Q3: Nej, aldrig',
        'Q4: 0 kr',
        'Q4: 100-300 kr',
        'Q4: 300-600 kr',
        'Q5: Ja, helt sikkert',
        'Q5: Måske - afhænger af prisen',
        'Q5: Nej, ikke interesseret',
        'Q6: En nabo/ven via en service',
        'Q6: Et professionelt planteteam',
        'Q6: Automatisk teknologi',
        'Q6: Andet',
        'Q7: 0 gange om året',
        'Q7: 1-2 gange om året',
        'Q7: 3-4 gange om året',
        'Q7: 5+ gange om året',
        'Email'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Style the header row
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#4285f4')
        .setFontColor('white')
        .setFontWeight('bold');
    }
    
    // Prepare the data row
    const rowData = [
      new Date(), // Timestamp
      surveyData.q1.ingen ? 'Yes' : 'No',
      surveyData.q1.oneToThree ? 'Yes' : 'No',
      surveyData.q1.fourToSeven ? 'Yes' : 'No',
      surveyData.q1.eightPlus ? 'Yes' : 'No',
      surveyData.q2.notDifficult ? 'Yes' : 'No',
      surveyData.q2.littleDifficult ? 'Yes' : 'No',
      surveyData.q2.veryDifficult ? 'Yes' : 'No',
      surveyData.q3.severalTimes ? 'Yes' : 'No',
      surveyData.q3.fewTimes ? 'Yes' : 'No',
      surveyData.q3.never ? 'Yes' : 'No',
      surveyData.q4.zero ? 'Yes' : 'No',
      surveyData.q4.hundredToThreeHundred ? 'Yes' : 'No',
      surveyData.q4.threeHundredToSixHundred ? 'Yes' : 'No',
      surveyData.q5.yesDefinitely ? 'Yes' : 'No',
      surveyData.q5.maybeDepends ? 'Yes' : 'No',
      surveyData.q5.noNotInterested ? 'Yes' : 'No',
      surveyData.q6.neighborFriend ? 'Yes' : 'No',
      surveyData.q6.professionalTeam ? 'Yes' : 'No',
      surveyData.q6.automaticTech ? 'Yes' : 'No',
      surveyData.q6.other ? 'Yes' : 'No',
      surveyData.q7.zeroTimes ? 'Yes' : 'No',
      surveyData.q7.oneToTwoTimes ? 'Yes' : 'No',
      surveyData.q7.threeToFourTimes ? 'Yes' : 'No',
      surveyData.q7.fivePlusTimes ? 'Yes' : 'No',
      surveyData.email || 'N/A'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Log the submission (optional)
    console.log('Survey submitted successfully:', {
      timestamp: new Date().toISOString(),
      email: surveyData.email || 'No email provided',
      questionsAnswered: Object.keys(surveyData).filter(key => key !== 'email').length
    });
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Survey submitted successfully',
        timestamp: new Date().toISOString(),
        rowsAdded: 1
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    console.error('Error submitting survey:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error submitting survey',
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET endpoint for testing connection
 * This allows you to test if the Apps Script is accessible
 */
function doGet(e) {
  try {
    // Check if we have access to a spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = spreadsheet ? 'Survey Responses' : 'No sheet found';
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'OK',
        message: 'Survey API is running',
        timestamp: new Date().toISOString(),
        spreadsheet: spreadsheet ? spreadsheet.getName() : 'None',
        sheet: sheetName,
        version: '1.0.0'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'ERROR',
        message: 'Error checking API status',
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Helper function to manually test the sheet creation
 * Run this function once to set up your sheet properly
 */
function setupSurveySheet() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error('No active spreadsheet found');
    }
    
    // Check if sheet already exists
    let sheet = spreadsheet.getSheetByName('Survey Responses');
    if (sheet) {
      console.log('Survey Responses sheet already exists');
      return;
    }
    
    // Create the sheet
    sheet = spreadsheet.insertSheet('Survey Responses');
    
    // Add headers
    const headers = [
      'Timestamp',
      'Q1: Ingen',
      'Q1: 1-3 planter',
      'Q1: 4-7 planter',
      'Q1: 8+ planter',
      'Q2: Slet ikke svært',
      'Q2: Lidt svært',
      'Q2: Meget svært',
      'Q3: Ja, flere gange',
      'Q3: Ja, men kun enkelte gange',
      'Q3: Nej, aldrig',
      'Q4: 0 kr',
      'Q4: 100-300 kr',
      'Q4: 300-600 kr',
      'Q5: Ja, helt sikkert',
      'Q5: Måske - afhænger af prisen',
      'Q5: Nej, ikke interesseret',
      'Q6: En nabo/ven via en service',
      'Q6: Et professionelt planteteam',
      'Q6: Automatisk teknologi',
      'Q6: Andet',
      'Q7: 0 gange om året',
      'Q7: 1-2 gange om året',
      'Q7: 3-4 gange om året',
      'Q7: 5+ gange om året',
      'Email'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Style the header row
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#4285f4')
      .setFontColor('white')
      .setFontWeight('bold');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    console.log('Survey Responses sheet created successfully');
    
  } catch (error) {
    console.error('Error setting up survey sheet:', error.toString());
  }
}

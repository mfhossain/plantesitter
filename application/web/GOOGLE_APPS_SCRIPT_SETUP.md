# 🚀 Google Apps Script Survey Setup Guide

## 🎯 **What We're Building**

A survey system that saves responses directly to Google Sheets using Google Apps Script as a "low-code backend" - no server hosting needed!

```
Angular Survey Form → Google Apps Script → Google Sheets Database
```

## 📋 **Prerequisites**

1. ✅ Google account
2. ✅ Google Sheets access
3. ✅ Angular app running (your current setup)

## 🔧 **Step 1: Create Google Apps Script**

### **1.1 Go to Google Apps Script**
- Visit: [https://script.google.com](https://script.google.com)
- Sign in with your Google account

### **1.2 Create New Project**
- Click **"New Project"**
- Name it: `Survey Backend` (or any name you prefer)
- Click **"Create"**

### **1.3 Replace Default Code**
- Delete the default `myFunction()` code
- Copy the entire code from `GOOGLE_APPS_SCRIPT_CODE.gs`
- Paste it into the editor
- Click **"Save"** (💾 icon)

## 🚀 **Step 2: Deploy as Web App**

### **2.1 Deploy Settings**
- Click **"Deploy"** → **"New deployment"**
- Choose **"Web app"**
- Set **Execute as**: `Me`
- Set **Who has access**: `Anyone`
- Click **"Deploy"**

### **2.2 Authorize Access**
- Click **"Authorize access"**
- Choose your Google account
- Click **"Advanced"** → **"Go to Survey Backend (unsafe)"**
- Click **"Allow"**

### **2.3 Get Web App URL**
- Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/.../exec`)
- **Save this URL** - you'll need it for the next step

## 📊 **Step 3: Prepare Google Sheet**

### **3.1 Create/Open Google Sheet**
- Go to [Google Sheets](https://sheets.google.com)
- Create a new spreadsheet or open existing one
- **Keep this sheet open** (Apps Script needs it active)

### **3.2 Run Setup Function (Optional)**
- In Apps Script, go to **"Functions"** dropdown
- Select **"setupSurveySheet"**
- Click **"Run"**
- This will create the "Survey Responses" sheet with headers

### **3.3 Manual Sheet Setup (Alternative)**
If you prefer to create manually:
- Create a sheet named **"Survey Responses"**
- Add these headers in row 1:
```
Timestamp | Q1: Ingen | Q1: 1-3 | Q1: 4-7 | Q1: 8+ | Q2: Not Difficult | Q2: Little Difficult | Q2: Very Difficult | Q3: Several Times | Q3: Few Times | Q3: Never | Q4: 0 kr | Q4: 100-300 kr | Q4: 300-600 kr | Q5: Yes Definitely | Q5: Maybe Depends | Q5: Not Interested | Q6: Neighbor/Friend | Q6: Professional Team | Q6: Automatic Tech | Q6: Other | Q7: 0 times | Q7: 1-2 times | Q7: 3-4 times | Q7: 5+ times | Email
```

## 🔧 **Step 4: Update Angular Service**

### **4.1 Update Survey Service**
- Open `src/app/shared/survey.service.ts`
- Replace `YOUR_SCRIPT_ID` with your actual Apps Script ID from the URL
- The URL format is: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

### **4.2 Example Update**
```typescript
// Before
private apiUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// After (replace with your actual ID)
private apiUrl = 'https://script.google.com/macros/s/AKfycbz1234567890abcdefghijklmnopqrstuvwxyz/exec';
```

## 🧪 **Step 5: Test the Integration**

### **5.1 Test Connection**
- Start your Angular app: `npm start`
- Navigate to the survey page
- You should see: **"✅ Connected to Google Apps Script"**

### **5.2 Test Survey Submission**
- Fill out the survey form
- Click **"Send svar"**
- Check your Google Sheet for the new row
- You should see: **"Tak for dine svar! Din besvarelse er blevet gemt i Google Sheets."**

## 🔍 **Troubleshooting**

### **Connection Failed**
- ❌ **"Connection failed - check Apps Script URL"**
- **Solution**: Verify the Apps Script URL in your service
- **Check**: Apps Script is deployed as web app with "Anyone" access

### **Survey Submission Failed**
- ❌ **"Error submitting survey"**
- **Solution**: Make sure your Google Sheet is open and active
- **Check**: Apps Script needs access to an active spreadsheet

### **Sheet Not Found**
- ❌ **"No active spreadsheet found"**
- **Solution**: Open your Google Sheet before testing
- **Check**: The sheet should be open in your browser

### **CORS Issues**
- ❌ **CORS error in browser console**
- **Solution**: Apps Script handles CORS automatically
- **Check**: Make sure you're using the correct web app URL

## 📱 **Production Deployment**

### **GitHub Pages**
- Your Angular app can be deployed to GitHub Pages
- Apps Script runs on Google's servers (no hosting needed)
- Just update the Apps Script URL in your production environment

### **Environment Configuration**
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  api: {
    surveyEndpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
  }
};
```

## 🎉 **What You've Built**

1. ✅ **Survey Form** - Angular frontend
2. ✅ **Data Storage** - Google Sheets database
3. ✅ **Backend API** - Google Apps Script (free hosting)
4. ✅ **Real-time Updates** - Instant data saving
5. ✅ **No Server Costs** - Everything runs on Google's infrastructure

## 🔄 **Next Steps**

1. **Customize the survey** - Add/modify questions
2. **Style the sheet** - Make it look professional
3. **Add data validation** - Ensure data quality
4. **Create reports** - Analyze survey responses
5. **Share access** - Let team members view results

## 💡 **Pro Tips**

- **Keep your Google Sheet open** when testing
- **Use the setup function** to create the sheet automatically
- **Test with different browsers** to ensure compatibility
- **Monitor Apps Script logs** for debugging
- **Backup your Apps Script code** before major changes

## 🆘 **Need Help?**

If you encounter issues:
1. Check the browser console for errors
2. Verify Apps Script deployment settings
3. Ensure Google Sheet is open and accessible
4. Test the Apps Script URL directly in browser

**Congratulations! You now have a fully functional survey system running on Google's infrastructure! 🎉**

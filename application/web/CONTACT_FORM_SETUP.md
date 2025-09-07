# 📧 Contact Form Setup Guide

## 🎯 **What We've Built**

A fully functional contact form that sends emails and stores submissions in Google Sheets using Google Apps Script.

```
Angular Contact Form → Google Apps Script → Email + Google Sheets
```

## 🚀 **Setup Instructions**

### **Step 1: Create Google Apps Script for Contact Forms**

1. **Go to Google Apps Script**
   - Visit: [https://script.google.com](https://script.google.com)
   - Sign in with your Google account

2. **Create New Project**
   - Click **"New Project"**
   - Name it: `Contact Form Backend`
   - Click **"Create"**

3. **Add the Contact Script**
   - Delete the default `myFunction()` code
   - Copy the entire code from `CONTACT_GOOGLE_APPS_SCRIPT.gs`
   - Paste it into the editor
   - Click **"Save"** (💾 icon)

### **Step 2: Deploy as Web App**

1. **Deploy Settings**
   - Click **"Deploy"** → **"New deployment"**
   - Choose **"Web app"**
   - Set **Execute as**: `Me`
   - Set **Who has access**: `Anyone`
   - Click **"Deploy"**

2. **Authorize Access**
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to Contact Form Backend (unsafe)"**
   - Click **"Allow"**

3. **Get Web App URL**
   - Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/.../exec`)
   - **Save this URL** - you'll need it for the next step

### **Step 3: Update Angular Service**

1. **Update the Contact Service**
   - Open `src/app/shared/contact.service.ts`
   - Replace `YOUR_CONTACT_SCRIPT_ID` with your actual Apps Script ID:
   ```typescript
   private apiUrl = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
   ```

### **Step 4: Test the Contact Form**

1. **Test the Script**
   - In Apps Script, go to **"Functions"** dropdown
   - Select **"testContactForm"**
   - Click **"Run"**
   - Check the logs for success message

2. **Test the Form**
   - Go to your contact page
   - Fill out and submit the form
   - Check your email for the notification
   - Check Google Sheets for the stored data

## 📊 **What Happens When Someone Submits**

### **Email Notification**
- You receive an email at `info@plantesitter.dk`
- Email includes all form data
- Reply-to is set to the sender's email
- Subject includes the form subject

### **Data Storage**
- Form data is saved to Google Sheets
- Creates "Contact Forms" sheet if it doesn't exist
- Includes timestamp, name, email, subject, message, privacy acceptance
- Auto-resizes columns for readability

### **User Feedback**
- Success message: "Tak for din henvendelse! Vi vender tilbage til dig snart."
- Error message with fallback option to send via email
- Form resets after successful submission

## 🔧 **Features**

### **Form Validation**
- ✅ Required field validation
- ✅ Email format validation
- ✅ Privacy policy acceptance required
- ✅ Real-time error messages

### **Fallback Options**
- ✅ Primary: Google Apps Script API
- ✅ Fallback: Mailto link if API fails
- ✅ User-friendly error handling

### **Data Protection**
- ✅ GDPR compliant
- ✅ Privacy policy acceptance required
- ✅ Secure data transmission
- ✅ Data stored in your Google account

## 📝 **Email Template**

The email you receive will look like this:

```
Subject: PlanteSitter Contact: [Subject]

New inquiry from PlanteSitter website:

Name: [User's Name]
Email: [User's Email]
Subject: [Selected Subject]

Message:
[User's Message]

---
This is an automatically generated email from PlanteSitter contact form.
Time: [Timestamp]
```

## 🛠 **Customization Options**

### **Change Email Recipient**
In the Google Apps Script, update:
```javascript
const recipientEmail = 'your-email@example.com';
```

### **Modify Email Template**
Edit the `sendContactEmail` function in the script.

### **Add More Form Fields**
1. Update the `ContactFormData` interface in `contact.service.ts`
2. Add fields to the HTML form
3. Update the Google Apps Script to handle new fields

### **Custom Validation**
Add more validation rules in the `validateForm()` method.

## 🚨 **Troubleshooting**

### **Form Not Sending**
1. Check browser console for errors
2. Verify Apps Script URL is correct
3. Test the Apps Script directly
4. Check Google Apps Script logs

### **No Email Received**
1. Check spam folder
2. Verify email address in script
3. Check Apps Script execution logs
4. Ensure MailApp permissions are granted

### **Data Not Saving to Sheets**
1. Ensure you have a Google Sheet open when deploying
2. Check Apps Script logs for errors
3. Verify sheet permissions

## 📞 **Support**

If you need help with the setup:
- Check the Apps Script logs for error messages
- Verify all URLs and permissions
- Test each component individually

The contact form is now ready to receive and process inquiries from your website visitors! 🎉

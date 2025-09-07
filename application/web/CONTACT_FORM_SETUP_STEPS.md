# 📧 Contact Form Setup - Automatic Email Sending

## 🎯 **Goal**
Set up automatic email sending so the contact form sends emails directly to `info@plantesitter.dk` without opening the user's email client.

## 🚀 **Step-by-Step Setup**

### **Step 1: Create Google Apps Script**

1. **Go to Google Apps Script**
   - Visit: [https://script.google.com](https://script.google.com)
   - Sign in with your Google account

2. **Create New Project**
   - Click **"New Project"**
   - Name it: `PlanteSitter Contact Form`
   - Click **"Create"**

3. **Replace the Code**
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
   - Click **"Advanced"** → **"Go to PlanteSitter Contact Form (unsafe)"**
   - Click **"Allow"**

3. **Get Web App URL**
   - Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/.../exec`)
   - **Save this URL** - you'll need it for the next step

### **Step 3: Update Angular Service**

1. **Open the Contact Service**
   - File: `src/app/shared/contact.service.ts`
   - Find line 24: `private apiUrl = 'https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec';`

2. **Replace with Your URL**
   ```typescript
   private apiUrl = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
   ```
   Replace `YOUR_ACTUAL_SCRIPT_ID` with the ID from your Google Apps Script URL.

### **Step 4: Test the Setup**

1. **Test the Script**
   - In Apps Script, go to **"Functions"** dropdown
   - Select **"testContactForm"**
   - Click **"Run"**
   - Check the logs for success message

2. **Test the Form**
   - Go to your contact page
   - Fill out and submit the form
   - Check your email at `info@plantesitter.dk`
   - You should receive an email automatically!

## 📊 **What Happens After Setup**

### **When someone submits the contact form:**
1. ✅ **Form data is sent** to Google Apps Script
2. ✅ **Email is automatically sent** to `info@plantesitter.dk`
3. ✅ **Data is stored** in Google Sheets
4. ✅ **User sees success message**
5. ✅ **Form resets** automatically

### **Email you receive:**
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

## 🔧 **Troubleshooting**

### **If you get 404 errors:**
- Check that the Google Apps Script URL is correct
- Make sure the script is deployed as a web app
- Verify the script has "Anyone" access

### **If no email is received:**
- Check your spam folder
- Verify the email address in the script is correct
- Check Google Apps Script logs for errors

### **If the form shows errors:**
- Check browser console for error messages
- Verify the API URL in the service is correct
- Test the Google Apps Script directly

## ✅ **Ready to Go**

Once you complete these steps, your contact form will automatically send emails without opening the user's email client! 🎉

## 📝 **Quick Reference**

- **Google Apps Script**: [https://script.google.com](https://script.google.com)
- **Script Code**: Use `CONTACT_GOOGLE_APPS_SCRIPT.gs`
- **Service File**: `src/app/shared/contact.service.ts`
- **Your Email**: `info@plantesitter.dk`

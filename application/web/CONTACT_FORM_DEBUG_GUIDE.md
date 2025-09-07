# 🔍 Contact Form Debug Guide

## 🚨 **Problem**: No emails received, no browser errors

Let's debug this step by step to find out what's happening.

## 🔧 **Step 1: Check Browser Console**

1. **Open your contact form page**
2. **Open browser developer tools** (F12)
3. **Go to Console tab**
4. **Submit the contact form**
5. **Look for any console messages**

You should see:
```
Sending contact form data: {name: "...", email: "...", ...}
API URL: https://script.google.com/macros/s/...
```

## 🌐 **Step 2: Check Network Tab**

1. **Open browser developer tools** (F12)
2. **Go to Network tab**
3. **Submit the contact form**
4. **Look for the POST request to Google Apps Script**

Check:
- ✅ **Request is being sent**
- ✅ **Response status** (200, 404, 500, etc.)
- ✅ **Response content**

## 🧪 **Step 3: Test Google Apps Script Directly**

1. **Open the test script**: `test-contact-script.js`
2. **Copy the code**
3. **Open browser console** on any page
4. **Paste and run the code**
5. **Check the console output**

This will tell us if the Google Apps Script is working.

## 📧 **Step 4: Check Google Apps Script**

1. **Go to**: [https://script.google.com](https://script.google.com)
2. **Open your contact form project**
3. **Go to "Executions" tab**
4. **Look for recent executions**
5. **Check if there are any errors**

## 📬 **Step 5: Check Email Settings**

1. **Check spam folder** in your email
2. **Verify email address** in Google Apps Script
3. **Check if Gmail is blocking** the emails

## 🔍 **Step 6: Test Google Apps Script Manually**

1. **In Google Apps Script editor**
2. **Go to "Functions" dropdown**
3. **Select "testContactForm"**
4. **Click "Run"**
5. **Check the logs** for any errors

## 🚨 **Common Issues & Solutions**

### **Issue 1: 404 Error**
- **Problem**: Google Apps Script not deployed properly
- **Solution**: Redeploy the script with "Anyone" access

### **Issue 2: CORS Error**
- **Problem**: Cross-origin request blocked
- **Solution**: Google Apps Script should handle CORS automatically

### **Issue 3: No Response**
- **Problem**: Script is running but not responding
- **Solution**: Check script logs and email permissions

### **Issue 4: Email Not Sent**
- **Problem**: MailApp permissions not granted
- **Solution**: Re-authorize the script

## 📝 **Debug Checklist**

- [ ] Browser console shows form data being sent
- [ ] Network tab shows POST request
- [ ] Google Apps Script receives the request
- [ ] Script execution completes without errors
- [ ] Email is sent (check spam folder)
- [ ] Response is returned to browser

## 🛠 **Quick Fixes to Try**

### **Fix 1: Redeploy Google Apps Script**
1. Go to Google Apps Script
2. Click "Deploy" → "Manage deployments"
3. Click the pencil icon to edit
4. Make sure "Execute as" is set to "Me"
5. Make sure "Who has access" is set to "Anyone"
6. Click "Deploy"

### **Fix 2: Check Script Permissions**
1. In Google Apps Script
2. Click "Review permissions"
3. Grant all required permissions
4. Especially MailApp permissions

### **Fix 3: Test with Simple Data**
Try submitting the form with minimal data:
- Name: Test
- Email: test@test.com
- Message: Test message

## 📞 **Next Steps**

1. **Run the test script** in browser console
2. **Check Google Apps Script executions**
3. **Verify email permissions**
4. **Check spam folder**

Let me know what you find in the browser console and network tab!

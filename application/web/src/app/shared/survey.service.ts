import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SurveyData {
  q1: {
    ingen: boolean;
    oneToThree: boolean;
    fourToSeven: boolean;
    eightPlus: boolean;
  };
  q2: {
    notDifficult: boolean;
    littleDifficult: boolean;
    veryDifficult: boolean;
  };
  q3: {
    severalTimes: boolean;
    fewTimes: boolean;
    never: boolean;
  };
  q4: {
    zero: boolean;
    hundredToThreeHundred: boolean;
    threeHundredToSixHundred: boolean;
  };
  q5: {
    yesDefinitely: boolean;
    maybeDepends: boolean;
    noNotInterested: boolean;
  };
  q6: {
    neighborFriend: boolean;
    professionalTeam: boolean;
    automaticTech: boolean;
    other: boolean;
  };
  q7: {
    zeroTimes: boolean;
    oneToTwoTimes: boolean;
    threeToFourTimes: boolean;
    fivePlusTimes: boolean;
  };
  email: string;
}

export interface SurveyResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  // This will be your Apps Script Web App URL
  // Replace YOUR_SCRIPT_ID with your actual Apps Script ID
  private apiUrl = 'https://script.google.com/macros/s/AKfycbzWSTWcSBEvt5w4vdc-gEFsRE7GGPMHaOfJnO3em5U5G3QbyGrweRMumGyCrf0e0Kk/exec';

  constructor(private http: HttpClient) { }

  submitSurvey(surveyData: SurveyData): Observable<SurveyResponse> {
    // Apps Script expects form data, so we convert our JSON to form data
    const formData = new FormData();
    formData.append('data', JSON.stringify(surveyData));
    
    // Make POST request to Apps Script
    return this.http.post<SurveyResponse>(this.apiUrl, formData);
  }

  // Method to test if the Apps Script is accessible
  testConnection(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to update the Apps Script URL (useful for switching between dev/prod)
  updateApiUrl(newUrl: string) {
    this.apiUrl = newUrl;
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './survey.html',
  styleUrls: ['./survey.scss']
})
export class Survey {
  surveyData = {
    q1: {
      ingen: false,
      oneToThree: false,
      fourToSeven: false,
      eightPlus: false
    },
    q2: {
      notDifficult: false,
      littleDifficult: false,
      veryDifficult: false
    },
    q3: {
      severalTimes: false,
      fewTimes: false,
      never: false
    },
    q4: {
      zero: false,
      hundredToThreeHundred: false,
      threeHundredToSixHundred: false,
      sixHundredPlus: false
    },
    q5: {
      yesDefinitely: false,
      maybeDepends: false,
      noNotInterested: false
    },
    q6: {
      neighborFriend: false,
      professionalTeam: false,
      automaticTech: false,
      other: false
    },
    q7: {
      zeroTimes: false,
      oneToTwoTimes: false,
      threeToFourTimes: false,
      fivePlusTimes: false
    },
    email: ''
  };

  onSubmit() {
    console.log('Survey submitted:', this.surveyData);
    // Here you can add logic to send the data to your backend
    // For now, we'll just log it to the console
  }
}
